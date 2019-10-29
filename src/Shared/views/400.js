import React from "react";
import { Link } from "react-router-dom";

function PageNotFound({ isHome, onClick })
{
	return (
		<main>
			<section id="bad-request">
				<h1>
					400 - Bad request
				</h1>
				<div className="buttons">
					{
						isHome ||
							<div className="go-home">
								<Link
									to 		= "/#browse"
									replace = { true }

								>
									GO HOME
								</Link>
							</div>

					}
					<div className="reload">
						<button
							type 	  = "button"
							onClick   = { onClick }
							className = { isHome ? " colorful" : "" }

						>
							TRY RELOAD
						</button>
					</div>
				</div>
			</section>
		</main>

	);

};

export default PageNotFound;