
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const workOrder = [
    { step: 1, text: 'Заказываем выписку из ЕГРН (бесплатно).' },
    { step: 2, text: 'Приезжаем на участок в удобное для Вас время. Обмеряем помещения, координируем здание, готовим поэтажные планы.' },
    { step: 3, text: 'Готовим декларацию, Вы подписываете ее в офисе, либо дистанционно по e-mail.' },
    { step: 4, text: 'Формируем технический план. Передаем его Вам на диске для подачи в МФЦ.' },
    { step: 5, text: 'При заказе регистрации дома «под ключ» мы сами подаем в Росреестр.' }
];

const requirements = [
    'Документы на право собственности',
    'Паспорт, СНИЛС, ИНН'
];

const objectRequirements = [
    'Замкнут теплый контур (окна, двери, крыша, стены)',
    'Установлены основные перегородки'
];

const otherServices = [
    'Вынос границ в натуру',
    'Раздел/объединение участков',
    'Акт обследования',
    'Геодезическая съемка',
    'Регистрация перепланировок'
];

export default function MemoPage() {
    return (
        <div className="py-16 md:py-24 bg-gradient-hero">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-primary text-primary-foreground rounded-full p-4 mb-4">
                            <Building className="h-10 w-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Памятка: Регистрация дома</h1>
                        <p className="text-lg text-muted-foreground mt-4">Краткое руководство по процессу регистрации вашего дома.</p>
                    </div>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl font-heading">Порядок работ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {workOrder.map((item) => (
                                    <li key={item.step} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">{item.step}</div>
                                        <p className="text-muted-foreground mt-1">{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl font-heading">Что от Вас потребуется?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {requirements.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl font-heading">Основные требования к завершенному объекту</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {objectRequirements.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>

                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl font-heading">Еще мы делаем</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {otherServices.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>

                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <div className="text-center mt-12">
                        <Card className="inline-block p-6 bg-card border">
                             <CardTitle className="text-xl font-heading mb-4">Вопросы? Звоните!</CardTitle>
                             <div className="space-y-2">
                                <a href="tel:+79522764940" className="block text-lg font-semibold text-primary hover:underline">+7 (952) 276-49-40</a>
                                <a href="tel:+79108247848" className="block text-lg font-semibold text-primary hover:underline">+7 (910) 824-78-48</a>
                                <a href="tel:+79916815899" className="block text-lg font-semibold text-primary hover:underline">+7 (991) 681-58-99</a>
                             </div>
                             <p className="text-muted-foreground text-sm mt-4">Срок выполнения до 10 дней</p>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
