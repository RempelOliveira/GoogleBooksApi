import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import shortid from "shortid";

import CircularProgressLoader from "../../../../Shared/views/Components/CircularProgressLoader";
import SnackBar from "../../../../Shared/views/Components/SnackBar";

import Book from "../../Components/Book";
import Metric from "../../Components/Metric";
import BadRequest from "../../../../Shared/views/400.js";

import { List } from "../../../../Shared/actions/Books";

function Main({ category, onChangeModal })
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

	const handleList = useCallback((delayed = true, sync, iskip) =>
	{
		if(iskip)
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
			dispatch(List("browse", category, iskip, sync, true)).then(data =>
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
							skip => sync ? data.books.length : skip + data.books.length

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

	}, [dispatch, category]);

	const handleScroll = useCallback(() =>
	{
		if(books)
		{
			if(books.books.length < books.total && !isLoadingMore)
			{
				if(document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 100)
					handleList(true, false, skip);

			}

		}

	}, [handleList, books, skip, isLoadingMore]);

	useEffect(() =>
	{
		setSkip(0);

		handleList(
			!isFirstRun.current

		);

	}, [handleList]);

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
						<main className="control-panel">
							<section id="control-panel-list">
								{
									internalError
										?
											<BadRequest
												isHome  = { true }
												onClick = { () => handleList(true) }

											/>

										:
											<Fragment>
												<div className="metrics">
													<div className="columns is-multiline">
														<div className="column is-narrow">
															<Metric
																name  = { books.total === 1 ? "Book" : "Books"}
																value = { books.total || 0 }

															/>
														</div>
														<div className="column is-narrow">
															<Metric
																name  = { books.metrics && books.metrics.reviews === 1 ? "Review" : "Reviews"}
																value = { books.metrics && books.metrics.reviews ? books.metrics.reviews : 0 }

															/>
														</div>
														<div className="column is-narrow">
															<Metric
																name  = { books.metrics && books.metrics.likes === 1 ? "Like" : "Likes"}
																value = { books.metrics && books.metrics.likes ? books.metrics.likes : 0 }

															/>
														</div>
														<div className="column is-narrow">
															<Metric
																name  = { books.metrics && books.metrics.favorites === 1 ? "Favorite" : "Favorites"}
																value = { books.metrics && books.metrics.favorites ? books.metrics.favorites : 0 }

															/>
														</div>
													</div>
												</div>
												<div className="actions">
													<button
														type    = "button"
														onClick = { () => onChangeModal(
															<div>New book form</div>

														)}

													>
														NEW BOOK
													</button>
													<button
														type    = "button"
														onClick = { () => handleList(true, true) }

													>
														<FontAwesomeIcon icon = {["fa", "sync-alt"]} />
													</button>
												</div>
												{
													books.books && books.books.length
														?
															<Fragment>
																<table>
																	<tbody>
																		{
																			books.books.map((item) =>
																			{
																				return (
																					<Book
																						id			= { item.id }
																						key 	    = { shortid.generate() }
																						title 	    = { item.title }
																						subtitle    = { item.subtitle }
																						thumbnail   = { item.thumbnail }
																						reviews	    = { item.reviews }
																						likes	    = { item.likes }
																						favorites   = { item.favorites }
																						price    	= { item.price }
																						rating	    = 
																						{{
																							stars: item.rating.stars, total: item.rating.total, users: item.rating.users }}

																					/>

																				);

																			})

																		}
																	</tbody>
																</table>
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
															</div>

												}

											</Fragment>
									
								}
							</section>
						</main>

			}
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</Fragment>

	);

}

export default Main;