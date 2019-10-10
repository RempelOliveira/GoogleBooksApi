import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import shortid from "shortid";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import SnackBar from "../../Components/SnackBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import formValidate from "../../../utils/FormValidate";
import { RecoverPasswordUpdate } from "../../../actions/Users";

function Main({ history, email, loading, lastPage })
{
	const [form, setForm] =	useState({

		codeOne:
		{
			value	  : "",
			validation:
			{
				required: true, code: true, max: 1 }

		},

		codeTwo:
		{
			value	  : "",
			validation:
			{
				required: true, code: true, max: 1 }

		},

		codeThree:
		{
			value	  : "",
			validation:
			{
				required: true, code: true, max: 1 }

		},

		codeFour:
		{
			value	  : "",
			validation:
			{
				required: true, code: true, max: 1 }

		},

		password:
		{
			value	  : "",
			validation:
			{
				required: true, min: 6, max: 12	}

		},

		errors: {}

	});

	const [showPassword, setShowPassword] =
		useState(false);

	const [snackbar, setSnackbar] =
		useState({ index: shortid.generate(), type: "info", message: "" });

	const dispatch =
		useDispatch();

	const handleChangeForm = (event) =>
	{
		setForm({
			...form, [event.target.name]: Object.assign({}, form[event.target.name],
			{
				value: event.target.value

			})

		});

	}

	const handleRecoverPassword = (event) =>
	{
		event.preventDefault();

		const isValid =
			formValidate(form);

		if(isValid === true)
		{
			loading.setIsLoading(true);

			setSnackbar({
				message: "Processing data! Please wait a few moments."

			});

			setForm({
				...form, errors: {}

			});

			let data =
			{
				code	: form.codeOne.value + form.codeTwo.value + form.codeThree.value + form.codeFour.value,
				email	: email,
				password: form.password.value

			};

			setTimeout(() =>
			{
				dispatch(RecoverPasswordUpdate({ ...data })).then(data =>
				{
					if(data)
					{
						if(!data.error)
						{
							const name =
								data.name.split(" ")[0];

							setSnackbar({
								index: shortid.generate(), type: "success", message: "Great <b>" + name + "</b>, wait for automatic redirection."

							});

							setTimeout(() =>
							{
								history.push("/");

							}, 1750);

						}
						else
						{
							if(!data.error.internal)
							{
								setForm({
									...form, errors: data.error

								});

								setSnackbar({
									index: shortid.generate(), type: "danger", message: "Please check the form fields."

								});

							}
							else
							{
								setSnackbar({
									index: shortid.generate(), type: "danger", message: data.error.internal

								});

							}

							loading.setIsLoading(false);

						}

					}

				}).catch(error =>
				{
					setSnackbar({
						index: shortid.generate(), type: "danger", message: "An internal error occurred."

					});

					loading.setIsLoading(false);

				});

			}, 1000);

		}
		else
		{
			if(isValid.codeOne || isValid.codeTwo || isValid.codeThree || isValid.codeFour)
				lastPage.setIsLastPage(false);

			setForm({
				...form, errors: isValid

			});

			setSnackbar({
				index: shortid.generate(), type: "danger", message: "Please check the form fields."

			});

		}

	}

	return (
		<main className="full-width">
			<section id="recover-password">
				<form onSubmit={ handleRecoverPassword } className={ "wizard" + (lastPage.isLastPage ? " wizard-last-page" : "" ) }>
					<div className="page">
						<h1>
								Welcome back to Google
							<br />
								Books Api!
						</h1>
						<div className="field is-grouped">
							<div className="control is-expanded">
								{
									!lastPage.isLastPage
										?
											<p className="error">{ form.errors.codeOne || form.errors.codeTwo || form.errors.codeThree || form.errors.codeFour }</p>

										:
											""

								}
								<input
									type 		= "text"
									name	   	= "codeOne"
									value		= { form.codeOne.value }
									className  	= { "input" + (form.errors.codeOne || form.errors.codeTwo || form.errors.codeThree || form.errors.codeFour ? " is-danger" : "") }
									placeholder = "1"
									disabled	= { loading.isLoading }
									maxLength	= { form.codeOne.validation.max }
									onChange    = { handleChangeForm }

								/>
							</div>
							<div className="control is-expanded">
								<input
									type 		= "text"
									name	   	= "codeTwo"
									value		= { form.codeTwo.value }
									className  	= { "input" + (form.errors.codeOne || form.errors.codeTwo || form.errors.codeThree || form.errors.codeFour ? " is-danger" : "") }
									placeholder = "2"
									disabled	= { loading.isLoading }
									maxLength	= { form.codeTwo.validation.max }
									onChange    = { handleChangeForm }

								/>
							</div>
							<div className="control is-expanded">
								<input
									type 		= "text"
									name	   	= "codeThree"
									value		= { form.codeThree.value }
									className  	= { "input" + (form.errors.codeOne || form.errors.codeTwo || form.errors.codeThree || form.errors.codeFour ? " is-danger" : "") }
									placeholder = "3"
									disabled	= { loading.isLoading }
									maxLength	= { form.codeThree.validation.max }
									onChange    = { handleChangeForm }

								/>
							</div>
							<div className="control is-expanded">
								<input
									type 		= "text"
									name	   	= "codeFour"
									value		= { form.codeFour.value }
									className  	= { "input" + (form.errors.codeOne || form.errors.codeTwo || form.errors.codeThree || form.errors.codeFour ? " is-danger" : "") }
									placeholder = "4"
									disabled	= { loading.isLoading }
									maxLength	= { form.codeFour.validation.max }
									onChange    = { handleChangeForm }

								/>
							</div>
						</div>
						<div className="field">
							<p className="help">Enter your emailed code</p>
						</div>
						<div className="field">
								<button
									type 	 = "button"
									onClick  = { () => { lastPage.setIsLastPage(true); } }

								>
									NEXT
								</button>
								<p>
									<Link
										to = {{
											pathname: "/privacy-and-terms", state: { route: history.location.pathname } }}

									>
										PRIVACY & TERMS
									</Link>
								</p>
						</div>
					</div>
					<div className="page">
						<h1>
								Almost there!
							<br />
								Just one more field.
						</h1>
						<div className="field">
							{
								lastPage.isLastPage
									?
										<p className="error">{ form.errors.password }</p>

									:
										""

							}
							<div className="control has-icons-right">
								<input
									type 		= { showPassword ? "text" : "password" }
									name	   	= "password"
									value		= { form.password.value }
									className  	= { "input" + (form.errors.password ? " is-danger" : "") }
									placeholder = "Password"
									disabled	= { loading.isLoading }
									maxLength	= { 12 }
									onChange    = { handleChangeForm }

								/>
								<button
									type 	  = "button"
									onClick   = { () => { setShowPassword(!showPassword); } }
									disabled  = { loading.isLoading }
									className = "icon is-right"

								>
									<FontAwesomeIcon icon = {["fas", showPassword ? "eye-slash" : "eye"]} />
								</button>
							</div>
							<p className="help">Between 6 to 12 characters</p>
						</div>
						<div className="field">
								<LaddaButton
									loading			   = { loading.isLoading }
									data-style		   = { ZOOM_OUT }
									data-spinner-size  = { 30 }
									data-spinner-lines = { 12 }
									data-spinner-color = "#ffffff"

								>
									SUBMIT
								</LaddaButton>
								<p>
									<Link
										to = {{
											pathname: "/privacy-and-terms", state: { route: history.location.pathname } }}

									>
										PRIVACY & TERMS
									</Link>
								</p>
						</div>
					</div>
				</form>
				<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
			</section>
		</main>

	);

}

export default withRouter(Main);