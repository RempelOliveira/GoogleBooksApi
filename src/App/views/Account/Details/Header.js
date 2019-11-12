import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header()
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
						<Link
							to 		  = "/"
							className = "arrow"

						>
							<FontAwesomeIcon icon = {["fas", "chevron-left"]} />
						</Link>
					</li>
					<li></li>
				</ul>
			</nav>
		</header>

	);

}

export default Header;