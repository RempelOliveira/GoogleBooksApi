module.exports =
{
	db : process.env.MONGODB_URI || "mongodb://localhost:27017/google-books-api",
	jwt:
	{
		key	   : process.env.JwtKey || "@jwtKey",
		secrect: process.env.JwtSecret || "@jwtSecret"

	}

};