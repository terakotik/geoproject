'use server';
/**
 * @fileOverview A flow for sending emails using nodemailer.
 *
 * - sendEmail - A function that handles sending emails.
 * - SendEmailInput - The input type for the sendEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as nodemailer from 'nodemailer';

const SendEmailInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  phone: z.string().describe('The phone number of the person.'),
  email: z.string().optional().describe('The email of the person.'),
  service: z.string().optional().describe('The service the person is interested in.'),
  message: z.string().optional().describe('The message content.'),
  task: z.string().optional().describe('A short description of the task.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export async function sendEmail(input: SendEmailInput): Promise<{ success: boolean; error?: string }> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: z.object({ success: z.boolean(), error: z.string().optional() }),
  },
  async (input) => {
    const { name, phone, email, service, message, task } = input;

    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.YANDEX_EMAIL_USER,
        pass: process.env.YANDEX_EMAIL_PASSWORD,
      },
    });

    const emailHtml = `
      <h1>Новая заявка с сайта!</h1>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${service ? `<p><strong>Интересующая услуга:</strong> ${service}</p>` : ''}
      ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ''}
      ${task ? `<p><strong>Коротко о задаче:</strong> ${task}</p>` : ''}
    `;

    const mailOptions = {
      from: `"ГЕОСТРОЙПРОЕКТ" <${process.env.YANDEX_EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Новая заявка с сайта ГЕОСТРОЙПРОЕКТ',
      html: emailHtml,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send email:', error);
      return { success: false, error: error.message };
    }
  }
);
