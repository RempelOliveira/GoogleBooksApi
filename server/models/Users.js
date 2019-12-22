const crypto   = require("../utils/crypto.js");
const config   = require("../configs/keys.config.js");
const mongoose = require("mongoose");

const Users = mongoose.model("Users", new mongoose.Schema
({
	name:
	{
		type	: String,
		required: [ true, "Required" ],
		validate:
		[
			{
				message  : "Name and surname must be entered",
				validator: value =>
				{
					return !(value.trim().indexOf(" ") === -1);

				}

			}

		]

	},

	email:
	{
		type	: String,
		required: [ true, "Required" ],
		validate:
		[
			{
				message  : "Invalid email address",
				validator: value =>
				{
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

				}

			},

			{
				message  : "This email address is already in use",
				validator: async value =>
				{
					return !(await Users.findOne({ email: value.trim() }));

				}

			}

		]

	},

	password:
	{
		current:
		{
			type	: String,
			required: [ true, "Required" ],
			validate:
			[
				{
					message  : "Enter at least 6 characters",
					validator: value =>
					{
						return !(crypto.decrypt(value).trim().length < 6);

					}

				},

				{
					message  : "Enter a maximum of 12 characters",
					validator: value =>
					{
						return !(crypto.decrypt(value).trim().length > 12);

					}

				}

			]

		},

		recover:
		{
			code:
			{
				type   : String,
				default: null

			},

			expiration:
			{
				type   : Date,
				default: null

			}

		}

	},

	score:
	{
		likes:
		{
			type   : Number,
			default: 0

		},

		favorites:
		{
			type   : Number,
			default: 0

		},

		reviews:
		{
			type   : Number,
			default: 0

		}

	},

	active:
	{
		type   : Boolean,
		default: true

	},

	type:
	{
		type   : String,
		enum   : [ "user", "admin" ],
		default: "user"

	},

	datetime:
	{
		type   : Date,
		default: Date.now

	}	

}));

module.exports = Users;