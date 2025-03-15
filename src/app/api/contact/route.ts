import { Resend } from 'resend';

const resend = new Resend('re_jmpiARkE_Q7e5c97vbEnpbHQZoPGYpttM');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'info@flowx.one',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});
