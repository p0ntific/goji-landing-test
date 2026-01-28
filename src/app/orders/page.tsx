'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import { ArrowRight, ArrowUpRight, Clock, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';

const orders = [
  {
    id: 'ORD-2847',
    title: 'Редизайн корпоративного сайта',
    stage: 'Дизайн',
    stageNumber: 5,
    totalStages: 7,
    progress: 60,
    lastUpdate: '2 часа назад',
    status: 'active',
  },
  {
    id: 'ORD-2846',
    title: 'Мобильное приложение',
    stage: 'Разработка',
    stageNumber: 6,
    totalStages: 7,
    progress: 35,
    lastUpdate: 'Вчера',
    status: 'active',
  },
  {
    id: 'ORD-2845',
    title: 'Лендинг для продукта',
    stage: 'Завершён',
    stageNumber: 7,
    totalStages: 7,
    progress: 100,
    lastUpdate: '15 января',
    status: 'completed',
  },
  {
    id: 'ORD-2844',
    title: 'Брендинг стартапа',
    stage: 'Завершён',
    stageNumber: 7,
    totalStages: 7,
    progress: 100,
    lastUpdate: '10 января',
    status: 'completed',
  },
];

export default function MyOrders() {
  const activeOrders = orders.filter((o) => o.status === 'active');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <h1 className="text-5xl font-light mb-4">Мои заказы</h1>
              <p className="text-xl text-gray-500">Отслеживайте статус ваших проектов</p>
            </div>
            <Link href="/order/new">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  radius="full"
                  size="lg"
                  className="bg-black text-white px-8"
                  startContent={<Plus className="w-4 h-4" />}
                >
                  Новый заказ
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Active Orders */}
          {activeOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h2 className="text-xl font-medium">В работе</h2>
                <span className="text-gray-400">({activeOrders.length})</span>
              </div>
              <div className="space-y-4">
                {activeOrders.map((order, i) => (
                  <OrderCard key={order.id} order={order} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Completed Orders */}
          {completedOrders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-medium text-gray-400 mb-8">Завершённые</h2>
              <div className="space-y-4">
                {completedOrders.map((order, i) => (
                  <OrderCard key={order.id} order={order} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {orders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-medium mb-4">Нет заказов</h3>
              <p className="text-gray-500 mb-10 max-w-md mx-auto">
                Создайте первый заказ, чтобы начать работу с нашей командой
              </p>
              <Link href="/order/new">
                <Button
                  radius="full"
                  size="lg"
                  className="bg-black text-white px-8"
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Создать заказ
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  index,
}: {
  order: {
    id: string;
    title: string;
    stage: string;
    stageNumber: number;
    totalStages: number;
    progress: number;
    lastUpdate: string;
    status: string;
  };
  index: number;
}) {
  const isCompleted = order.status === 'completed';

  return (
    <Link href={`/order/${order.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4 }}
      >
        <Card
          className={`border-0 rounded-3xl overflow-hidden transition-all duration-300 ${
            isCompleted ? 'bg-gray-50' : 'bg-gray-50 hover:bg-white hover:shadow-xl'
          }`}
        >
          <CardBody className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-gray-400 font-mono">{order.id}</span>
                  <Chip
                    size="sm"
                    variant="flat"
                    classNames={{
                      base: isCompleted ? 'bg-gray-200' : 'bg-green-100',
                      content: isCompleted ? 'text-gray-600 text-xs' : 'text-green-700 text-xs',
                    }}
                  >
                    {order.stage}
                  </Chip>
                </div>
                <h3 className="text-xl font-medium mb-2">{order.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  {order.lastUpdate}
                </div>
              </div>

              <div className="flex items-center gap-8">
                {/* Progress */}
                <div className="w-48">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Прогресс</span>
                    <span className="font-medium">
                      {order.stageNumber}/{order.totalStages}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isCompleted ? 'bg-gray-400' : 'bg-black'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${order.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-gray-200 text-gray-500' : 'bg-black text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </Link>
  );
}
