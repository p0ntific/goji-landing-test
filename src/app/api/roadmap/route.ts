import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Path to store roadmap status data
const DATA_FILE = path.join(process.cwd(), 'data', 'roadmap-status.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read current status
async function readStatus(): Promise<Record<string, boolean>> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Write status
async function writeStatus(status: Record<string, boolean>): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(status, null, 2));
}

// GET - Retrieve all completion statuses
export async function GET() {
  try {
    const status = await readStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Error reading roadmap status:', error);
    return NextResponse.json({ error: 'Failed to read status' }, { status: 500 });
  }
}

// POST - Update completion status for an item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, completed } = body;

    if (!id || typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request. Required: id (string), completed (boolean)' },
        { status: 400 }
      );
    }

    const status = await readStatus();
    status[id] = completed;
    await writeStatus(status);

    return NextResponse.json({ success: true, id, completed });
  } catch (error) {
    console.error('Error updating roadmap status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}

// PUT - Bulk update completion statuses
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid request. Expected object with id: boolean pairs' },
        { status: 400 }
      );
    }

    const status = await readStatus();
    for (const [id, completed] of Object.entries(body)) {
      if (typeof completed === 'boolean') {
        status[id] = completed;
      }
    }
    await writeStatus(status);

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error('Error bulk updating roadmap status:', error);
    return NextResponse.json({ error: 'Failed to bulk update status' }, { status: 500 });
  }
}
