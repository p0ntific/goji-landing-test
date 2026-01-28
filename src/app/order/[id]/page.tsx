'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Textarea, Input, Card, CardBody } from '@heroui/react';
import { MessageCircle, ExternalLink, Check, FileText, Palette, Code, TestTube, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

const stages = [
  { id: 1, name: 'Описание', fullName: 'Описание требований', icon: FileText },
  { id: 2, name: 'Оценка', fullName: 'Оценка проекта', icon: Sparkles },
  { id: 3, name: 'Аналитика', fullName: 'Проработка требований', icon: FileText },
  { id: 4, name: 'Обсуждение', fullName: 'Обсуждаем требования', icon: MessageCircle },
  { id: 5, name: 'Дизайн', fullName: 'Дизайн', icon: Palette },
  { id: 6, name: 'Разработка', fullName: 'Разработка', icon: Code },
  { id: 7, name: 'Тестирование', fullName: 'Тестирование', icon: TestTube },
];

type StageStatus = 'pending' | 'in_progress' | 'completed';

export default function OrderTracker() {
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [currentStage, setCurrentStage] = useState(isNew ? 1 : 3);
  const [stageStatuses, setStageStatuses] = useState<Record<number, StageStatus>>({});

  useEffect(() => {
    const statuses: Record<number, StageStatus> = {};
    stages.forEach((stage) => {
      if (stage.id < currentStage) {
        statuses[stage.id] = 'completed';
      } else if (stage.id === currentStage) {
        statuses[stage.id] = 'in_progress';
      } else {
        statuses[stage.id] = 'pending';
      }
    });
    setStageStatuses(statuses);
  }, [currentStage]);

  const currentStageData = stages.find((s) => s.id === currentStage);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        {/* Stage Tracker Header */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            {/* Progress Line */}
            <div className="relative">
              {/* Background line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />

              {/* Progress line */}
              <motion.div
                className="absolute top-1/2 left-0 h-px bg-black -translate-y-1/2"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStage - 1) / (stages.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              {/* Stage indicators */}
              <div className="relative flex justify-between">
                {stages.map((stage) => {
                  const status = stageStatuses[stage.id] || 'pending';
                  const Icon = stage.icon;

                  return (
                    <div key={stage.id} className="flex flex-col items-center">
                      <motion.div
                        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                          status === 'completed'
                            ? 'bg-black text-white'
                            : status === 'in_progress'
                              ? 'bg-white text-black'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {/* Animated ring for in_progress */}
                        {status === 'in_progress' && (
                          <>
                            <svg
                              className="absolute inset-0 w-full h-full"
                              style={{ transform: 'rotate(-90deg)' }}
                            >
                              <circle
                                cx="28"
                                cy="28"
                                r="26"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="2"
                                strokeDasharray="163.36"
                                strokeDashoffset="40"
                                className="animate-[dash_2s_ease-in-out_infinite]"
                              />
                            </svg>
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-green-500/30"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </>
                        )}

                        {/* Pulse for completed */}
                        {status === 'completed' && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-black"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {status === 'completed' ? (
                          <Check className="w-6 h-6 relative z-10" />
                        ) : (
                          <Icon className="w-5 h-5 relative z-10" />
                        )}
                      </motion.div>

                      <motion.span
                        className={`mt-3 text-xs font-medium transition-colors ${
                          status === 'in_progress'
                            ? 'text-black'
                            : status === 'completed'
                              ? 'text-gray-600'
                              : 'text-gray-400'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stage.id * 0.1 }}
                      >
                        {stage.name}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[800px] mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light mb-3">{currentStageData?.fullName}</h1>
            <p className="text-gray-500">
              {isNew ? 'Опишите ваш проект' : `Заказ #${id}`}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StageContent stageId={currentStage} isNew={isNew} />
            </motion.div>
          </AnimatePresence>

          {/* Contact Manager */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              variant="bordered"
              radius="full"
              size="lg"
              className="border-gray-200 px-8"
              startContent={<MessageCircle className="w-4 h-4" />}
            >
              Связаться с менеджером
            </Button>
            <Button variant="light" radius="full" size="lg" className="text-gray-500">
              Попросить перезвонить
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StageContent({ stageId, isNew }: { stageId: number; isNew: boolean }) {
  switch (stageId) {
    case 1:
      return <RequirementsForm />;
    case 2:
      return <EstimationView />;
    case 3:
      return <AnalyticsView />;
    case 4:
      return <DiscussionView />;
    case 5:
      return <DesignView />;
    case 6:
      return <DevelopmentView />;
    case 7:
      return <TestingView />;
    default:
      return null;
  }
}

function RequirementsForm() {
  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10 space-y-8">
        <div className="space-y-3">
          <label className="block text-sm font-medium">Название проекта</label>
          <Input
            placeholder="Например: Редизайн корпоративного сайта"
            radius="lg"
            size="lg"
            classNames={{
              inputWrapper: 'bg-white border border-gray-200 shadow-sm',
            }}
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Опишите задачу</label>
          <Textarea
            placeholder="Расскажите подробнее о вашем проекте, целях и ожиданиях..."
            minRows={6}
            radius="lg"
            classNames={{
              inputWrapper: 'bg-white border border-gray-200 shadow-sm',
            }}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium">Примерный бюджет</label>
            <Input
              placeholder="Укажите диапазон"
              radius="lg"
              size="lg"
              classNames={{
                inputWrapper: 'bg-white border border-gray-200 shadow-sm',
              }}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium">Желаемые сроки</label>
            <Input
              placeholder="Например: 2-3 месяца"
              radius="lg"
              size="lg"
              classNames={{
                inputWrapper: 'bg-white border border-gray-200 shadow-sm',
              }}
            />
          </div>
        </div>

        <Button radius="full" size="lg" className="w-full bg-black text-white mt-4">
          Отправить заявку
        </Button>
      </CardBody>
    </Card>
  );
}

function EstimationView() {
  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10">
        <div className="text-center py-16">
          <motion.div
            className="w-24 h-24 bg-white rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-gray-400" />
          </motion.div>
          <h3 className="text-2xl font-medium mb-4">Оцениваем проект</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Наша команда анализирует требования и готовит детальную оценку стоимости и сроков
          </p>
          <div className="inline-flex items-center gap-3 text-sm text-gray-400 bg-white px-6 py-3 rounded-full">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            В процессе
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function AnalyticsView() {
  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10">
        <div className="text-center py-12">
          <h3 className="text-2xl font-medium mb-4">Проработка требований</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-10">
            Мы создали доску в Miro для совместной работы над требованиями проекта
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              as="a"
              href="#"
              target="_blank"
              variant="bordered"
              radius="full"
              size="lg"
              className="border-gray-300 px-8"
              endContent={<ExternalLink className="w-4 h-4" />}
            >
              Открыть Miro
            </Button>
          </motion.div>
        </div>
      </CardBody>
    </Card>
  );
}

function DiscussionView() {
  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10">
        <div className="text-center py-12">
          <h3 className="text-2xl font-medium mb-4">Обсуждение требований</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-10">
            Запланирована встреча для обсуждения деталей проекта
          </p>
          <motion.div
            className="inline-block bg-white rounded-2xl p-8 shadow-sm"
            whileHover={{ y: -4 }}
          >
            <p className="text-sm text-gray-400 mb-2">Следующая встреча</p>
            <p className="text-3xl font-light">15 января</p>
            <p className="text-lg text-gray-600">14:00</p>
          </motion.div>
        </div>
      </CardBody>
    </Card>
  );
}

function DesignView() {
  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10">
        <div className="text-center py-12">
          <h3 className="text-2xl font-medium mb-4">Дизайн</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-10">
            Работаем над дизайном в Figma. Вы можете следить за прогрессом в реальном времени.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              as="a"
              href="#"
              target="_blank"
              variant="bordered"
              radius="full"
              size="lg"
              className="border-gray-300 px-8"
              endContent={<ExternalLink className="w-4 h-4" />}
            >
              Открыть Figma
            </Button>
          </motion.div>
        </div>
      </CardBody>
    </Card>
  );
}

function DevelopmentView() {
  const tasks = [
    { id: 1, title: 'Настройка проекта', status: 'done' },
    { id: 2, title: 'Верстка главной страницы', status: 'done' },
    { id: 3, title: 'Интеграция API', status: 'in_progress' },
    { id: 4, title: 'Авторизация', status: 'pending' },
    { id: 5, title: 'Админ-панель', status: 'pending' },
  ];

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-medium">Разработка</h3>
          <span className="text-sm text-gray-500">{completedCount} из {tasks.length}</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-3">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  task.status === 'done'
                    ? 'bg-black text-white'
                    : task.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {task.status === 'done' ? (
                  <Check className="w-4 h-4" />
                ) : task.status === 'in_progress' ? (
                  <motion.div
                    className="w-2 h-2 bg-yellow-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ) : (
                  <span className="text-xs">{task.id}</span>
                )}
              </div>
              <span
                className={
                  task.status === 'done' ? 'text-gray-400 line-through' : 'font-medium'
                }
              >
                {task.title}
              </span>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function TestingView() {
  const stats = [
    { label: 'Всего тестов', value: 24, color: 'bg-gray-100' },
    { label: 'Пройдено', value: 22, color: 'bg-green-50 text-green-600' },
    { label: 'Ошибок', value: 2, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
      <CardBody className="p-10">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-medium mb-4">Тестирование</h3>
          <p className="text-gray-500">Проверяем качество продукта перед запуском</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 text-center ${stat.color}`}
            >
              <p className="text-4xl font-light mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress ring */}
        <div className="flex justify-center mt-10">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#000"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={351.86}
                initial={{ strokeDashoffset: 351.86 }}
                animate={{ strokeDashoffset: 351.86 * 0.08 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-light">92%</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
