import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import shortid from "shortid";

import Main from "./Reviews/Main";
import Header from "./Reviews/Header";

import SnackBar from "../Components/SnackBar";
import Head from "../Components/Head";

import { List } from "../../actions/Reviews";

function Reviews(props)
{
	const [isLoading, setIsLoading] =
		useState(true);

	const [isLoadingAll, setIsLoadingAll] =
		useState(false);

	const [internalError, setInternalError] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const book =
		useSelector(state => state.Reviews.data.book);

	const reviews =
		useSelector(state => state.Reviews.data.reviews);

	const handleList = useCallback((delayed, all) =>
	{
		if(all)
		{
			setIsLoadingAll(true);

		}
		else if(delayed)
		{
			setIsLoading(true);
			setInternalError(false);

		}

		setTimeout(() =>
		{
			dispatch(List(props.match.params.id, all)).then(data =>
			{
				if(data)
				{
					if(data.error && data.error.internal)
					{
						setSnackbar({
							index: shortid.generate(), type: "danger", message: data.error.internal

						});

						setInternalError(true);

					}

					setIsLoading(false);
					setIsLoadingAll(false);

				}

			}).catch(error =>
			{
				setSnackbar({
					index: shortid.generate(), type: "danger", message: "An internal error occurred."

				});

				if(!all)
				{
					setIsLoading(false);
					setInternalError(true);

				}

				setIsLoadingAll(false);

			});

		}, delayed ? 500 : 0);

		

	}, [dispatch, props.match.params.id]);

	useEffect(() =>
	{
		handleList();

	}, [handleList]);

	return (
		<Fragment>
			<Head
				title = "Google Books Api - Book Reviews"

			/>
			<Header
				book = { book }

			/>
			<Main
				book 		  = { book }
				reviews 	  = { reviews }
				isLoading	  = { isLoading }
				isLoadingAll  = { isLoadingAll }
				internalError = { internalError }
				onReload	  = { () => handleList(true) }
				setSnackbar	  = { setSnackbar }
				onLoadAll	  = { handleList }

			/>
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</Fragment>

	);

}

export default Reviews;