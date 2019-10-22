import React, { useState, useEffect }  from "react";
import StarRatings from "react-star-ratings";

function Book({ title, subtitle, rating, reviews, details, thumbnail })
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
		<div className={"book" + (details ? " book-inverted" : "")} style={{ width: width <= 324 ? "100%" : (width < 425 ? "276px" : "378px") }}>
			<div className="infos" style={{ width: "calc(50% + 20px)" }}>
				<div className="title-subtitle">
					<h1 className="title">
						{ title }
					</h1>
					<h2 className="subtitle">
						{ subtitle }
					</h2>
				</div>
				<StarRatings
					name		   = "rating"
					rating		   = { rating.stars }
					numberOfStars  = { 5 }
					starSpacing	   = { width < 425 ? "1px"  : "2px"  }
					starDimension  = { width < 425 ? "14px" : "18px" }
					starRatedColor = "rgb(255, 175, 46)"
					starHoverColor = "rgb(255, 175, 46)"

				/>
				<p className="rating">
					<span>
						{ rating.stars > 9999 ? "10k+" : Math.round(rating.stars * Math.pow(10, 2)) / Math.pow(10, 2) }
					</span>
				</p>
				<p className="reviews">
					{ reviews > 9999 ? "+10k" : reviews } Reviews
				</p>
				{
					!details
						?
							<p className="arrow">
								&#8250;
							</p>
						:
							""
				}
			</div>
			<div className="thumbnail" style={{backgroundImage: `url(${ thumbnail })`}}>
				<div></div>
			</div>
		</div>

	);

}

export default Book;