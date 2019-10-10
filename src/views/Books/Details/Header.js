import React, { Fragment, useState, useEffect }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import shortid from "shortid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Update } from "../../../actions/Books";
import SnackBar from "../../Components/SnackBar";

function Header({ history, book })
{
	const [sticky, setSticky] =
		useState(false);

	const [favorite, setFavorite] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const user =
		useSelector(state => state.Users.data);

	const handleScroll = () =>
	{
		setSticky(
			window.pageYOffset > 0

		);

	}

    const handleUpdateFavorite = () =>
	{
		if(user)
		{
			dispatch(Update(book, !book.favorite ? "favorite" : "unfavorite")).then(data =>
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
		if(book)
			setFavorite(book.favorite);

	}, [book]);

	useEffect(() =>
	{
		handleScroll();

		window.addEventListener(
			"scroll", handleScroll);

		return () =>
		{
			window.removeEventListener(
				"scroll", handleScroll);

		};

	}, []);

	return (
		<Fragment>
			<header id="appbar" className={ sticky ? "sticky" : "" }>
				<nav>
					<ul>
						<li>
							<Link
								to 		  = "/"
								className = "arrow"

							>
								<FontAwesomeIcon icon = {["fas", "chevron-left"]} />
							</Link>
						</li>
						{
							book && book.id
								?
									<li>
										<button
											type 	  = "button"
											className = { "bookmark" + (favorite ? " active" : "") }
											onClick   = { handleUpdateFavorite }

										>
											<FontAwesomeIcon icon = {[favorite ? "fas" : "far", "bookmark"]} />
										</button>
									</li>

								:
									""

						}
					</ul>
				</nav>
			</header>
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</Fragment>

	);

}

export default withRouter(Header);