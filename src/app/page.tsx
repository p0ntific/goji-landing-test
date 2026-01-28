'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button, Card, CardBody, Avatar } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, TrendingDown, Users } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { id: 1, title: 'Финтех платформа', client: 'FinBank', category: 'UX/UI', color: '#f5f5f5' },
  { id: 2, title: 'Мобильное приложение', client: 'QuickFood', category: 'Mobile', color: '#fafafa' },
  { id: 3, title: 'Корпоративный портал', client: 'TechCorp', category: 'Web', color: '#f0f0f0' },
  { id: 4, title: 'Ребрендинг', client: 'StyleCo', category: 'Branding', color: '#f8f8f8' },
];

const chartData = [
  { month: 'Янв', without: 100, with: 100 },
  { month: 'Фев', without: 108, with: 94 },
  { month: 'Мар', without: 120, with: 85 },
  { month: 'Апр', without: 135, with: 75 },
  { month: 'Май', without: 155, with: 68 },
  { month: 'Июн', without: 170, with: 60 },
];

const team = [
  { name: 'Алексей Иванов', role: 'CEO & Founder', initials: 'АИ' },
  { name: 'Мария Петрова', role: 'Head of Design', initials: 'МП' },
  { name: 'Дмитрий Сидоров', role: 'Tech Lead', initials: 'ДС' },
  { name: 'Анна Козлова', role: 'Project Manager', initials: 'АК' },
];

