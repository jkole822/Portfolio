const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (email, name, message) => {
	sgMail.send({
		to: "jkole822@gmail.com",
		from: "jkole822@gmail.com",
		subject: "Portfolio Contact Request",
		text: `${message} \n \n From: ${name} \n Email: ${email}`,
	});
};

module.exports = sendEmail;
