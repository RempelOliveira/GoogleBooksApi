module.exports =
{
	db : process.env.DB || "mongodb://localhost:27017/google-books-api",
	jwt:
	{
		key	   : process.env.jwtKey || "@jwtKey",
		secrect: process.env.jwtSecret || "@jwtSecret"

	}

};