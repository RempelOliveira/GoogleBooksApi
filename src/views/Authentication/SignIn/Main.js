import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import shortid from "shortid";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SnackBar from "../../Components/SnackBar";
import { SignIn, RecoverPassword } from "../../../actions/Users";

import formValidate from "../../../utils/FormValidate";

function Main({ history, loading, lastPage })
{
	const [form, setForm] = useState({

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

	const handleSignIn = (event) =>
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
				email	: form.email.value,
				password: form.password.value

			};

			setTimeout(() =>
			{
				dispatch(SignIn({ ...data })).then(data =>
				{
					if(data)
					{
						if(!data.error)
						{
							const name =
								data.name.split(" ")[0];

							setSnackbar({
								index: shortid.generate(), type: "success", message: "Welcome back <b>" + name + "</b>, wait for automatic redirection."

							});

							setTimeout(() =>
							{
								history.push({
									pathname: history.location.state ? history.location.state.route : "/"

								});

							}, 1750);

						}
						else
						{
							loading.setIsLoading(
								false

							);

							setSnackbar({
								index: shortid.generate(), type: "danger", message: data.error.internal

							});

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
	
	const handleRecoverPassword = (event) =>
	{
		event.preventDefault();

		const isValid =
			formValidate({ email: form.email });

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
				email: form.email.value

			};

			setTimeout(() =>
			{
				dispatch(RecoverPassword({ ...data })).then(data =>
				{
					if(data)
					{
						loading.setIsLoading(
							false

						);

						if(!data.error)
						{
							lastPage.setIsLastPage(
								false

							);

							setSnackbar({
								index: shortid.generate(), type: "success", message: "Check your email for password recovery instructions."

							});

						}
						else
						{
							setSnackbar({
								index: shortid.generate(), type: "danger", message: data.error.internal

							});

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
		<main className="full-width">
			<section id="sign-in">
				<div className={ "wizard" + (lastPage.isLastPage ? " wizard-last-page" : "" ) }>
					<div className="page">
						<form onSubmit={ handleSignIn }>
							<h1>
								Welcome Back!
							</h1>
							<div className="field">
								{
									!lastPage.isLastPage
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
									!lastPage.isLastPage
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
							<div className="field forgot-password">
								<button
									type	  = "button"
									className = "forgot-password-btn"
									onClick   = { () => lastPage.setIsLastPage(true) }

								>
									Forgot Password?
								</button>
							</div>
							<div className="field">
								<LaddaButton
									loading			   = { loading.isLoading }
									className		   = "signin"
									data-style		   = { ZOOM_OUT }
									data-spinner-size  = { 30 }
									data-spinner-lines = { 12 }
									data-spinner-color = "#ffffff"

								>
									SIGN IN
								</LaddaButton>
								<p>
									NEW USER? <Link to = {{
											pathname: "/sign-up", state: { route: history.location.state ? history.location.state.route : history.location.pathname } }}

										>
										SIGN UP
									</Link>
								</p>
							</div>
						</form>
					</div>
					<div className="page">
						<form onSubmit={ handleRecoverPassword }>
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
								<p className="help">Enter your email to recovery password</p>
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
									NEW USER? <Link to = {{
											pathname: "/sign-up", state: { route: history.location.state ? history.location.state.route : history.location.pathname } }}

										>
										SIGN UP
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
				<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
			</section>
		</main>

	);

}

export default withRouter(Main);