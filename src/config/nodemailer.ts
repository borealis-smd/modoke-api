import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: "Equipe Borealis <joao.barroso@alu.ufc.br>",
    to,
    subject,
    text,
  });
};

const greetingTemplate = (name: string) => `
      <html lang="pt-br">
        <head>
          <style>
            h1 { color: blue; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h1>Olá!</h1>
          <p>Este é um email de teste com HTML e CSS.</p>
        </body>
      </html>
    `;
export const sendGreetingEmail = async (to: string, name: string) => {
  await transporter.sendMail({
    from: "Equipe Borealis <joao.barroso@alu.ufc.br>",
    to,
    subject: "Bem-vinde ao sistema!",
    html: greetingTemplate(name),
  });
};
