'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Input, Divider, Checkbox } from '@heroui/react';
import { Eye, EyeOff, Check } from 'lucide-react';

type Step = 'email' | 'details' | 'verify';

export default function Register() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && password && agreed) setStep('verify');
  };

  const passwordStrength = () => {
    if (password.length === 0) return { text: '', color: '', width: '0%' };
    if (password.length < 6) return { text: 'Слабый', color: 'bg-red-500', width: '33%' };
    if (password.length < 10) return { text: 'Средний', color: 'bg-yellow-500', width: '66%' };
    return { text: 'Надёжный', color: 'bg-green-500', width: '100%' };
  };

  const steps = ['email', 'details', 'verify'];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-white/30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-white/30"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        <div className="relative z-10 text-center max-w-md px-12">
          <h2 className="text-5xl font-light mb-6">Добро пожаловать</h2>
          <p className="text-gray-400 text-lg">
            Присоединяйтесь к платформе, где прозрачность и качество на первом месте
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="text-2xl font-medium tracking-tight">
              goji
            </Link>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i < currentStepIndex
                      ? 'bg-black text-white'
                      : i === currentStepIndex
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                  animate={{ scale: i === currentStepIndex ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {i < currentStepIndex ? <Check className="w-4 h-4" /> : i + 1}
                </motion.div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 h-px mx-2 transition-colors ${
                      i < currentStepIndex ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white lg:bg-gray-50 rounded-3xl lg:p-10">
            {step === 'email' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-3xl font-light text-center mb-2">Создать аккаунт</h1>
                <p className="text-gray-500 text-center mb-10">Введите email для регистрации</p>

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

                <Divider className="my-8" />

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
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-3xl font-light text-center mb-2">Расскажите о себе</h1>
                <p className="text-gray-500 text-center mb-10">{email}</p>

                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    ← Изменить email
                  </button>

                  <Input
                    label="Имя"
                    placeholder="Как к вам обращаться?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'border-gray-200 bg-white',
                    }}
                  />
                  <Input
                    label="Компания"
                    placeholder="Опционально"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'border-gray-200 bg-white',
                    }}
                  />
                  <div>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      label="Пароль"
                      placeholder="Минимум 8 символов"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    {password && (
                      <div className="mt-2">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${passwordStrength().color}`}
                            initial={{ width: 0 }}
                            animate={{ width: passwordStrength().width }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{passwordStrength().text}</p>
                      </div>
                    )}
                  </div>

                  <Checkbox
                    isSelected={agreed}
                    onValueChange={setAgreed}
                    size="sm"
                    classNames={{ label: 'text-sm text-gray-500' }}
                  >
                    Я согласен с{' '}
                    <Link href="/terms" className="text-black hover:underline">
                      условиями
                    </Link>
                  </Checkbox>

                  <Button
                    type="submit"
                    radius="full"
                    size="lg"
                    className="w-full bg-black text-white"
                    isDisabled={!name || !password || !agreed}
                  >
                    Создать аккаунт
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 'verify' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-8 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>
                <h1 className="text-3xl font-light mb-4">Проверьте почту</h1>
                <p className="text-gray-500 mb-2">Мы отправили письмо на</p>
                <p className="font-medium mb-8">{email}</p>
                <Button variant="light" radius="full" className="text-gray-500">
                  Отправить повторно
                </Button>
              </motion.div>
            )}
          </div>

          {step !== 'verify' && (
            <p className="text-center text-sm text-gray-500 mt-8">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="text-black hover:underline">
                Войти
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
