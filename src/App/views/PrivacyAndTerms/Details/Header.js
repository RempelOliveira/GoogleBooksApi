import React, { useState, useEffect }  from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ history })
{
	const [sticky, setSticky] =
		useState(false);

	const handleScroll = () =>
	{
		setSticky(
			window.pageYOffset > 0

		);

	};

	const handleClose = () =>
	{
		history.push({
			pathname: history.location.state ? history.location.state.route : "/"

		});

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
						<h1 className="title">Privacy & Terms</h1>
					</li>
					<li>
						<button
							className = "close close-fix"
							onClick   = { handleClose }

						>
							<FontAwesomeIcon icon = {["fas", "times"]} />
						</button>
					</li>
				</ul>
			</nav>
		</header>

	);

}

export default withRouter(Header);