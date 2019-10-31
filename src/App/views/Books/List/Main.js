import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import shortid from "shortid";

import CircularProgressLoader from "../../../../Shared/views/Components/CircularProgressLoader";
import Book from "../../Components/Book";
import SnackBar from "../../../../Shared/views/Components/SnackBar";

import BadRequest from "../../../../Shared/views/400.js";

import { List } from "../../../../Shared/actions/Books";

function Main({ tab, category })
{
	const isFirstRun =
		useRef(true);

	const [skip, setSkip] =
		useState(0);

	const [isLoading, setIsLoading] =
		useState(true);

	const [isLoadingMore, setIsLoadingMore] =
		useState(false);

	const [internalError, setInternalError] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const books =
		useSelector(state => state.Books.data);

	const user =
		useSelector(state => state.Users.data);

	const handleList = useCallback((delayed = true, skip) =>
	{
		if(skip)
		{
			setIsLoadingMore(true);

		}
		else if(delayed)
		{
			setIsLoading(true);
			setInternalError(false);

		}

		setTimeout(() =>
		{
			dispatch(List(tab, category, skip)).then(data =>
			{
				if(data)
				{
					setIsLoading(false);
					setIsLoadingMore(false);

					if(data.error && data.error.internal)
					{
						setSnackbar({
							index: shortid.generate(), type: "danger", message: data.error.internal

						});

						setInternalError(true);

					}
					else
					{
						setSkip(
							skip => skip + data.books.length

						);

					}

				}
				else
					setSkip(0);

			}).catch(error =>
			{
				setSnackbar({
					index: shortid.generate(), type: "danger", message: "An internal error occurred."

				});

				setInternalError(true);
				setIsLoading(false);

			});

		}, delayed ? 500 : 0);

	}, [dispatch, tab, category]);

	const handleScroll = useCallback(() =>
	{
		if(books && books.books)
		{
			if(books.books.length < books.total && !isLoadingMore)
			{
				if(document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 100)
					handleList(true, skip);

			}

		}

	}, [handleList, books, skip, isLoadingMore]);

	useEffect(() =>
	{
		if(tab === "browse" || tab === "favorites")
		{
			setSkip(0);

			handleList(
				!isFirstRun.current

			);

		}

	}, [handleList, tab]);

	useEffect(() =>
	{
		window.addEventListener(
			"scroll", handleScroll);

		return () => 
		{
			window.removeEventListener(
				"scroll", handleScroll);

		};

	}, [handleScroll]);

	useEffect(() =>
	{
		isFirstRun.current = false;

		return () => 
		{
			isFirstRun.current = true;

		};

	}, []);

	return (
		<Fragment>
			{
				isLoading
					?
						<CircularProgressLoader
							isCovered = { true }

						/>

					:
						<main>
							<section id="list">
								{
									internalError
										?
											<BadRequest
												isHome  = { true }
												onClick = { () => handleList(true) }

											/>

										:
											books.books && books.books.length
												?
													<Fragment>
														<div className="columns is-multiline">
															{
																books.books.map((item) =>
																{
																	return (
																		<div
																			key 	  = { shortid.generate() }
																			className = "column is-narrow"

																		>
																			<Link
																				to 		  = { "/book/" + item.id }
																				className = "book-link"

																			>
																				<Book
																					title 	    = { item.title }
																					subtitle    = { item.subtitle }
																					thumbnail   = { item.thumbnail }
																					reviews	    = { item.reviews }
																					rating	    = 
																					{{
																						stars: item.rating.stars, total: item.rating.total, users: item.rating.users }}

																				/>
																			</Link>
																		</div>

																	);

																})
																
															}
														</div>
														{
															books.books.length < books.total
																?
																	<CircularProgressLoader
																		isRelative = { true }

																	/>

																:
																	""

														}
													</Fragment>

												:
													<div className="no-records-found">
														<h1>No records found!</h1>
														{
															tab === "favorites" && !user
																?
																	<p>Sign in app to see your favorites</p>
																:
																	""

														}
													</div>

								}
							</section>
						</main>

			}
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</Fragment>

	);

}

export default Main;