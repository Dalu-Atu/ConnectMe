const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #015979, #015979); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #015979;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 60 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Copywrite Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        color: #333;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(to right, #015979, #0288d1);
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        color: white;
        font-size: 24px;
        margin: 0;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }
      .success-icon {
        font-size: 40px;
        background-color: #015979;
        color: white;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto;
        text-align: center;
      }
      .footer {
        text-align: center;
        margin-top: 40px;
        color: #888;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset Successful</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>
          We're writing to confirm that your password has been successfully
          reset.
        </p>
        <div class="success-icon">✓</div>
        <p>
          If you did not initiate this password reset, please contact our
          support team immediately.
        </p>
        <p>For security reasons, we recommend that you:</p>
        <ul>
          <li>Use a strong, unique password</li>
          <li>Enable two-factor authentication</li>
          <li>Avoid using the same password across multiple sites</li>
        </ul>
        <p>Thank you for helping us keep your account secure.</p>
        <p>Best regards,<br />Copywrite Team</p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  </body>
</html>


`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        color: #333;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(to right, #015979, #1b9e99);
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        color: white;
        font-size: 24px;
        margin: 0;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }
      .cta-button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #015979;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
        margin: 30px 0;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #0288d1;
      }
      .footer {
        text-align: center;
        margin-top: 40px;
        color: #888;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Password Reset</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>
          We received a request to reset your password. If you didn't make this
          request, please ignore this email.
        </p>
        <p>To reset your password, click the button below:</p>
        <div style="text-align: center; margin: 30px 0">
          <a href="{resetURL}" class="cta-button">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>Best regards,<br />Copywrite Team</p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  </body>
</html>

`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
};
