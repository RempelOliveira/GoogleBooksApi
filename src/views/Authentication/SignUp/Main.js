import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import shortid from "shortid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import SnackBar from "../../Components/SnackBar";
import { SignUp } from "../../../actions/Users";

import formValidate from "../../../utils/FormValidate";

function Main({ history, loading, lastPage })
{
	const [form, setForm] =	useState({

		name:
		{
			value	  : "",
			validation:
			{
				required: true, surname: true }

		},

		email:
		{
			value	  : "",
			validation:
			{
				required: true, email: true	}

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

	const handleSignUp = (event) =>
	{
		event.preventDefault();

		const isValid =
			formValidate(form);

		if(isValid === true)
		{
			loading.setIsLoading(
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
				name	: form.name.value,
				email	: form.email.value,
				password: form.password.value

			};

			setTimeout(() =>
			{
				dispatch(SignUp({ ...data })).then(data =>
				{
					if(data)
					{
						if(!data.error)
						{
							const name =
								data.name.split(" ")[0];

							setSnackbar({
								index: shortid.generate(), type: "success", message: "Welcome <b>" + name + "</b>, wait for automatic redirection."

							});

							setTimeout(() =>
							{
								history.push("/");

							}, 1750);

						}
						else
						{
							loading.setIsLoading(
								false

							);

							if(!data.error.internal)
							{
								if(data.error.name)
								{
									lastPage.setIsLastPage(false);

								}
								else
								{
									if(!lastPage.isLastPage)
										lastPage.setIsLastPage(true);

								}

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

						}

					}

				});

			}, 1000);

		}
		else
		{
			if(isValid.name)
			{
				lastPage.setIsLastPage(false);

			}
			else
			{
				if(!lastPage.isLastPage)
					lastPage.setIsLastPage(true);

			}

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
			<section id="sign-out">
				<form onSubmit={ handleSignUp } className={ "wizard" + (lastPage.isLastPage ? " wizard-last-page" : "" ) }>
					<div className="page">
						<h1>
								Welcome to Google
							<br />
								Books Api!
						</h1>
						<div className="field">
							<div className="control">
								{
									!lastPage.isLastPage
										?
											<p className="error">{ form.errors.name }</p>

										:
											""

								}
								<input
									type 		= "text"
									name	   	= "name"
									value		= { form.name.value }
									className  	= { "input" + (form.errors.name ? " is-danger" : "") }
									placeholder = "Name"
									disabled	= { loading.isLoading }
									onChange    = { handleChangeForm }

								/>
							</div>
							<p className="help">Enter name and surname</p>
						</div>
						<div className="field">
								<button
									type 	= "button"
									onClick = { () => { lastPage.setIsLastPage(true); } }

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
								Just a few more fields.
						</h1>
						<div className="field">
							{
								lastPage.isLastPage
									?
										<p className="error">{ form.errors.email }</p>

									:
										""

							}
							<div className="control">
								<input
									type 		= "text"
									name	   	= "email"
									value		= { form.email.value }
									className  	= { "input" + (form.errors.email ? " is-danger" : "") }
									placeholder = "E-mail"
									disabled	= { loading.isLoading }
									onChange    = { handleChangeForm }

								/>
							</div>
						</div>
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
									maxLength	= { form.password.validation.max }
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
									SIGN UP
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