const crypto = require("crypto");
const config = require("../configs/keys.config.js");

module.exports =
{
	encrypt: (str) =>
	{
		const cipher = crypto.createCipheriv("aes-256-cbc", config.jwt.secrect, config.jwt.key);
			  cipher.update(str, "utf8", "base64");

		return cipher.final("base64");

	},

	decrypt: (str) =>
	{
		const decipher = crypto.createDecipheriv("aes-256-cbc", config.jwt.secrect, config.jwt.key);
			  decipher.update(str, "base64", "utf8");

		return decipher.final("utf8");

	}

};