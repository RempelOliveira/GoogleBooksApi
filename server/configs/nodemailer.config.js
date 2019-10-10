const path 		 = require("path");
const nodemailer = require("nodemailer");
const Email 	 = require("email-templates");

module.exports = SendMail = new Email
({
	message:
	{
		from: "misty.macgyver@ethereal.email"

	},

	views:
	{
		root: path.resolve(__dirname, "../views/emails")

	},

	transport: nodemailer.createTransport
	({
		host  : "smtp.ethereal.email",
		port  : 587,
		secure: false,

		auth  :
		{
			user: "misty.macgyver@ethereal.email",
			pass: "qCvpGQuJ5UbS4xTpYE"

		},

		tls:
		{
			rejectUnauthorized: false

		}

	}),

	send   : true,
	preview: false

});

/* 
 * from Gmail
 *
	module.exports = SendMail = new Email
	({
		message:
		{
			from: "my@gmail.com"

		},

		views:
		{
			root: path.resolve(__dirname, "../views/emails")

		},

		transport: nodemailer.createTransport
		({
			host  : "smtp.gmail.com",
			port  : 465,
			secure: true,

			auth  :
			{
				user: "my@gmail.com",
				pass: "pass"

			},

			tls:
			{
				rejectUnauthorized: false

			}

		}),

		send   : true,
		preview: false

	});
*/