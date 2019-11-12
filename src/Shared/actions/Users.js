import axios from "axios";

import { setAuthUser, getAuthUser, setAuthPassword } from "../utils/UserAuthentication.js";

const api = process.env.REACT_APP_API + "/api/users";

export const SIGNUP_USER  	  		 = "SIGNUP_USER";
export const SIGNIN_USER  	  		 = "SIGNIN_USER";
export const SIGNOUT_USER 	  		 = "SIGNOUT_USER";
export const UPDATE_USER  	  		 = "UPDATE_USER";
export const RECOVER_PASSWORD 		 = "RECOVER_PASSWORD";
export const RECOVER_PASSWORD_UPDATE = "RECOVER_PASSWORD_UPDATE";

let axiosCancel;

export function SignUp(user)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.post(api + "/sign-up", { ...user, password: setAuthPassword(user.password) }, { cancelToken: axiosCancel.token })

			.then(response =>
			{
				let data = response.data;

				if(!data.error)
				{
					data = setAuthUser(data.token, true);

					dispatch({
						type: SIGNUP_USER, payload: data

					});

				}

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
					return error.response.data;

			});

	};

};

export function SignIn(user)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.post(api + "/sign-in", { ...user, password: setAuthPassword(user.password) }, { cancelToken: axiosCancel.token })

			.then(response =>
			{
				let data = response.data;

				if(!data.error)
				{
					data = setAuthUser(data.token, user.remember);

					dispatch({
						type: SIGNIN_USER, payload: data

					});

				}

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
					return error.response.data;

			});

	};

};

export function SignOut()
{
	return dispatch =>
	{
		return new Promise(resolve =>
		{
			setTimeout(() =>
			{
				setAuthUser();

				dispatch({
					type: SIGNOUT_USER, payload: null

				});

				resolve();

			}, 1000);

		});

	};

};

export function Update(user)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		const data 	   = {};
		const authUser = getAuthUser();

		Object.keys(user).map(i =>
		{
			if(user[i] !== null && user[i] !== authUser[i])
				data[i] = i === "password" ? setAuthPassword(user[i]) : user[i];

			return user;

		});

		if(Object.keys(data).length)
		{
			return axios.patch(api + "/update", { ...data }, { headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token})

				.then(response =>
				{
					let data = response.data;

					if(!data.error)
					{
						data = setAuthUser(data.token);

						dispatch({
							type: UPDATE_USER, payload: data

						});

					}

					return data;

				})
				.catch(error =>
				{
					if(!axios.isCancel(error))
						return error.response.data;

				});

		}
		else
			return new Promise(resolve => resolve(user));

	};

};

export function RecoverPassword(user)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.post(api + "/recover-password", { ...user }, { headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token})

			.then(response =>
			{
				const data =
					response.data;

				if(!data.error)
				{
					dispatch({
						type: RECOVER_PASSWORD, payload: data

					});

				}

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
					return error.response.data;

			});

	};

};

export function RecoverPasswordUpdate(user)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.patch(api + "/recover-password/update", { ...user, code: setAuthPassword(user.code.toUpperCase()), password: setAuthPassword(user.password) }, { cancelToken: axiosCancel.token })

			.then(response =>
			{
				let data = response.data;

				if(!data.error)
				{
					data = setAuthUser(data.token);

					dispatch({
						type: RECOVER_PASSWORD_UPDATE, payload: data

					});

				}

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
					return error.response.data;

			});

	};

};