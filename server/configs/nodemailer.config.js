const path 		 = require("path");
const nodemailer = require("nodemailer");
const Email 	 = require("email-templates");

const dotenv 	 = require("dotenv");
	  dotenv.config();

module.exports = SendMail = new Email
({
	message:
	{
		from: process.env.EMAIL_FROM

	},

	views:
	{
		root: path.resolve(__dirname, "../views/emails")

	},

	transport: nodemailer.createTransport
	({
		host  : process.env.EMAIL_HOST,
		port  : process.env.EMAIL_PORT,
		secure: process.env.EMAIL_SECURE,

		auth:
		{
			user: process.env.EMAIL_AUTH_USER,
			pass: process.env.EMAIL_AUTH_PASSWORD

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