import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_TOKEN);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'flowX Contact <info@flowx.one>',
      to: [email],
      subject: `Thank you for contacting flowX`,
      react: ContactEmail({ name }),
    });

    // You may also want to send a copy to yourself
    await resend.emails.send({
      from: 'Website Contact Form <info@flowx.one>',
      to: ['info@flowx.one'],
      subject: `New contact form submission from ${name}`,
      replyTo: email,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