const currentOrders = [
  { id: 'ORD-2847', stage: 'Дизайн', progress: 60 },
  { id: 'ORD-2846', stage: 'Разработка', progress: 35 },
  { id: 'ORD-2845', stage: 'Тестирование', progress: 85 },
];

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const startWorkRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isInStartWork, setIsInStartWork] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );

      // Scroll-triggered animations
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Stagger animations for cards
      gsap.utils.toArray<HTMLElement>('.stagger-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      // Parallax effect on shapes
      gsap.utils.toArray<HTMLElement>('.parallax-shape').forEach((el) => {
        gsap.to(el, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (startWorkRef.current) {
        const rect = startWorkRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsInStartWork(isInside);
        if (isInside) {
          setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartWorkClick = () => {
    router.push('/order/new');
  };

  return (
    <div ref={containerRef} className="relative">
      <Navbar />

      {/* Floating shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="parallax-shape absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-gray-50 blur-3xl opacity-60" />
        <div className="parallax-shape absolute top-[60%] left-[5%] w-96 h-96 rounded-full bg-gray-100 blur-3xl opacity-40" />
      </div>

      {/* Sticky CTA Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <Link href="/order/new">
          <Button
            radius="full"
            size="lg"
            className="bg-black text-white px-8 shadow-2xl hover:scale-105 transition-transform"
          >
            Начать проект
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center justify-center px-6 relative"
      >
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-200 opacity-30"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-200 opacity-20"
          />

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm tracking-[0.3em] text-gray-400 uppercase mb-8"
          >
            Дизайн-студия
          </motion.p>

          <h1
            ref={titleRef}
            className="text-[clamp(3rem,12vw,10rem)] font-light leading-[0.9] tracking-tight mb-8"
          >
            Создаём
            <br />
            <span className="font-medium">цифровые</span>
            <br />
            <span className="italic font-light text-gray-400">продукты</span>
          </h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl text-gray-500 max-w-xl mx-auto"
          >
            Прозрачность, качество и честные отношения
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-up">
              <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-6">
                Для менеджеров
              </p>
              <h2 className="text-5xl md:text-6xl font-light leading-[1.1] mb-8">
                Управляйте
                <br />
                проектами
                <br />
                <span className="font-medium">без хаоса</span>
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                Goji — это платформа, где вы всегда знаете статус проекта. Никаких скрытых
                процессов, никаких сюрпризов. Только честная работа.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 reveal-up">
              {[
                { value: '150+', label: 'Проектов' },
                { value: '98%', label: 'В срок' },
                { value: '4.9', label: 'Рейтинг' },
                { value: '24/7', label: 'Поддержка' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="stagger-item"
                >
                  <Card className="bg-gray-50 border-0 rounded-3xl h-40 hover:shadow-xl transition-shadow duration-500">
                    <CardBody className="flex flex-col items-center justify-center">
                      <p className="text-5xl font-light mb-2">{stat.value}</p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 px-6 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex justify-between items-end mb-16 reveal-up">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">Портфолио</p>
              <h2 className="text-5xl md:text-6xl font-light">Наши работы</h2>
            </div>
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
            >
              Все проекты
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item, i) => (
              <Link key={item.id} href={`/portfolio/${item.id}`}>
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="stagger-item group"
                >
                  <Card className="border-0 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500">
                    <CardBody className="p-0">
                      <div
                        className="aspect-[16/10] relative overflow-hidden"
                        style={{ backgroundColor: item.color }}
                      >
                        {/* Placeholder image area */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-2xl bg-white/50 backdrop-blur-sm" />
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs tracking-wider text-gray-400 uppercase">
                            {item.category}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-xs text-gray-400">{item.client}</span>
                        </div>
                        <h3 className="text-2xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                          {item.title}
                        </h3>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal-up">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">Экономия</p>
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              Снижение <span className="font-medium">расходов</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-xl mx-auto">
              Сравнение затрат при работе с нами и традиционными агентствами
            </p>
          </div>

          <div className="reveal-up">
            <Card className="bg-gray-50 border-0 rounded-3xl overflow-hidden">
              <CardBody className="p-12">
                <div className="flex gap-12 mb-8 justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                    <span className="text-sm text-gray-500">Без Goji</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-black" />
                    <span className="text-sm text-gray-500">С Goji</span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="withGoji" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
                    <Area
                      type="monotone"
                      dataKey="without"
                      stroke="#d1d5db"
                      strokeWidth={2}
                      fill="transparent"
                    />
                    <Area
                      type="monotone"
                      dataKey="with"
                      stroke="#000"
                      strokeWidth={3}
                      fill="url(#withGoji)"
                    />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="flex justify-center mt-8">
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full">
                    <TrendingDown className="w-5 h-5" />
                    <span className="font-medium">До 35% экономии</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-[0.02]" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20 reveal-up">
            <p className="text-sm tracking-[0.2em] text-gray-500 uppercase mb-4">Команда</p>
            <h2 className="text-5xl md:text-6xl font-light">
              Люди за <span className="italic">проектами</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="stagger-item text-center"
              >
                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center text-2xl font-light">
                  {member.initials}
                </div>
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Orders Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal-up">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-4">В работе</p>
            <h2 className="text-5xl md:text-6xl font-light mb-6">Текущие заказы</h2>
            <p className="text-xl text-gray-500">Анонимно показываем статус активных проектов</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 reveal-up">
            {currentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gray-50 border-0 rounded-2xl">
                  <CardBody className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-400 font-mono">{order.id}</span>
                      <span className="text-sm font-medium">{order.stage}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${order.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-black rounded-full"
                      />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Work Section */}
      <section
        ref={startWorkRef}
        onClick={handleStartWorkClick}
        className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden cursor-none"
      >
        {/* Animated background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[150%] h-[150%] opacity-10"
          style={{
            background: 'conic-gradient(from 0deg, transparent, white, transparent)',
          }}
        />

        {/* Custom cursor */}
        {isInStartWork && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute w-32 h-32 bg-white rounded-full flex items-center justify-center pointer-events-none z-20"
            style={{
              left: cursorPosition.x - 64,
              top: cursorPosition.y - 64,
            }}
          >
            <span className="text-black text-sm font-medium">Начать</span>
          </motion.div>
        )}

        <div className="max-w-[1400px] mx-auto text-center relative z-10 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-light mb-8"
          >
            Готовы
            <br />
            <span className="font-medium">начать?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400"
          >
            Нажмите в любом месте
          </motion.p>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-32 bg-black" />
    </div>
  );
}
