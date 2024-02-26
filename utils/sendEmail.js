import nodemailer from "nodemailer";

const sendEmail = async (email, subject, url, next) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.PASS
            }
        });
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject,
            html:`<p>Please click the below link to verify your email</p><br>${url}`
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default sendEmail;
