'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Input, Divider } from '@heroui/react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep('password');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full border border-gray-200"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border border-gray-200"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10 text-center">
          <h2 className="text-6xl font-light mb-4">goji</h2>
          <p className="text-gray-500">Создаём цифровые продукты</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="text-center mb-12 lg:hidden">
            <Link href="/" className="text-2xl font-medium tracking-tight">
              goji
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white lg:bg-gray-50 rounded-3xl lg:p-10">
            <h1 className="text-3xl font-light text-center mb-2">Вход</h1>
            <p className="text-gray-500 text-center mb-10">
              {step === 'email' ? 'Введите email для продолжения' : `Добро пожаловать`}
            </p>

            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <Input
                  type="email"
                  label="Email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  radius="lg"
                  size="lg"
                  variant="bordered"
                  classNames={{
                    inputWrapper: 'border-gray-200 bg-white',
                  }}
                />
                <Button
                  type="submit"
                  radius="full"
                  size="lg"
                  className="w-full bg-black text-white"
                  isDisabled={!email}
                >
                  Продолжить
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  ← Изменить email
                </button>
                <p className="text-sm text-gray-600 -mt-2">{email}</p>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Пароль"
                  placeholder="Введите пароль"
                  radius="lg"
                  size="lg"
                  variant="bordered"
                  classNames={{
                    inputWrapper: 'border-gray-200 bg-white',
                  }}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-black">
                    Забыли пароль?
                  </Link>
                </div>
                <Button type="submit" radius="full" size="lg" className="w-full bg-black text-white">
                  Войти
                </Button>
              </form>
            )}

            <Divider className="my-8" />

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="bordered"
                radius="full"
                size="lg"
                className="w-full border-gray-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Продолжить с Google
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-black hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
