import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Book({ id, title, subtitle, price, rating, reviews, likes, favorites, thumbnail })
{
	const [width, setWidth] =
		useState(window.innerWidth);

	const handleResize = () =>
	{
		setWidth(
			window.innerWidth

		);

	}

	useEffect(() =>
	{
		window.addEventListener(
			"resize", handleResize);

		return () =>
		{
			window.removeEventListener(
				"resize", handleResize);

		};

	}, []);

	return (
		<tr>
			<td>
				<div className="thumbnail" style={{backgroundImage: `url(${ thumbnail })`}}>
					<div></div>
				</div>
			</td>
			<td>
				<div className="title-subtitle">
					<h1 className="title">
						{ title }
					</h1>
					<h2 className="subtitle">
						{ subtitle }
					</h2>
				</div>
			</td>
			<td>
				<p className="price">
					R$ { price }
				</p>
			</td>
			<td>
				<div className="rating">
					<StarRatings
						name		   = "rating"
						rating		   = { rating.stars }
						numberOfStars  = { width < 1231 ? 1 : 5 }
						starSpacing	   = { width < 425 ? "1px"  : "2px"  }
						starDimension  = { width < 425 ? "14px" : "18px" }
						starRatedColor = "rgb(255, 175, 46)"
						starHoverColor = "rgb(255, 175, 46)"

					/>
					<span>
						{ rating.stars > 9999 ? "10k+" : Math.round(rating.stars * Math.pow(10, 2)) / Math.pow(10, 2) }
					</span>
				</div>
			</td>
			<td>
				<div className="icon-text">
					<FontAwesomeIcon icon = {["fas", "comment-dots"]} />
					<span>{ reviews > 9999 ? "+10k" : reviews }</span>
				</div>
			</td>
			<td>
				<div className="icon-text">
					<FontAwesomeIcon icon = {["fas", "heart"]} />
					<span>0</span>
				</div>
			</td>
			<td>
				<div className="icon-text">
					<FontAwesomeIcon icon = {["fas", "bookmark"]} />
					<span>0</span>
				</div>
			</td>
			<td>
				<div className="actions">
					<Link
						to 		  = { "/control-panel/books/" + id }
						className = "edit"

					>
						<FontAwesomeIcon icon = {["fa", "pencil-alt"]} />
					</Link>
					<button
						type 	  = "button"
						onClick   = { () => {} }
						className = "delete"

					>
						<FontAwesomeIcon icon = {["fa", "times-circle"]} />
					</button>
				</div>
			</td>
		</tr>

	);

}

export default Book;