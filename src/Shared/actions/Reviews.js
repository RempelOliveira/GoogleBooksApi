import axios from "axios";

import { UPDATE_USER, SIGNOUT_USER } from "./Users";
import { setAuthUser, getAuthUser } from "../utils/UserAuthentication.js";

const api = process.env.REACT_APP_API_URI + "/api/books";

export const LIST_REVIEWS  = "LIST_REVIEWS";
export const CREATE_REVIEW = "CREATE_REVIEW";

let axiosCancel;

export function List(book, all)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		const params =
		{
			all: all

		};

		return axios.get(api + "/" + book + "/reviews", { params: params, headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token})

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
					type: LIST_REVIEWS, payload: data

				});

				return data;

			})
			.catch(error =>
			{
				if(!axios.isCancel(error))
					return error.response.data;

			});

	};

};

export function Create(book, all, review)
{
	if(axiosCancel)
		axiosCancel.cancel();

	axiosCancel = axios.CancelToken.source();

	return dispatch =>
	{
		return axios.post(api + "/" + book + "/reviews" + (all ? "?all=true" : ""), { ...review }, { headers: { Authorization: getAuthUser(true) }, cancelToken: axiosCancel.token})

			.then(response =>
			{
				const data =
					response.data;

				if(data.error)
				{
					if(data.error === "authorization")
					{
						setAuthUser();

						dispatch({
							type: SIGNOUT_USER, payload: null

						});

					}

				}
				else
				{
					dispatch({
						type: CREATE_REVIEW, payload: data

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