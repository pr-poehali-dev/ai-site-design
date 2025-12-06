import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я ваш AI-ассистент. Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Это демо-ответ нейросети. В production версии здесь будет реальная интеграция с AI.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="glass sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-heading font-bold gradient-text">NeuroAI</span>
          </div>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`font-medium transition-colors ${
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`font-medium transition-colors ${
                activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Чат
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`font-medium transition-colors ${
                activeTab === 'docs' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Документация
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`font-medium transition-colors ${
                activeTab === 'examples' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Примеры
            </button>
          </div>
          <Button variant="default" className="bg-gradient-to-r from-primary to-secondary glow">
            <Icon name="User" size={18} className="mr-2" />
            Аккаунт
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="space-y-20 animate-fade-in">
            <section className="text-center space-y-6 py-20">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 animate-pulse-glow">
                Новое поколение AI
              </Badge>
              <h1 className="text-6xl md:text-7xl font-heading font-bold gradient-text animate-fade-in">
                Будущее уже здесь
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Облачная платформа для работы с нейросетями. Мощные AI-модели, простой интерфейс, гибкие тарифы.
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  onClick={() => setActiveTab('chat')}
                  className="bg-gradient-to-r from-primary to-secondary glow text-lg px-8"
                >
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Начать работу
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Icon name="PlayCircle" size={20} className="mr-2" />
                  Демо
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Zap',
                  title: 'Молниеносно',
                  description: 'Обработка запросов за миллисекунды с помощью облачной инфраструктуры',
                },
                {
                  icon: 'Shield',
                  title: 'Безопасно',
                  description: 'Шифрование данных и полное соответствие стандартам безопасности',
                },
                {
                  icon: 'TrendingUp',
                  title: 'Масштабируемо',
                  description: 'От стартапа до энтерпрайза — платформа растет вместе с вами',
                },
              ].map((feature, idx) => (
                <Card key={idx} className="glass p-8 hover:glow transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={feature.icon as any} size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </section>

            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-heading font-bold gradient-text">Тарифные планы</h2>
                <p className="text-muted-foreground">Выберите план, который подходит именно вам</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Starter',
                    price: '990',
                    features: ['100 запросов/день', 'Базовые модели', 'Email поддержка', 'API доступ'],
                  },
                  {
                    name: 'Pro',
                    price: '2990',
                    features: ['1000 запросов/день', 'Все модели', 'Приоритетная поддержка', 'Расширенный API', 'Аналитика'],
                    popular: true,
                  },
                  {
                    name: 'Enterprise',
                    price: 'Custom',
                    features: ['Безлимит', 'Кастомные модели', '24/7 поддержка', 'Выделенная инфраструктура', 'SLA'],
                  },
                ].map((plan, idx) => (
                  <Card
                    key={idx}
                    className={`glass p-8 relative ${
                      plan.popular ? 'border-2 border-primary glow scale-105' : ''
                    } hover:scale-105 transition-transform duration-300`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                        Популярный
                      </Badge>
                    )}
                    <h3 className="text-2xl font-heading font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-muted-foreground"> ₽/месяц</span>}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Icon name="Check" size={18} className="text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular ? 'bg-gradient-to-r from-primary to-secondary glow' : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Выбрать план
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Card className="glass h-[calc(100vh-12rem)] flex flex-col">
              <div className="p-6 border-b border-border/50">
                <h2 className="text-2xl font-heading font-bold gradient-text">AI Чат</h2>
                <p className="text-sm text-muted-foreground">Общайтесь с нейросетью в реальном времени</p>
              </div>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                          <Icon name="Bot" size={20} className="text-white" />
                        </div>
                      )}
                      <Card
                        className={`p-4 max-w-[70%] ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-primary to-secondary text-white'
                            : 'glass'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </Card>
                      {message.role === 'user' && (
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={20} className="text-background" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name="Bot" size={20} className="text-white" />
                      </div>
                      <Card className="glass p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-6 border-t border-border/50">
                <div className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Напишите ваш запрос..."
                    className="glass"
                  />
                  <Button onClick={handleSend} className="bg-gradient-to-r from-primary to-secondary glow">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-heading font-bold gradient-text">Документация</h2>
              <p className="text-muted-foreground">Всё что нужно знать для работы с платформой</p>
            </div>
            <div className="grid gap-6">
              {[
                { icon: 'BookOpen', title: 'Быстрый старт', description: 'Начните работу за 5 минут' },
                { icon: 'Code', title: 'API Reference', description: 'Полная документация API' },
                { icon: 'Settings', title: 'Настройка', description: 'Конфигурация и параметры' },
                { icon: 'HelpCircle', title: 'FAQ', description: 'Часто задаваемые вопросы' },
              ].map((doc, idx) => (
                <Card key={idx} className="glass p-6 hover:glow transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon name={doc.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold mb-2">{doc.title}</h3>
                      <p className="text-muted-foreground">{doc.description}</p>
                    </div>
                    <Icon name="ChevronRight" size={24} className="text-muted-foreground ml-auto" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-heading font-bold gradient-text">Примеры использования</h2>
              <p className="text-muted-foreground">Вдохновитесь возможностями нейросетей</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: 'MessageSquare',
                  title: 'Чат-боты',
                  description: 'Умные помощники для вашего бизнеса',
                  tag: 'Популярное',
                },
                {
                  icon: 'FileText',
                  title: 'Генерация текстов',
                  description: 'Статьи, описания, контент любой сложности',
                  tag: 'Новое',
                },
                {
                  icon: 'Image',
                  title: 'Анализ изображений',
                  description: 'Распознавание и классификация объектов',
                  tag: 'AI Vision',
                },
                {
                  icon: 'Languages',
                  title: 'Переводы',
                  description: 'Высококачественный перевод на 50+ языков',
                  tag: 'Мультиязычность',
                },
              ].map((example, idx) => (
                <Card key={idx} className="glass p-8 hover:glow transition-all duration-300 cursor-pointer group">
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">{example.tag}</Badge>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={example.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-3">{example.title}</h3>
                  <p className="text-muted-foreground mb-6">{example.description}</p>
                  <Button variant="outline" className="w-full group-hover:border-primary">
                    Попробовать
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="glass border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Sparkles" className="text-white" size={24} />
                </div>
                <span className="text-xl font-heading font-bold gradient-text">NeuroAI</span>
              </div>
              <p className="text-sm text-muted-foreground">Облачная платформа для работы с нейросетями</p>
            </div>
            {[
              { title: 'Продукт', links: ['Возможности', 'Цены', 'API', 'Документация'] },
              { title: 'Компания', links: ['О нас', 'Блог', 'Карьера', 'Контакты'] },
              { title: 'Поддержка', links: ['Помощь', 'FAQ', 'Статус', 'Сообщество'] },
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="font-heading font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2024 NeuroAI. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
