import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import shortid from "shortid";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import { SignOut } from "../../actions/Users";

import SnackBar from "./SnackBar";
import DelayLink from "./DelayLink";

function DrawerMenu()
{
	let timeOut;

	const [active, setActive] =
		useState(false);

	const [isLoading, setIsLoading] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const user =
		useSelector(state => state.Users.data);

	const handleActive = (delayed) =>
	{
		window.scroll({	top: 0, left: 0, behavior: "smooth" });

		timeOut = setTimeout(() =>
		{
			if(active === false)
			{
				document.getElementById("root")
					.classList.add("drawer-menu-opened");

			}
			else
				setTimeout(() => document.getElementById("root").classList.remove("drawer-menu-opened"), delayed === true ? 450 : 0);

			setActive(!active);

		}, window.pageYOffset > 0 ? 125 : 0);

	}

	const handleSignOutUser = () =>
	{
		setIsLoading(
			true

		);

		setSnackbar({
			message: "Processing data! Please wait a few moments."

		});

		dispatch(SignOut()).then(() =>
		{
			setIsLoading(
				false

			);

			setSnackbar({
				index: shortid.generate(), type: "success", message: "Now you are logged out."

			});

			handleActive(true);

		});

	}

	useEffect(() =>
	{
		return () =>
		{
			clearTimeout(timeOut);

		};

	});

	return (
		<div id="drawer-menu" className={ active ? "opened" : "" } >
			<button
				type	  = "button"
				className = { "hamburger hamburger--slider " + (active ? "is-active" : "") }
				onClick	  = { () => { handleActive(true); } }

			>
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</button>
			<div className="menu">
				<div className="title-subtitle">
					<h1 className="title">
						{
							user ? user.name : "Welcome!"

						}
					</h1>
					<h2 className="subtitle">
						{
							user ? user.email : "Sign in app to see your score"

						}
					</h2>
				</div>
				<div className="score">
					<div className="item">
						<p>
								{
									user ? user.score.likes : 0

								}
							<br />
								Likes
						</p>
					</div>
					<div className="item">
						<p>
								{
									user ? user.score.favorites : 0

								}
							<br />
								Favorites
						</p>
					</div>
					<div className="item">
						<p>
								{
									user ? user.score.reviews : 0

								}
							<br />
								Reviews
						</p>
					</div>
				</div>
				<nav>
					<ul>
						{
							!user ||
								<li>
									<DelayLink
										to 		= "account"
										onClick	= { handleActive }

									>
										Account
									</DelayLink>
								</li>
						}
						{
							user && user.type === "admin"
								?
									<li>
										<DelayLink
											to 		= "control-panel/books"
											onClick	= { handleActive }

										>
											Control Panel
										</DelayLink>
									</li>
								:
									""

						}
						<li>
							<DelayLink
								to 		= "privacy-and-terms"
								onClick	= { handleActive }

							>
								Privacy & Terms
							</DelayLink>
						</li>
						<li>
						{
							user
								?
									<LaddaButton
										loading			   = { isLoading }
										className 		   = "button"
										onClick   		   = { handleSignOutUser }
										data-style		   = { ZOOM_OUT }
										data-spinner-size  = { 30 }
										data-spinner-lines = { 12 }
										data-spinner-color = "#ffffff"

									>
										SIGN OUT
									</LaddaButton>

								:
									<Fragment>
											<DelayLink
												to 		  = "/sign-in"
												className = "button"
												onClick	  = { handleActive }

											>
												SIGN IN
											</DelayLink>
										<br />
											<DelayLink
												to 		= "/sign-up"
												onClick	= { handleActive }

											>
												OR CREATE YOUR ACCOUNT
											</DelayLink>
									</Fragment>

						}
						</li>
					</ul>
				</nav>
			</div>
			<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
		</div>

	);

}

export default DrawerMenu;