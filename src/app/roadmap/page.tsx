'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  Check, 
  ChevronDown, 
  Search, 
  X,
  Target,
  Package,
  Globe,
  Cog,
  Users,
  Wallet,
  Scale,
  Handshake,
  Circle,
  AlertCircle,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { roadmapBranches, RoadmapBranch, RoadmapItem, getTotalItemsCount } from '@/lib/roadmapData';
import Navbar from '@/components/Navbar';

type PriorityFilter = 'all' | 'critical' | 'high' | 'medium';
type StatusFilter = 'all' | 'pending' | 'completed';

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  Target,
  Package,
  Globe,
  Cog,
  Users,
  Wallet,
  Scale,
  Handshake,
};

export default function RoadmapPage() {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set(roadmapBranches.map(b => b.id)));

  // Fetch initial status
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/roadmap');
        if (res.ok) {
          const data = await res.json();
          setCompletedItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch roadmap status:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  // Toggle item completion
  const toggleItem = useCallback(async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newValue = !completedItems[id];
    
    setCompletedItems(prev => ({ ...prev, [id]: newValue }));

    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: newValue })
      });
      
      if (!res.ok) {
        setCompletedItems(prev => ({ ...prev, [id]: !newValue }));
      }
    } catch {
      setCompletedItems(prev => ({ ...prev, [id]: !newValue }));
    }
  }, [completedItems]);

  // Select branch
  const selectBranch = (branchId: string) => {
    setSelectedBranch(branchId);
    if (branchId === 'all') {
      setExpandedBranches(new Set(roadmapBranches.map(b => b.id)));
    } else {
      setExpandedBranches(new Set([branchId]));
    }
  };

  // Toggle branch expansion
  const toggleBranch = (branchId: string) => {
    setExpandedBranches(prev => {
      const next = new Set(prev);
      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }
      return next;
    });
  };

  // Get filtered branches
  const getFilteredBranches = (): RoadmapBranch[] => {
    let branches = roadmapBranches;
    
    if (selectedBranch !== 'all') {
      branches = branches.filter(b => b.id === selectedBranch);
    }
    
    if (priorityFilter !== 'all') {
      branches = branches.filter(b => b.priority === priorityFilter);
    }
    
    return branches;
  };

  // Filter items within a branch
  const filterItems = (items: RoadmapItem[]): RoadmapItem[] => {
    return items.filter(item => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!item.title.toLowerCase().includes(query) && 
            !item.description?.toLowerCase().includes(query) &&
            !item.id.toLowerCase().includes(query)) {
          return false;
        }
      }

      if (statusFilter === 'completed' && !completedItems[item.id]) return false;
      if (statusFilter === 'pending' && completedItems[item.id]) return false;

      return true;
    });
  };

  // Calculate stats
  const totalItems = getTotalItemsCount();
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Calculate branch progress
  const getBranchProgress = (branch: RoadmapBranch) => {
    const completed = branch.items.filter(item => completedItems[item.id]).length;
    return { 
      completed, 
      total: branch.items.length, 
      percent: Math.round((completed / branch.items.length) * 100) 
    };
  };

  // Get icon component
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Circle className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredBranches = getFilteredBranches();
  const isAllSelected = selectedBranch === 'all';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light mb-2">Roadmap</h1>
            <p className="text-gray-500">
              {completedCount} из {totalItems} задач выполнено
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Category Badges */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {/* All option */}
              <button
                onClick={() => selectBranch('all')}
                className={`
                  inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                  ${isAllSelected 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <span className="font-medium">Все</span>
                <span className={`
                  text-xs px-1.5 py-0.5 rounded
                  ${isAllSelected ? 'bg-white/20' : 'bg-gray-200'}
                `}>
                  {completedCount}/{totalItems}
                </span>
              </button>

              {roadmapBranches.map((branch) => {
                const progress = getBranchProgress(branch);
                const isSelected = selectedBranch === branch.id;
                
                return (
                  <button
                    key={branch.id}
                    onClick={() => selectBranch(branch.id)}
                    className={`
                      inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                      ${isSelected 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {getIcon(branch.icon)}
                    <span className="font-medium">{branch.title}</span>
                    <span className={`
                      text-xs px-1.5 py-0.5 rounded
                      ${isSelected ? 'bg-white/20' : 'bg-gray-200'}
                    `}>
                      {progress.completed}/{progress.total}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Priority Filter - only show when "All" is selected */}
            {isAllSelected && (
              <div className="flex gap-1.5">
                {[
                  { id: 'all', label: 'Все', icon: null },
                  { id: 'critical', label: 'Критичные', icon: AlertCircle },
                  { id: 'high', label: 'Высокий', icon: AlertTriangle },
                  { id: 'medium', label: 'Средний', icon: CheckCircle2 },
                ].map(p => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPriorityFilter(p.id as PriorityFilter)}
                      className={`
                        flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap
                        ${priorityFilter === p.id 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {p.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Status Filter */}
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: 'Все' },
                { id: 'pending', label: 'В работе' },
                { id: 'completed', label: 'Готово' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id as StatusFilter)}
                  className={`
                    px-3 py-2 rounded-lg text-sm transition-colors
                    ${statusFilter === s.id 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Branches List */}
          <div className="space-y-3">
            {filteredBranches.map((branch) => {
              const filteredItems = filterItems(branch.items);
              const progress = getBranchProgress(branch);
              const isExpanded = expandedBranches.has(branch.id);

              if (filteredItems.length === 0 && (searchQuery || statusFilter !== 'all')) {
                return null;
              }

              return (
                <div
                  key={branch.id}
                  className="bg-gray-50 rounded-xl overflow-hidden"
                >
                  {/* Branch Header */}
                  <button
                    onClick={() => toggleBranch(branch.id)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${branch.color}20`, color: branch.color }}
                    >
                      {getIcon(branch.icon)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="font-medium truncate">{branch.title}</h2>
                        {/* Priority badge - only show when "All" is selected */}
                        {isAllSelected && (
                          <span className={`
                            text-xs px-2 py-0.5 rounded
                            ${branch.priority === 'critical' ? 'bg-red-100 text-red-700' : ''}
                            ${branch.priority === 'high' ? 'bg-amber-100 text-amber-700' : ''}
                            ${branch.priority === 'medium' ? 'bg-green-100 text-green-700' : ''}
                          `}>
                            {branch.priority === 'critical' && 'Критичный'}
                            {branch.priority === 'high' && 'Высокий'}
                            {branch.priority === 'medium' && 'Средний'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{branch.description}</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                      <span className="text-sm text-gray-500">{progress.completed}/{progress.total}</span>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${progress.percent}%`, 
                            backgroundColor: branch.color 
                          }}
                        />
                      </div>
                    </div>

                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Items */}
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-1.5">
                      {(filteredItems.length > 0 ? filteredItems : branch.items).map((item) => {
                        const isCompleted = completedItems[item.id];

                        return (
                          <div
                            key={item.id}
                            onClick={(e) => toggleItem(item.id, e)}
                            className={`
                              group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
                              ${isCompleted 
                                ? 'bg-green-50 hover:bg-green-100' 
                                : 'bg-white hover:bg-gray-50'
                              }
                              ${item.type === 'subtask' ? 'ml-6' : ''}
                            `}
                          >
                            {/* Checkbox */}
                            <div 
                              className={`
                                w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                ${isCompleted 
                                  ? 'bg-green-500 border-green-500 text-white' 
                                  : 'border-gray-300 group-hover:border-gray-400'
                                }
                              `}
                            >
                              {isCompleted && <Check className="w-3 h-3" />}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`
                                  text-xs font-mono px-1.5 py-0.5 rounded
                                  ${item.type === 'research' 
                                    ? 'bg-purple-100 text-purple-600' 
                                    : 'bg-gray-100 text-gray-500'
                                  }
                                `}>
                                  {item.id}
                                </span>
                                {item.type === 'research' && (
                                  <span className="text-xs text-purple-600">Ресерч</span>
                                )}
                              </div>
                              <h3 className={`
                                text-sm font-medium
                                ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}
                              `}>
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className={`
                                  text-xs mt-0.5 line-clamp-2
                                  ${isCompleted ? 'text-gray-300' : 'text-gray-500'}
                                `}>
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredBranches.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Нет результатов для выбранных фильтров</p>
              <button
                onClick={() => {
                  setPriorityFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                  setSelectedBranch('all');
                }}
                className="mt-4 text-sm text-gray-600 underline hover:text-black"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
