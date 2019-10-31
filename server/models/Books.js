const mongoose = require("mongoose");

const Users =
	require("./Users");

const Books = mongoose.model("Books", new mongoose.Schema
({
	id:
	{
		type    : String,
		unique	: true,
		required: [ true, "Required" ]

	},

	title:
	{
		type	: String,
		required: [ true, "Required" ]

	},

	subtitle:
	{
		type: String

	},

	thumbnail:
	{
		type	: String,
		required: [ true, "Required" ]

	},

	description:
	{
		type	: String,
		required: [ true, "Required" ]

	},

	category:
	{
		type	 : String,
		required : [ true, "Required" ],
		lowercase: true

	},

	url:
	{
		type	: String,
		required: [ true, "Required" ]

	},

	price:
	{
		type	: Number,
		required: [ true, "Required" ]

	},

	likes:
	[
		{
			ref : Users,
			type: mongoose.Schema.Types.ObjectId

		}

	],

	favorites:
	[
		{
			ref : Users,
			type: mongoose.Schema.Types.ObjectId

		}

	],

	reviews:
	[
		{
			user:
			{
				ref		: Users,
				type	: mongoose.Schema.Types.ObjectId,
				required: [ true, "Required" ]

			},

			rating:
			{
				type   : Number,
				default: 0

			},

			review:
			{
				type	: String,
				required: [ true, "Required" ]

			},

			datetime:
			{
				type   : Date,
				default: Date.now

			}

		}

	],

	rating:
	{
		stars:
		{
			type   : Number,
			default: 0

		},

		total:
		{
			type   : Number,
			default: 0

		},

		users:
		{
			type   : Number,
			default: 0

		}

	},

	datetime:
	{
		type   : Date,
		default: Date.now

	}

}));

module.exports = Books;