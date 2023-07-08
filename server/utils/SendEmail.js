const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			requireTLS:true,
			auth: {
				user: process.env.user,
				pass: process.env.password
			}
		});

		await transporter.sendMail({
			from: process.env.user,
			to: email,
			subject:subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
