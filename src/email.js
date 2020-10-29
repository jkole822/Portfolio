const AWS = require("aws-sdk");

AWS.config.update({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_SECRET,
	region: process.env.AWS_REGION,
});

const email = (email, name, message) => {
	const ses = new AWS.SES({ apiVersion: "2010-12-01" });
	const params = {
		Destination: {
			ToAddresses: ["jkole822@gmail.com"], // Email address/addresses that you want to send your email
		},
		ConfigurationSetName: "Portfolio",
		Message: {
			Body: {
				Html: {
					// HTML Format of the email
					Charset: "UTF-8",
					Data: `<html><body><h1>Message from ${name}</h1><p>${message}</p> <p>Contact: ${email}</p></body></html>`,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: "Message from Portfolio Contact Form",
			},
		},
		Source: "jkole822@gmail.com",
	};

	const sendEmail = ses.sendEmail(params).promise();

	sendEmail
		.then(data => {
			console.log("email submitted to SES", data);
		})
		.catch(error => {
			console.log(error);
		});
};

module.exports = email;
