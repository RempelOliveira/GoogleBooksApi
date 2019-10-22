import jwt from "jsonwebtoken";
import cryptr from "cryptr";

const TOKEN_KEY    = "@jwtKey";
const TOKEN_SECRET = "@jwtSecret";

function isAuth()
{
	return sessionStorage.getItem(TOKEN_KEY) !== null;

};

function isAdmin()
{
	return isAuth() && getAuthUser().type === "admin";

};

function setAuthUser(token)
{
	if(token)
	{
		try
		{
			const { user } =
				jwt.verify(token, TOKEN_SECRET);

			sessionStorage.setItem(TOKEN_KEY, token);

			return { id: user.id, type: user.type, name: user.name, email: user.email, score: user.score };

		}
		catch (err){ return; }

	}
	else
		sessionStorage.removeItem(TOKEN_KEY);

	return;

};

function getAuthUser(getToken = false)
{
	const token = sessionStorage.getItem(TOKEN_KEY);

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
			catch (err){ return; }

		}
		else
			return "Bearer " + token;

	}

	return "";

};

function setAuthPassword(password)
{
	return new cryptr(TOKEN_SECRET)
		.encrypt(password);

};

export { isAuth, isAdmin, setAuthUser, getAuthUser, setAuthPassword };