const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: {
        name: "ConnectMe",
        address: process.env.GMAIL_USER,
      },
      to: email,
      subject: "Verify your email - ConnectMe", // Changed from Willow
      html: `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email - ConnectMe</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
    </style>
  </head>
  <body style="margin: 0; padding: 15px; background-color: #f9fafb">
    <div
      style="
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Roboto', sans-serif;
        line-height: 1.6;
        color: #374151;
        max-width: 550px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      "
    >
      <div
        style="
          background: linear-gradient(
            135deg,
            #fbbf24 0%,
            #f97316 50%,
            #ef4444 100%
          );
          padding: 10px 20px;
          text-align: center;
          border-radius: 16px 16px 0 0;
        "
      >
        <h1
          style="
            color: white;
            margin: 0;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
          "
        >
          ConnectMe.
        </h1>
        <h2
          style="
            color: white;
            margin: 10px 0 0 0;
            font-size: 22px;
            font-weight: 600;
          "
        >
          Verify Your Email Address
        </h2>
      </div>

      <div
        style="
          background-color: #ffffff;
          padding: 30px 25px;
          border-radius: 0 0 16px 16px;
        "
      >
        <div style="text-align: center; margin-bottom: 25px">
          <div
            style="
              width: 70px;
              height: 70px;
              background: linear-gradient(135deg, #fbbf24, #f97316);
              border-radius: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 15px;
            "
          >
            <span style="font-size: 32px">📧</span>
          </div>
          <h3
            style="
              color: #111827;
              font-size: 19px;
              font-weight: 600;
              margin: 0 0 8px 0;
            "
          >
            Almost there!
          </h3>
          <p style="color: #6b7280; font-size: 15px; margin: 0">
            Please verify your email with the code below
          </p>
        </div>

        <div
          style="
            background: linear-gradient(135deg, #fef3c7, #fed7aa);
            border: 2px solid #fbbf24;
            border-radius: 14px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
          "
        >
          <p
            style="
              color: #92400e;
              font-size: 13px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin: 0 0 12px 0;
            "
          >
            Your Verification Code
          </p>
          <div
            style="
              font-size: 44px;
              font-weight: bold;
              letter-spacing: 6px;
              color: #ea580c;
              font-family: monospace;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "
          >
            ${verificationToken}
          </div>
          <p style="color: #92400e; font-size: 11px; margin: 12px 0 0 0">
            Enter this code in the verification page
          </p>
        </div>

        <div
          style="
            background-color: #f9fafb;
            border-radius: 10px;
            padding: 18px;
            margin: 25px 0;
          "
        >
          <h4
            style="
              color: #111827;
              font-size: 15px;
              font-weight: 600;
              margin: 0 0 12px 0;
            "
          >
            What happens next?
          </h4>
          <div style="color: #6b7280; font-size: 13px">
            <div style="margin-bottom: 6px">
              ✓ Enter the 6-digit code on the verification page
            </div>
            <div style="margin-bottom: 6px">✓ Complete your profile setup</div>
            <div>✓ Start building your link in bio page</div>
          </div>
        </div>

        <div
          style="
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 12px;
            margin: 18px 0;
          "
        >
          <p
            style="color: #dc2626; font-size: 13px; margin: 0; font-weight: 500"
          >
            🔒 This code expires in 60 minutes for your security
          </p>
        </div>

        <p style="color: #6b7280; font-size: 14px; line-height: 1.5">
          If you didn't create an account with ConnectMe, please ignore this
          email. Your email address will not be added to our system.
        </p>

        <p
          style="
            color: #111827;
            font-size: 15px;
            font-weight: 500;
            margin-top: 25px;
          "
        >
          Best regards,<br />
          <span
            style="
              background: linear-gradient(135deg, #f97316, #fbbf24);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
            "
            >The ConnectMe Team</span
          >
        </p>
      </div>

      <div
        style="
          text-align: center;
          padding: 15px;
          color: #9ca3af;
          font-size: 11px;
        "
      >
        <p style="margin: 0 0 8px 0">
          This is an automated message, please do not reply to this email.
        </p>
        <p style="margin: 0">© 2024 ConnectMe. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("❌ Error sending verification email:", error.message);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: {
        name: "ConnectMe", // Changed from Willow
        address: process.env.GMAIL_USER,
      },
      to: email,
      subject: "Welcome to ConnectMe! 🎉", // Changed from Willow
      html: `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to ConnectMe</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
    </style>
  </head>
  <body style="margin: 0; padding: 15px; background-color: #f9fafb">
    <div
      style="
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Roboto', sans-serif;
        line-height: 1.6;
        color: #374151;
        max-width: 550px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      "
    >
      <div
        style="
          background: linear-gradient(
            135deg,
            #fbbf24 0%,
            #f97316 50%,
            #ef4444 100%
          );
          padding: 30px 20px;
          text-align: center;
          border-radius: 16px 16px 0 0;
        "
      >
        <h1
          style="
            color: white;
            margin: 0;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
          "
        >
          ConnectMe.
        </h1>
        <h2
          style="
            color: white;
            margin: 10px 0 0 0;
            font-size: 26px;
            font-weight: 600;
          "
        >
          Welcome to ConnectMe! 🎉
        </h2>
      </div>

      <div
        style="
          background-color: #ffffff;
          padding: 30px 25px;
          border-radius: 0 0 16px 16px;
        "
      >
        <div style="text-align: center; margin-bottom: 25px">
          <div
            style="
              width: 90px;
              height: 90px;
              background: linear-gradient(135deg, #fbbf24, #f97316);
              border-radius: 22px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 15px;
            "
          >
            <span style="font-size: 42px">🚀</span>
          </div>
          <h3
            style="
              color: #111827;
              font-size: 22px;
              font-weight: 700;
              margin: 0 0 8px 0;
            "
          >
            Hey ${name}!
          </h3>
          <p style="color: #6b7280; font-size: 16px; margin: 0">
            Your account is ready and you're all set to start connecting!
          </p>
        </div>

        <div
          style="
            background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            border: 2px solid #10b981;
            border-radius: 14px;
            padding: 22px;
            text-align: center;
            margin: 25px 0;
          "
        >
          <div style="font-size: 22px; margin-bottom: 8px">✅</div>
          <p
            style="color: #065f46; font-size: 15px; font-weight: 600; margin: 0"
          >
            Your email has been successfully verified!
          </p>
        </div>

        <div style="text-align: center; margin: 35px 0">
          <a
            href="https://willow.app/dashboard"
            style="
              display: inline-block;
              background: linear-gradient(135deg, #fbbf24, #f97316);
              color: white;
              padding: 14px 28px;
              border-radius: 10px;
              text-decoration: none;
              font-size: 15px;
              font-weight: 600;
              box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
            "
          >
            🚀 Get Started Now
          </a>
        </div>

        <p
          style="
            color: #111827;
            font-size: 15px;
            font-weight: 500;
            margin-top: 25px;
          "
        >
          Welcome to the family!<br />
          <span
            style="
              background: linear-gradient(135deg, #f97316, #fbbf24);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
            "
            >The ConnectMe Team</span
          >
        </p>
      </div>

      <div
        style="
          text-align: center;
          padding: 15px;
          color: #9ca3af;
          font-size: 11px;
        "
      >
        <p style="margin: 0 0 8px 0">
          You're receiving this email because you signed up for ConnectMe.
        </p>
        <p style="margin: 0">© 2024 ConnectMe. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

// Password reset email
const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: {
        name: "ConnectMe",
        address: process.env.GMAIL_USER,
      },
      to: email,
      subject: "Reset your password - ConnectMe",
      html: `
     <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password - ConnectMe</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
    </style>
  </head>
  <body style="margin: 0; padding: 15px; background-color: #f9fafb">
    <div
      style="
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Roboto', sans-serif;
        line-height: 1.6;
        color: #374151;
        max-width: 550px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      "
    >
      <div
        style="
          background: linear-gradient(
            135deg,
            #fbbf24 0%,
            #f97316 50%,
            #ef4444 100%
          );
          padding: 10px 20px;
          text-align: center;
          border-radius: 16px 16px 0 0;
        "
      >
        <h1
          style="
            color: white;
            margin: 0;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
          "
        >
          ConnectMe.
        </h1>
        <h2
          style="
            color: white;
            margin: 10px 0 0 0;
            font-size: 22px;
            font-weight: 600;
          "
        >
          Password Reset Request
        </h2>
      </div>

      <div
        style="
          background-color: #ffffff;
          padding: 30px 25px;
          border-radius: 0 0 16px 16px;
        "
      >
        <div style="text-align: center; margin-bottom: 25px">
          <div
            style="
              width: 70px;
              height: 70px;
              background: linear-gradient(135deg, #fbbf24, #f97316);
              border-radius: 18px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 15px;
            "
          >
            <span style="font-size: 32px">🔐</span>
          </div>
          <h3
            style="
              color: #111827;
              font-size: 19px;
              font-weight: 600;
              margin: 0 0 8px 0;
            "
          >
            Reset Your Password
          </h3>
          <p style="color: #6b7280; font-size: 15px; margin: 0">
            We received a password reset request for <strong>${email}</strong>
          </p>
        </div>

        <div style="text-align: center; margin: 35px 0">
          <a
            href="${resetURL}"
            style="
              display: inline-block;
              background: linear-gradient(135deg, #fbbf24, #f97316);
              color: white;
              padding: 16px 32px;
              border-radius: 10px;
              text-decoration: none;
              font-size: 16px;
              font-weight: 700;
              box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
              text-transform: uppercase;
              letter-spacing: 0.5px;
            "
          >
            🔑 Reset My Password
          </a>
        </div>

        <div
          style="
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 12px;
            margin: 18px 0;
          "
        >
          <p
            style="color: #dc2626; font-size: 13px; margin: 0; font-weight: 500"
          >
            ⏰ This reset link expires in 1 hour for your security
          </p>
        </div>

        <p
          style="
            color: #111827;
            font-size: 15px;
            font-weight: 500;
            margin-top: 25px;
          "
        >
          Stay secure,<br />
          <span
            style="
              background: linear-gradient(135deg, #f97316, #fbbf24);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
            "
            >The ConnectMe Security Team</span
          >
        </p>
      </div>

      <div
        style="
          text-align: center;
          padding: 15px;
          color: #9ca3af;
          font-size: 11px;
        "
      >
        <p style="margin: 0 0 8px 0">
          This is an automated security email from ConnectMe.
        </p>
        <p style="margin: 0">© 2024 ConnectMe. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("❌ Error sending password reset email:", error.message);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
