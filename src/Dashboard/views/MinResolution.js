import React from "react";
import { Link } from "react-router-dom";

function MinResolution()
{
	return (
		<main>
			<section id="min-resolution">
				<h1>
					This page requires 768px width
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

export default MinResolution;