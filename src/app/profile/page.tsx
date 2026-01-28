'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Avatar, Card, CardBody } from '@heroui/react';
import { Camera, Check, Link as LinkIcon, LogOut, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const socialLinks = [
  { id: 'telegram', name: 'Telegram', icon: '📱', connected: true, username: '@alexey' },
  { id: 'slack', name: 'Slack', icon: '💬', connected: false, username: '' },
  { id: 'email', name: 'Email для уведомлений', icon: '📧', connected: true, username: 'alex@company.com' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '📞', connected: false, username: '' },
];

export default function Profile() {
  const [name, setName] = useState('Алексей Иванов');
  const [email, setEmail] = useState('alex@company.com');
  const [company, setCompany] = useState('TechCorp');
  const [position, setPosition] = useState('Product Manager');
  const [phone, setPhone] = useState('+7 999 123-45-67');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-[900px] mx-auto px-6 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-light mb-16"
          >
            Профиль
          </motion.h1>

          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-8 mb-16"
          >
            <div className="relative">
              <Avatar className="w-28 h-28 bg-gray-100 text-2xl" showFallback name={name} />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </div>
            <div>
              <h2 className="text-2xl font-medium">{name}</h2>
              <p className="text-gray-500">{position} в {company}</p>
            </div>
          </motion.div>

          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-50 border-0 rounded-3xl mb-8">
              <CardBody className="p-10">
                <h3 className="text-xl font-medium mb-8">Личная информация</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-white border-gray-200',
                    }}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-white border-gray-200',
                    }}
                  />
                  <Input
                    label="Компания"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-white border-gray-200',
                    }}
                  />
                  <Input
                    label="Должность"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-white border-gray-200',
                    }}
                  />
                  <Input
                    label="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    radius="lg"
                    size="lg"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-white border-gray-200',
                    }}
                  />
                </div>
                <div className="mt-8 flex justify-end">
                  <Button radius="full" size="lg" className="bg-black text-white px-8">
                    Сохранить
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Connected Accounts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-50 border-0 rounded-3xl mb-8">
              <CardBody className="p-10">
                <h3 className="text-xl font-medium mb-3">Способы связи</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Привяжите мессенджеры, чтобы менеджер мог связаться удобным способом
                </p>
                <div className="space-y-4">
                  {socialLinks.map((link, i) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{link.icon}</span>
                        <div>
                          <p className="font-medium">{link.name}</p>
                          {link.connected && (
                            <p className="text-sm text-gray-500">{link.username}</p>
                          )}
                        </div>
                      </div>
                      {link.connected ? (
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Подключено
                          </span>
                          <Button variant="light" size="sm" radius="full" className="text-gray-500">
                            Отключить
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="bordered"
                          size="sm"
                          radius="full"
                          className="border-gray-200"
                          startContent={<LinkIcon className="w-4 h-4" />}
                        >
                          Подключить
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-50 border-0 rounded-3xl mb-8">
              <CardBody className="p-10">
                <h3 className="text-xl font-medium mb-8">Уведомления</h3>
                <div className="space-y-4">
                  <NotificationToggle
                    title="Email уведомления"
                    description="Получать обновления о статусе заказов"
                    defaultChecked={true}
                  />
                  <NotificationToggle
                    title="Push уведомления"
                    description="Мгновенные уведомления в браузере"
                    defaultChecked={false}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gray-50 border-0 rounded-3xl">
              <CardBody className="p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Выйти из аккаунта</h3>
                    <p className="text-gray-500 text-sm">Вы сможете войти снова в любое время</p>
                  </div>
                  <Button
                    variant="bordered"
                    radius="full"
                    className="border-gray-200"
                    startContent={<LogOut className="w-4 h-4" />}
                  >
                    Выйти
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <motion.button
        onClick={() => setChecked(!checked)}
        className={`w-14 h-8 rounded-full transition-colors relative ${
          checked ? 'bg-black' : 'bg-gray-200'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full absolute top-1"
          animate={{ x: checked ? 28 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
}
