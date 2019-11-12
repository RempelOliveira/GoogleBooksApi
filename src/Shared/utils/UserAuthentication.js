import jwt from "jsonwebtoken";
import cryptr from "cryptr";

const TOKEN_KEY    = "@jwtKey";
const TOKEN_SECRET = "@jwtSecret";

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
	return new cryptr(TOKEN_SECRET)
		.encrypt(password);

};

export { isAuth, isAdmin, setAuthUser, getAuthUser, setAuthPassword };