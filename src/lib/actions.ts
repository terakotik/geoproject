'use server';

import * as z from 'zod';
import * as nodemailer from 'nodemailer';

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().optional(),
  privacy: z.boolean().refine(val => val === true),
});

const sheetSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    task: z.string().optional(),
    privacy: z.boolean().refine(val => val === true),
});

type SendEmailResult = {
  success: boolean;
  message: string;
};

const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
      user: process.env.YANDEX_EMAIL_USER,
      pass: process.env.YANDEX_EMAIL_PASSWORD,
    },
});

export async function sendContactForm(
  data: z.infer<typeof formSchema>
): Promise<SendEmailResult> {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    console.error('Validation errors:', parsedData.error.flatten().fieldErrors);
    return { success: false, message: 'Неверные данные формы.' };
  }

  const { name, phone, email, service, message } = parsedData.data;

  const subject = `Новая заявка с сайта ГЕОСТРОЙПРОЕКТ от ${name}`;
  const body = `
Имя: ${name}
Телефон: ${phone}
Email: ${email || 'Не указан'}
Интересующая услуга: ${service || 'Не указана'}
Сообщение:
${message || 'Нет сообщения'}
    `.trim();

  try {
    await transporter.sendMail({
      from: `"ГЕОСТРОЙПРОЕКТ" <${process.env.YANDEX_EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: subject,
      text: body,
    });
    return { success: true, message: 'Ваша заявка успешно отправлена!' };
  } catch (error: any) {
    console.error('Ошибка отправки письма:', error);
    return {
      success: false,
      message: error.message || 'Произошла неизвестная ошибка при отправке.',
    };
  }
}


export async function sendSheetForm(
    data: z.infer<typeof sheetSchema>
  ): Promise<SendEmailResult> {
    const parsedData = sheetSchema.safeParse(data);
  
    if (!parsedData.success) {
      console.error('Validation errors (sheet):', parsedData.error.flatten().fieldErrors);
      return { success: false, message: 'Неверные данные формы.' };
    }
  
    const { name, phone, task } = parsedData.data;
  
    const subject = `Заказ звонка с сайта ГЕОСТРОЙПРОЕКТ от ${name}`;
    const body = `
Имя: ${name}
Телефон: ${phone}
Коротко о задаче:
${task || 'Не указано'}
      `.trim();
  
    try {
      await transporter.sendMail({
        from: `"ГЕОСТРОЙПРОЕКТ" <${process.env.YANDEX_EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: subject,
        text: body,
      });
      return { success: true, message: 'Ваша заявка успешно отправлена!' };
    } catch (error: any) {
      console.error('Ошибка отправки письма (sheet):', error);
      return {
        success: false,
        message: error.message || 'Произошла неизвестная ошибка при отправке.',
      };
    }
  }
