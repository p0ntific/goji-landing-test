'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Card, CardBody, Button } from '@heroui/react';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const projectData = {
  title: 'Финтех платформа',
  client: 'FinBank',
  category: 'UX/UI Design',
  year: '2024',
  duration: '4 месяца',
  team: '5 человек',
  role: 'UI/UX Design, Исследования',
  description:
    'Создание современной финтех платформы для управления личными финансами. Проект включал полный редизайн существующего продукта, разработку новой дизайн-системы и улучшение пользовательского опыта.',
  context: {
    title: 'Контекст',
    text: 'FinBank — один из крупнейших цифровых банков в регионе с более чем 2 миллионами активных пользователей. Компания столкнулась с проблемой низкой конверсии и высокого оттока пользователей из-за устаревшего интерфейса.',
    metrics: [
      { label: 'Пользователей', value: '2M+' },
      { label: 'Рынок', value: 'СНГ' },
      { label: 'NPS до', value: '32' },
    ],
  },
  challenge: {
    title: 'Задача',
    text: 'Переосмыслить пользовательский опыт мобильного банкинга. Создать интуитивный интерфейс, который упростит управление финансами и повысит вовлечённость пользователей.',
    points: [
      'Упростить навигацию и ключевые сценарии',
      'Создать единую дизайн-систему',
      'Повысить конверсию в целевые действия',
      'Снизить отток пользователей',
    ],
  },
  solution: {
    title: 'Решение',
    text: 'Мы провели глубокий анализ пользовательского поведения, создали новую информационную архитектуру и разработали интуитивный интерфейс с фокусом на ключевые пользовательские сценарии.',
  },
  results: [
    { metric: 'Конверсия', before: '2.4%', after: '5.8%', change: '+142%' },
    { metric: 'Время на задачу', before: '45 сек', after: '18 сек', change: '-60%' },
    { metric: 'Отток', before: '12%', after: '4%', change: '-67%' },
    { metric: 'NPS', before: '32', after: '67', change: '+109%' },
  ],
};

export default function PortfolioItem() {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      // Horizontal scroll for images
      const gallery = document.querySelector('.horizontal-scroll');
      if (gallery) {
        gsap.to(gallery, {
          x: () => -(gallery.scrollWidth - window.innerWidth + 100),
          ease: 'none',
          scrollTrigger: {
            trigger: gallery,
            start: 'center center',
            end: () => `+=${gallery.scrollWidth}`,
            scrub: 1,
            pin: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-end pb-20 px-6"
      >
        <div className="absolute inset-0 bg-gray-50" />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к портфолио
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm tracking-wider text-gray-400 uppercase">
                  {projectData.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-400">{projectData.year}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light leading-[1] mb-6">
                {projectData.title}
              </h1>
              <p className="text-2xl text-gray-500">{projectData.client}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { label: 'Длительность', value: projectData.duration },
                { label: 'Команда', value: projectData.team },
                { label: 'Роль', value: projectData.role },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-sm text-gray-400 mb-2">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Image */}
      <section className="px-6 py-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="aspect-video bg-gray-100 rounded-3xl overflow-hidden reveal"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </section>

      {/* Description */}
      <section className="px-6 py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl reveal">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-700">
              {projectData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="reveal">
              <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-6">
                {projectData.context.title}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                {projectData.context.text}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 reveal">
              {projectData.context.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-4xl font-light mb-2">{metric.value}</p>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="px-6 py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="reveal">
              <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-6">
                {projectData.challenge.title}
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {projectData.challenge.text}
              </p>
            </div>
            <div className="space-y-4 reveal">
              {projectData.challenge.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl"
                >
                  <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 mb-12 reveal">
          <p className="text-sm tracking-[0.2em] text-gray-400 uppercase">Процесс</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 px-6 max-w-[1400px] mx-auto">
          {[1, 2, 3, 4].map((_, i) => (
            <motion.div
              key={i}
              className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden reveal"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center reveal">
            <p className="text-sm tracking-[0.2em] text-gray-500 uppercase mb-6">
              {projectData.solution.title}
            </p>
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              {projectData.solution.text}
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-6">Результаты</p>
            <h2 className="text-5xl md:text-6xl font-light">Цифры говорят сами</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {projectData.results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-3xl p-8 text-center"
              >
                <p className="text-sm text-gray-400 mb-4">{result.metric}</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-gray-400 text-lg">{result.before}</span>
                  <span className="text-2xl">→</span>
                  <span className="text-3xl font-medium">{result.after}</span>
                </div>
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                  {result.change}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/portfolio/2" className="group block">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Следующий проект</p>
                <h3 className="text-4xl font-light group-hover:translate-x-4 transition-transform">
                  Мобильное приложение доставки
                </h3>
              </div>
              <motion.div
                className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-6 h-6" />
              </motion.div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Хотите похожий проект?
            </h2>
            <Link href="/order/new">
              <Button
                radius="full"
                size="lg"
                className="bg-black text-white px-10"
              >
                Начать проект
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
