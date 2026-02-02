'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <span className="text-2xl font-medium tracking-tight">goji</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <div className="flex items-center gap-8 text-sm">
                {!isLanding && (
                  <>
                    <NavLink href="/portfolio">Портфолио</NavLink>
                    <NavLink href="/orders">Заказы</NavLink>
                    <NavLink href="/profile">Профиль</NavLink>
                  </>
                )}
                <NavLink href="/roadmap">Roadmap</NavLink>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <Button variant="light" radius="full" className="text-sm font-normal px-6">
                    Войти
                  </Button>
                </Link>
                <Link href="/order/new">
                  <Button
                    radius="full"
                    className="bg-black text-white text-sm font-normal px-6 hover:scale-105 transition-transform"
                  >
                    Начать проект
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                className="w-6 h-px bg-black origin-center"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-px bg-black"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                className="w-6 h-px bg-black origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="pt-24 px-6 flex flex-col gap-8">
              <MobileNavLink href="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
                Портфолио
              </MobileNavLink>
              <MobileNavLink href="/orders" onClick={() => setIsMobileMenuOpen(false)}>
                Мои заказы
              </MobileNavLink>
              <MobileNavLink href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                Профиль
              </MobileNavLink>
              <MobileNavLink href="/roadmap" onClick={() => setIsMobileMenuOpen(false)}>
                Roadmap
              </MobileNavLink>
              <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="bordered" radius="full" className="w-full">
                    Войти
                  </Button>
                </Link>
                <Link href="/order/new" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button radius="full" className="w-full bg-black text-white">
                    Начать проект
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative group transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-black transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href} onClick={onClick} className="text-4xl font-light">
        {children}
      </Link>
    </motion.div>
  );
}
