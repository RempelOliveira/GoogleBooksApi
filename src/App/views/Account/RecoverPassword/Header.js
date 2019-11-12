import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ history, lastPage, loading })
{
	const [sticky, setSticky] =
		useState(false);

	const handleScroll = () =>
	{
		setSticky(
			window.pageYOffset > 0

		);

	}

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
		<header id="appbar" className={ sticky ? "sticky" : "" }>
			<nav>
				<ul>
					<li>
						{
							!lastPage.isLastPage
								?
									<h1 className="title">&nbsp;</h1>

								:
								<button
									type 	  = "button"
									className = "arrow"
									onClick	  = { () => { lastPage.setIsLastPage(false); } }
									disabled  = { loading.isLoading }

								>
									<FontAwesomeIcon icon = {["fas", "chevron-left"]} />
								</button>

						}
					</li>
					<li>
						<Link
							to 		  = "/"
							className = "close"

						>
							<FontAwesomeIcon icon = {["fas", "times"]} />
						</Link>
					</li>
				</ul>
			</nav>
		</header>

	);

}

export default withRouter(Header);