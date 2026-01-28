'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Финтех платформа',
    client: 'FinBank',
    category: 'UX/UI Design',
    year: '2024',
    size: 'large',
    color: '#f5f5f5',
  },
  {
    id: 2,
    title: 'Мобильное приложение доставки',
    client: 'QuickFood',
    category: 'Mobile App',
    year: '2024',
    size: 'small',
    color: '#fafafa',
  },
  {
    id: 3,
    title: 'Корпоративный портал',
    client: 'TechCorp',
    category: 'Web Development',
    year: '2024',
    size: 'small',
    color: '#f0f0f0',
  },
  {
    id: 4,
    title: 'Ребрендинг',
    client: 'StyleCo',
    category: 'Branding',
    year: '2023',
    size: 'large',
    color: '#f8f8f8',
  },
  {
    id: 5,
    title: 'E-commerce платформа',
    client: 'ShopMax',
    category: 'Web Development',
    year: '2023',
    size: 'medium',
    color: '#fafafa',
  },
  {
    id: 6,
    title: 'Дашборд аналитики',
    client: 'DataViz',
    category: 'UX/UI Design',
    year: '2023',
    size: 'medium',
    color: '#f5f5f5',
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-6">Портфолио</p>
            <h1 className="text-6xl md:text-8xl font-light leading-[0.95] mb-8">
              Избранные
              <br />
              <span className="font-medium italic">проекты</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl">
              Каждый проект — это история о том, как мы решаем задачи наших клиентов
            </p>
          </motion.div>
        </div>
      </section>

      {/* Decorative shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-[30%] right-[5%] w-80 h-80 rounded-full border border-gray-100"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute bottom-[20%] left-[10%] w-40 h-40 bg-gray-50 rounded-full blur-3xl" />
      </div>

      {/* Projects Grid */}
      <section className="px-6 pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {projects.map((project, index) => {
              const isLarge = project.size === 'large';
              const isMedium = project.size === 'medium';

              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.id}`}
                  className={`project-card group ${
                    isLarge
                      ? 'col-span-12 md:col-span-8'
                      : isMedium
                        ? 'col-span-12 md:col-span-6'
                        : 'col-span-12 md:col-span-4'
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-3xl"
                  >
                    {/* Image area */}
                    <div
                      className={`relative overflow-hidden ${
                        isLarge ? 'aspect-[16/9]' : isMedium ? 'aspect-[4/3]' : 'aspect-square'
                      }`}
                      style={{ backgroundColor: project.color }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className={`rounded-2xl bg-white/60 backdrop-blur-sm ${
                            isLarge ? 'w-40 h-40' : 'w-24 h-24'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                      {/* Project number */}
                      <div className="absolute top-6 left-6 text-xs text-gray-400 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-white">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs tracking-wider text-gray-400 uppercase">
                          {project.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-xs text-gray-400">{project.year}</span>
                      </div>
                      <h3
                        className={`font-medium mb-2 group-hover:translate-x-2 transition-transform duration-300 ${
                          isLarge ? 'text-3xl' : 'text-xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{project.client}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-8">
              Хотите <span className="italic">похожий</span> проект?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
              Свяжитесь с нами, чтобы обсудить вашу идею
            </p>
            <Link href="/order/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-medium"
              >
                Начать проект
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
