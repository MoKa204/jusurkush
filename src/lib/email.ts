import nodemailer from "nodemailer";

interface SendResetCodeParams {
  to: string;
  code: string;
}

export async function sendResetCodeEmail({ to, code }: SendResetCodeParams) {
  // Create transport using SMTP environment variables if present, or fallback configuration
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const from = process.env.SMTP_FROM || `"JusurKush Support" <noreply@jusurkush.com>`;

  let transporter: nodemailer.Transporter;

  if (user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  } else {
    // Development fallback using Ethereal or test transporter log
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "test@ethereal.email",
        pass: "testpass",
      },
    });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <title>رمز استعادة كلمة المرور - جسور كوش</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 500px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; color: #059669; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; color: #0f172a; margin-bottom: 12px; }
        .sub { font-size: 14px; color: #64748b; margin-bottom: 24px; line-height: 1.5; }
        .code-box { background-color: #ecfdf5; border: 2px dashed #059669; color: #047857; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 16px 24px; border-radius: 12px; display: inline-block; margin: 16px 0; font-family: monospace; }
        .footer { font-size: 12px; color: #94a3b8; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">جسور كوش | JusurKush</div>
        <div class="title">رمز استعادة كلمة المرور</div>
        <p class="sub">تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. استخدم الرمز التالي لإكمال العملية. الرمز صالحة لمدة 15 دقيقة فقط.</p>
        <div class="code-box">${code}</div>
        <p class="sub">إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني بأمان.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} جسور كوش (JusurKush). جميع الحقوق محفوظة.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    if (user && pass) {
      await transporter.sendMail({
        from,
        to,
        subject: `🔑 رمز إستعادة كلمة المرور الخاص بك: ${code} - جسور كوش`,
        html: htmlContent,
        text: `رمز إستعادة كلمة المرور الخاص بك في منصة جسور كوش هو: ${code}`,
      });
      console.log(`[Email] Successfully sent reset code email to ${to}`);
    } else {
      console.log(`[Email Notice] SMTP credentials not set in env. Simulated sending reset code ${code} to ${to}`);
    }
    return true;
  } catch (error) {
    console.error("[Email Error] Failed to send email via nodemailer:", error);
    // Don't throw fatal error so API can still succeed if email service is mocked in local environment
    return false;
  }
}
