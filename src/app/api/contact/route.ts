import nodemailer from 'nodemailer';

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'Hello from Next.js!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Please provide name, email, and message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user:"nikhil.animex@gmail.com",
        pass:"svne ygfx ogbx kloy",

        // user: process.env.EMAIL_USER, 
        // pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: email,
      to: 'nikhil.animex@gmail.com', 
      subject: `Contact form submission from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p style="font-size: 16px; color: #555;">
            <strong>Name:</strong> ${name}
          </p>
          <p style="font-size: 16px; color: #555;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="font-size: 16px; color: #555;">
            <strong>Message:</strong>
          </p>
          <p style="font-size: 16px; color: #333; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
            ${message}
          </p>
          <br>
          <p style="font-size: 14px; color: #777;">
            This message was sent from your contact form.
          </p>
          <p style="text-align: center;">© 2023 IndiaJapanGuide.</p>
          <br>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error sending email:', errorMessage);
    return new Response(JSON.stringify({ error: 'Error sending email', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
