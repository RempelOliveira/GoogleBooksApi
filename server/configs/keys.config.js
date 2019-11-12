const dotenv = require("dotenv");
	  dotenv.config();

module.exports =
{
	db : process.env.MONGODB_URI,
	jwt:
	{
		key	   : process.env.JWT_KEY,
		secrect: process.env.JWT_SECRECT

	}

};