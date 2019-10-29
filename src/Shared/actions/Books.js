import axios from "axios";

import { UPDATE_USER, SIGNOUT_USER } from "./Users";
import { setAuthUser, getAuthUser } from "../utils/UserAuthentication.js";

const api = "http://" + window.location.hostname + ":3002/api/books";

export const LIST   = "LIST";
export const READ   = "READ";
export const UPDATE = "UPDATE";

let axiosCancel;

export function List(tab, category, skip)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		const params =
		{
			tab		: tab,
			category: category,
			skip	: skip

		};

		return axios.get(api, { params: params, headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token })

			.then(response =>
			{
				const data =
					response.data;

				if(data.error === "authorization")
				{
					setAuthUser();

					dispatch({
						type: SIGNOUT_USER, payload: null

					});

				}

				if(!skip)
					data.clean = true;

				dispatch({
					type: LIST, payload: data.books ? data : []

				});

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
				{
					dispatch({
						type: LIST, payload: []

					});

					return error.response.data;

				}

			});

	};

};

export function Read(id)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.get(api + "/" + id, { headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token })

			.then(response =>
			{
				const data =
					response.data;

				if(data.error === "authorization")
				{
					setAuthUser();

					dispatch({
						type: SIGNOUT_USER, payload: null

					});

				}

				dispatch({
					type: READ, payload: data.book

				});

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
				{
					dispatch({
						type: READ, payload: null

					});

					return error.response.data;

				}

			});

	};

};

export function Update(book, action)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.patch(api + "/" + action, { id: book.id }, { headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token})

			.then(response =>
			{
				const data =
					response.data;

				if(data.error === "authorization")
				{
					setAuthUser();

					dispatch({
						type: SIGNOUT_USER, payload: null

					});

				}
				else
				{
					dispatch({
						type: UPDATE, payload: data.book

					});

					dispatch({
						type: UPDATE_USER, payload: setAuthUser(data.user.token)

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