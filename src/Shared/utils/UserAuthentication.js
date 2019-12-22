import jwt from "jsonwebtoken";
import crypto from "crypto";

const TOKEN_KEY    = process.env.REACT_APP_JWT_KEY;
const TOKEN_SECRET = process.env.REACT_APP_JWT_SECRECT;

function isAuth()
{
	return (localStorage.getItem(TOKEN_KEY + "_remember") === "true"
		? localStorage.getItem(TOKEN_KEY) : sessionStorage.getItem(TOKEN_KEY)) !== null;

};

function isAdmin()
{
	return isAuth() && getAuthUser().type === "admin";

};

function setAuthUser(token, remember)
{
	remember =
		remember === true || localStorage.getItem(TOKEN_KEY + "_remember") === "true";

	if(token)
	{
		try
		{
			const { user } =
				jwt.verify(token, TOKEN_SECRET);

			if(remember === true)
			{
				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(TOKEN_KEY + "_remember", "true");

			}
			else
				sessionStorage.setItem(TOKEN_KEY, token);

			return { id: user.id, type: user.type, name: user.name, email: user.email, score: user.score };

		}
		catch (err){ return; }

	}
	else
	{
		if(remember)
		{
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(TOKEN_KEY + "_remember");

		}
		else
			sessionStorage.removeItem(TOKEN_KEY);

	}

	return;

};

function getAuthUser(getToken = false)
{
	const token =
		localStorage.getItem(TOKEN_KEY + "_remember") === "true" ? localStorage.getItem(TOKEN_KEY) : sessionStorage.getItem(TOKEN_KEY)

	if(token)
	{
		if(getToken === false)
		{
			try
			{
				const { user } =
					jwt.verify(token, TOKEN_SECRET);

				return { id: user.id, type: user.type, name: user.name, email: user.email, score: user.score };

			}
			catch (err)
			{
				return setAuthUser();

			}

		}
		else
			return "Bearer " + token;

	}

	return "";

};

function setAuthPassword(password)
{
	const cipher = crypto.createCipheriv("aes-256-cbc", TOKEN_SECRET, TOKEN_KEY);
		  cipher.update(password, "utf8", "base64");

	return cipher.final("base64");

};

export { isAuth, isAdmin, setAuthUser, getAuthUser, setAuthPassword };