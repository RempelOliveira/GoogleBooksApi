import React, { useState, useEffect }  from "react";
import { Link, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ history, book })
{
	const [sticky, setSticky] =
		useState(false);

	const handleScroll = () =>
	{
		setSticky(
			window.pageYOffset > 0

		);

	};

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
						<h1 className="title">
							{ book ? book.title : "" }
						</h1>
					</li>
					<li>
						<Link
							to 		  = { history.location.state ? history.location.state.route : "/" }
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