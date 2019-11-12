import React, { Fragment, useState, useEffect }  from "react";
import { Link, withRouter } from "react-router-dom";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import StarRatings from "react-star-ratings";

function Review({ history, form, review, isDisabled, isDisabledAuth, onSubmit, onChangeReview })
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
		<Fragment>
			{
				form === true
					?
						<div className="review">
							<StarRatings
								name		   = "rating"
								rating		   = { review.rating.value }
								numberOfStars  = { 5 }
								starSpacing	   = { width < 425 ? "1px"  : "2px"  }
								starDimension  = { width < 425 ? "14px" : "18px" }
								starRatedColor = "rgb(255, 175, 46)"
								starHoverColor = "rgb(255, 175, 46)"
								changeRating   = { isDisabled || isDisabledAuth ? () => {} : onChangeReview }

							/>
							<form onSubmit={ onSubmit }>
								<div className="field">
									<p className="error">{ review.errors.review }</p>
									<div className="control">
										<textarea
											name	   	= "review"
											value		= { review.review.value }
											className  	= { "textarea" + (review.errors.review ? " is-danger" : "") }
											placeholder = "Write your review..."
											onChange    = { onChangeReview }
											disabled	= { isDisabled || isDisabledAuth }
											rows		= { width < 425 ? 3 : width < 768 ? 4 : width < 1230 ? 5 : 6 }

										/>
									</div>
									{
										isDisabledAuth === true
											?
												<p className="help">
													<Link 
														to = {{
															pathname: "/sign-in", state: { route: history.location.pathname } }}

													>
														SIGN IN
													</Link> to write a review
												</p>

											:
												""

									}
								</div>
								<div className="field is-grouped is-grouped-right">
									<LaddaButton
										loading			   = { isDisabled }
										data-style		   = { ZOOM_OUT }
										data-spinner-size  = { 30 }
										data-spinner-lines = { 12 }
										data-spinner-color = "#ffffff"
										disabled		   = { isDisabled || isDisabledAuth }

									>
										SUBMIT
									</LaddaButton>

								</div>
							</form>
							<div className="is-divider" data-content=""></div>
						</div>

					:
						<div className="review">
							<h1 className="title">
								{ review.user.name }
							</h1>
							<StarRatings
								name		   = "rating"
								rating		   = { review.rating }
								numberOfStars  = { 5 }
								starSpacing	   = { width < 425 ? "1px"  : "2px"  }
								starDimension  = { width < 425 ? "14px" : "18px" }
								starRatedColor = "rgb(255, 175, 46)"
								starHoverColor = "rgb(255, 175, 46)"

							/>
							<p className="description">
								{ review.review }
							</p>
						</div>

			}
		</Fragment>

	);

}

export default withRouter(Review);