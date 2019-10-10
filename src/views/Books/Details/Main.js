import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import shortid from "shortid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Update } from "../../../actions/Books";
import Book from "../../Components/Book";
import SnackBar from "../../Components/SnackBar";

function Main({ history, book, onClickShare })
{
	const [like, setLike] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const user =
		useSelector(state => state.Users.data);

	const handleUpdateLike = () =>
	{
		if(user)
		{
			dispatch(Update(book, !book.like ? "like" : "dislike")).then(data =>
			{
				if(data && data.error)
				{
					if(data.error === "authorization")
					{
						history.push({
							pathname: "/sign-in", state: { route: history.location.pathname }

						});

					}
					else if(data.error.internal)
					{
						setSnackbar({
							index: shortid.generate(), type: "danger", message: data.error.internal

						});

					}

				}

			});

		}
		else
		{
			history.push({
				pathname: "/sign-in", state: { route: history.location.pathname }

			});

		}

    }

	useEffect(() =>
	{
		setLike(book.like);

	}, [book.like]);

	return (
		<main>
			<section id="book-details">
				<div className="columns">
					<div className="column is-narrow">
						<div>
							<Book
								title 	  = { book.title }
								subtitle  = { book.subtitle }
								thumbnail = { book.thumbnail }
								details   = { true }
								reviews	  = { book.reviews }
								rating	  = 
								{
									{ stars: book.rating.stars, total: book.rating.total, users: book.rating.users }}

							/>
						</div>
					</div>
				</div>
				<div className="details">
					<div className="columns is-mobile">
						<div className="column is-flex">
							<Link
								className = "is-flex"
									   to = {{
											pathname: history.location.pathname + "/reviews", state: { route: history.location.pathname } }}

							>
								<FontAwesomeIcon
									icon = {["fas", "comment-dots"]}

								/>
								<span>See Reviews</span>
							</Link>
						</div>
						<div className="column is-flex">
							<button
								type 	  = "button"
								className = "is-flex"
								onClick   = { handleUpdateLike }

							>
								<FontAwesomeIcon
									icon 	  = {["fas", "heart"]}
									className = { like ? "active" : "" }

								/>
								<span>Like</span>
							</button>
						</div>
						<div className="column is-flex">
							<button
								type 	  = "button"
								className = "is-flex"
								onClick   = { onClickShare }

							>
								<FontAwesomeIcon
									icon = {["fas", "share"]}

								/>
								<span>Share</span>
							</button>
						</div>
					</div>
					<div className="columns">
						<div className="column">
							<h2 className="title">
								About the Book
							</h2>
						</div>
						<div className="column">
							<p className="description">
								{ book.description }
							</p>
						</div>
					</div>
				</div>
			</section>
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</main>

	);

}

export default withRouter(Main);