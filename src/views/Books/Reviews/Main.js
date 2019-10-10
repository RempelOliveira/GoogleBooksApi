import React, { Fragment, useState }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import shortid from "shortid";

import { Create } from "../../../actions/Reviews";

import Review from "../../Components/Review";
import CircularProgressLoader from "../../Components/CircularProgressLoader";
import BadRequest from "../../400.js";

import formValidate from "../../../utils/FormValidate";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

function Main({ history, book, reviews, isLoading, isLoadingAll, internalError, onReload, onLoadAll, setSnackbar })
{
	const [form, setForm] =	useState({

		rating:
		{
			value	  : 0,
			validation: {}

		},

		review:
		{
			value	  : "",
			validation:
			{
				required: true	}

		},

		errors: {}

	});

	const [isLoadingCreate, setIsLoadingCreate] =
		useState(false);

	const dispatch =
		useDispatch();

	const user =
		useSelector(state => state.Users.data);

	const handleChangeForm = (event) =>
	{
		if(!Number.isInteger(event))
		{
			setForm({
				...form, [event.target.name]: Object.assign({}, form[event.target.name],
				{
					value: event.target.value

				})

			});

		}
		else
		{
			setForm({
				...form, rating: Object.assign({}, form.rating,
				{
					value: form.rating.value === 1 && event === 1 ? 0 : event

				})

			});

		}

	}

	const handleCreateReview = (event) =>
	{
		event.preventDefault();

		const isValid =
			formValidate(form);

		if(isValid === true)
		{
			setIsLoadingCreate(
				true

			);

			setSnackbar({
				message: "Processing data! Please wait a few moments."

			});

			setForm({
				...form, errors: {}

			});

			let data =
			{
				rating: form.rating.value,
				review: form.review.value

			};

			setTimeout(() =>
			{
				dispatch(Create(book.id, reviews.items.length === reviews.total, { ...data })).then(data =>
				{
					if(data)
					{
						setIsLoadingCreate(
							false

						);

						if(!data.error)
						{
							setSnackbar({
								index: shortid.generate(), type: "success", message: "Thanks for your review."

							});

							setForm({ ...form,

								rating: Object.assign({}, form.rating,
								{
									value: 0

								}),

								review: Object.assign({}, form.review,
								{
									value: ""

								}),

								errors: {}

							});

						}
						else
						{
							if(data.error.internal)
							{
								setSnackbar({
									index: shortid.generate(), type: "danger", message: data.error.internal

								});

							}
							else if(data.error === "authorization")
							{
								history.push({
									pathname: "/sign-in", state: { route: history.location.pathname }

								});

							}
							else
							{
								setForm({
									...form, errors: data.error

								});

								setSnackbar({
									index: shortid.generate(), type: "danger", message: "Please check the form fields."

								});

							}

						}

					}

				});

			}, 1000);

		}
		else
		{
			setForm({
				...form, errors: isValid

			});

			setSnackbar({
				index: shortid.generate(), type: "danger", message: "Please check the form fields."

			});

		}

	}

	return (
		<Fragment>
			{
				internalError
					?
						<BadRequest
							onClick = { onReload }

						/>

					:
						isLoading
							?
								<CircularProgressLoader />

							:
								<main>
									<section id="book-reviews">
										<Review
											form		   = { true }
											review  	   = { form }
											isDisabled	   = { isLoadingCreate }
											isDisabledAuth = { !user }
											onChangeReview = { handleChangeForm }
											onSubmit 	   = { handleCreateReview }

										/>
										{
											reviews.items.length
												?
													reviews.items.map((item) =>
													{
														return (
															<Review
																key    = { shortid.generate() }
																form   = { false }
																review = {{
																	user: item.user, rating: item.rating, review: item.review

																}}

															/>

														);

													})

												:
													<div className="no-records-found">
														<h1>No records found!</h1>
													</div>

										}
										{
											reviews.items.length < reviews.total
												?
													<div className="load-more">
														<LaddaButton
															loading			   = { isLoadingAll }
															data-style		   = { ZOOM_OUT }
															data-spinner-size  = { 30 }
															data-spinner-lines = { 12 }
															data-spinner-color = "#ffffff"
															disabled		   = { isLoadingAll }
															onClick			   = { () => onLoadAll(true, true) }

														>
															SHOW ALL COMMENTS
														</LaddaButton>
													</div>

												:
													""

										}
									</section>
								</main>

			}
		</Fragment>

	);

}

export default withRouter(Main);