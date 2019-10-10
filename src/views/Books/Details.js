import React, { Fragment, useState, useEffect, useCallback }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import shortid from "shortid";

import { Read } from "../../actions/Books";
import CircularProgressLoader from "../Components/CircularProgressLoader";

import Main from "./Details/Main";
import Header from "./Details/Header";
import Footer from "./Details/Footer";

import Share from "./Details/Share";

import PageNotFound from "../404.js";
import BadRequest from "../400.js";

import SnackBar from "../Components/SnackBar";
import Head from "../Components/Head";

function Details(props)
{
	const [share, setShare] =
		useState(false);

	const [isLoading, setIsLoading] =
		useState(true);

	const [internalError, setInternalError] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const book =
		useSelector(state => state.Books.data);

	const handleToggleShare = () =>
	{
		setShare(!share);

	}

	const handleRead = useCallback(delayed =>
	{
		setIsLoading(true);

		if(delayed)
			setInternalError(false);

		setTimeout(() =>
		{
			dispatch(Read(props.match.params.id)).then(data =>
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

				}

			}).catch(error =>
			{
				setSnackbar({
					index: shortid.generate(), type: "danger", message: "An internal error occurred."

				});

				setInternalError(true);
				setIsLoading(false);

			});

		}, delayed ? 500 : 0);

	}, [dispatch, props.match.params.id]);

	useEffect(() =>
	{
		handleRead();

	}, [handleRead]);

	return (
		<Fragment>
			<Head
				name 		= "Google Books Api"
				title 	    = "Google Books Api - Book Details"
				description = { "Google Books Api - " + (book ? book.title : "")}
				image		= { window.location.origin + "/images/1024x483.png" }

			/>
			<Header
				book = { book }

			/>
			{
				internalError
					?
						<BadRequest
							onClick = { () => handleRead(true) }

						/>

					:
						isLoading
							?
								<CircularProgressLoader />

							:
								!book.id
									?
										<PageNotFound />

									:
										<Fragment>
											<Main
												book 		 = { book }
												onClickShare = { handleToggleShare }

											/>
											<Share
												book 		 = { book }
												opened    	 = { share }
												onClickShare = { handleToggleShare }

											/>
											<Footer
												url	  = { book.url }
												price = { book.price }

											/>
										</Fragment>

			}
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</Fragment>

	);

}

export default withRouter(Details);