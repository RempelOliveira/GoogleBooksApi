const jwt 	 = require("jsonwebtoken");
const cryptr = require("cryptr");
const config = require("../configs/keys.config.js");

const Crypt =
	new cryptr(config.jwt.secrect);

const Users =
	require("../models/Users");

const SendMail =
	require("../configs/nodemailer.config.js");

module.exports =
{
	SignUp: (req, res) =>
	{
		const data =
			req.body;

		let dbUser = new Users
		({
			name	: data.name,
			email	: data.email,
			password: Object.assign({}, this.password,
			{
				current: data.password
				
			})

		});

		dbUser.save()

			.then(user =>
			{
				let payload =
				{
					id	 : user._id,
					type : user.type,
					name : user.name,
					email: user.email,
					score: user.score

				};

				SendMail.send
				({
					template: "SignUp", message: { to: user.email, subject: "Google Books Api - Sign Up" }, locals: { name: user.name, link: "http://localhost:3001/#browse" }});

				res.status(200).json({ token: jwt.sign({ iss: "localhost", aud: "localhost", sub: user._id, user: payload }, config.jwt.secrect, { expiresIn: "100m" }) });

			})
			.catch(error =>
			{
				try
				{
					let errors = {};

					Object.values(error.errors).map(item =>
					{
						errors[item.properties.path == "password.current" ? "password" : item.properties.path] =
							item.properties.message;

					});

					res.status(200).json({ error: errors });

				}
				catch(error)
				{
					res.status(400).json({ error: { internal: "An internal error occurred." }});

				}

			});

	},

	SignIn: (req, res) =>
	{
		const data =
			req.body;

		Users.findOne({ email: data.email })

			.then(user =>
			{
				if(user && Crypt.decrypt(data.password) === Crypt.decrypt(user.password.current))
				{
					let payload =
					{
						id	 : user._id,
						type : user.type,
						name : user.name,
						email: user.email,
						score: user.score

					};

					res.status(200).json({ token: jwt.sign({ iss: "localhost", aud: "localhost", sub: user._id, user: payload }, config.jwt.secrect, { expiresIn: "100m" }) });

				}
				else
					res.status(200).json({ error: { internal: "Incorrect email or password."} });

			})
			.catch(error =>
			{
				res.status(400).json({ error: { internal: "An internal error occurred." }});

			});

	},

	Update: (req, res) =>
	{
		const data =
			req.body;

		jwt.verify(req.headers.authorization.replace("Bearer ", ""), config.jwt.secrect, (error, payload) =>
		{
			if(payload)
			{
				if(data.password)
				{
					let dbUser = new Users
					({
						password: Object.assign({}, this.password,
						{
							current: data.password
							
						})

					});

					data.password = dbUser.password;

				}

				Users.findByIdAndUpdate(payload.user.id, { ...data }, { new: true, runValidators: true })

					.then(user =>
					{
						let payload =
						{
							id	 : user._id,
							type : user.type,
							name : user.name,
							email: user.email,
							score: user.score

						};

						res.status(200).json({ token: jwt.sign({ iss: "localhost", aud: "localhost", sub: user._id, user: payload }, config.jwt.secrect, { expiresIn: "100m" }) });

					})
					.catch(error =>
					{
						try
						{
							let errors = {};

							Object.values(error.errors).map(item =>
							{
								errors[item.properties.path == "password.current" ? "password" : item.properties.path] =
									item.properties.message;

							});

							res.status(200).json({ error: errors });

						}
						catch(error)
						{
							res.status(400).json({ error: { internal: "An internal error occurred." }});

						}

					});

			}
			else
				res.status(400).json({ error: { internal: "An internal error occurred." }});

		});

	},

	RecoverPassword: (req, res) =>
	{
		const data =
			req.body;

		Users.findOne({ email: data.email })

			.then(user =>
			{
				if(user)
				{
					let code = Math.random().toString(36).substr(2, 4).toUpperCase();

					let expiration = new Date();
						expiration.setDate(expiration.getDate() + 1);

					let dbUser = new Users
					({
						password: Object.assign({}, this.password,
						{
							current: user.password.current,
							recover:
							{
								code	  : code,
								expiration: expiration

							}

						})

					});

					Users.findByIdAndUpdate(user._id, { password: dbUser.password }, { new: true, runValidators: true })

						.then(user =>
						{
							SendMail.send
							({
								template: "RecoverPassword", message: { to: user.email, subject: "Google Books Api - Recover Password" }, locals: { name: user.name, code: code, link: "http://localhost:3001/recover-password/" + Crypt.encrypt(user.email) }});

							res.status(200).json({ success: true });

						})
						.catch(error =>
						{
							res.status(400).json({ error: { internal: "An internal error occurred." }});

						});

				}

			})
			.catch(error =>
			{
				res.status(400).json({ error: { internal: "An internal error occurred." }});

			});

	},

	RecoverPasswordUpdate: (req, res) =>
	{
		const data =
			req.body;

		let dbUser = new Users
		({
			password: Object.assign({}, this.password,
			{
				current: data.password

			})

		});

		Users.findOne({ email: Crypt.decrypt(data.email), "password.recover.code": Crypt.decrypt(data.code) })

			.then(user =>
			{
				if(user)
				{
					if(new Date(user.password.recover.expiration) > new Date())
					{
						Users.findByIdAndUpdate(user._id, { password: dbUser.password }, { new: true, runValidators: true })

							.then(user =>
							{
								let payload =
								{
									id	 : user._id,
									type : user.type,
									name : user.name,
									email: user.email,
									score: user.score

								};

								res.status(200).json({ token: jwt.sign({ iss: "localhost", aud: "localhost", sub: user._id, user: payload }, config.jwt.secrect, { expiresIn: "100m" }) });

							})
							.catch(error =>
							{
								try
								{
									let errors = {};

									Object.values(error.errors).map(item =>
									{
										errors[item.properties.path == "password.current" ? "password" : item.properties.path] =
											item.properties.message;

									});

									res.status(200).json({ error: errors });

								}
								catch(error)
								{
									res.status(400).json({ error: { internal: "An internal error occurred." }});

								}

							});

					}
					else
						res.status(200).json({ error: { internal: "Incorrect or expired code."} });

				}
				else
					res.status(200).json({ error: { internal: "Incorrect code or user not found."} });

			})
			.catch(error =>
			{
				res.status(400).json({ error: { internal: "An internal error occurred." }});

			});

	}

};