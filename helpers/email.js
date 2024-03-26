import nodemailer from 'nodemailer';

export const emaiRegister = async data => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email information
  await transport.sendMail({
    from: '"Equipo Finanzas Personales" <edgar.romero@outlook.com>',
    to: email,
    subject: 'Finanzas Personales - Confirma tu cuenta',
    text: 'Comprueba tu cuenta en Finanzas Personales',
    html: `<p>Hola ${name} Comprueba tu cuenta en Finanzas Personales</p>
          <p>Tu Cuenta ya casi esta lista, solo debes comprobar en el siguiente enlace: <a href="http://localhost:4000/confirm/${token}">Comprobar Cuenta</a></p>
          <p>Si tu no creaste este cuenta, puedes ignorar el mensaje</p>`
  });
};

export const emailForgetPassword = async data => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transport.sendMail({
    from: '"Equipo Finanzas Personales" <edgar.romero@outlook.com>',
    to: email,
    subject: 'Finanzas Personales - Reestablish your password',
    text: 'Reestablish your password',
    html: `<p>Hola ${name} has solicitado reestablecer tu contraseña</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña: <a href="http://localhost:4000/forget-password/${token}">Reestablecer contraseña</a></p>
    <p>Si tu no solicistaste este email, puedes ignorar el mensaje</p>`
  });
};
