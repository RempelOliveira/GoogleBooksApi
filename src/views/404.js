import React from "react";
import { Link } from "react-router-dom";

function PageNotFound()
{
	return (
		<main>
			<section id="page-not-found">
				<h1>
					404 - Page not found
				</h1>
				<div className="go-home">
					<Link
						to 		= "/#browse"
						replace = { true }

					>
						GO HOME
					</Link>
				</div>
			</section>
		</main>

	);

};

export default PageNotFound;