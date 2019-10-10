import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import shortid from "shortid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import SnackBar from "../../Components/SnackBar";
import { Update } from "../../../actions/Users";

import formValidate from "../../../utils/FormValidate";

function Main({ history, user })
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
				required: false, min: 6, max: 12 }

		},

		errors: {}

	});

	const [showPassword, setShowPassword] =
		useState(false);

	const [isLoading, setIsLoading] =
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

	const handleUpdateUser = (event) =>
	{
		event.preventDefault();

		const isValid =
			formValidate(form);

		if(isValid === true)
		{
			setIsLoading(
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
				password: form.password.value || null

			};

			setTimeout(() =>
			{
				dispatch(Update({ ...data })).then(data =>
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
							setIsLoading(
								false

							);

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

	useEffect(() =>
	{
		if(!form.name.value && !form.email.value)
		{
			setForm({ ...form,

				name: Object.assign({}, form.name,
				{
					value: user.name

				}),

				email: Object.assign({}, form.email,
				{
					value: user.email

				})

			});

		}

	}, [form, user]);

	return (
		<main>
			<section id="account">
				<form onSubmit={ handleUpdateUser }>
					<h1>
							Hello,
						<br />
							How are you today?
					</h1>
					<div className="field">
						<p className="error">{ form.errors.name }</p>
						<div className="control">
							<input
								type 		= "text"
								name	   	= "name"
								value		= { form.name.value }
								className  	= { "input" + (form.errors.name ? " is-danger" : "") }
								placeholder = "Name"
								disabled	= { isLoading }
								onChange    = { handleChangeForm }

							/>
						</div>
						<p className="help">Enter name and surname</p>
					</div>
					<div className="field">
						<p className="error">{ form.errors.email }</p>
						<div className="control">
							<input
								type 		= "text"
								name	   	= "email"
								value		= { form.email.value }
								className  	= { "input" + (form.errors.email ? " is-danger" : "") }
								placeholder = "E-mail"
								disabled	= { isLoading }
								onChange    = { handleChangeForm }

							/>
						</div>
					</div>
					<div className="field">
						<p className="error">{ form.errors.password }</p>
						<div className="control has-icons-right">
							<input
								type 		= { showPassword ? "text" : "password" }
								name	   	= "password"
								value		= { form.password.value }
								className  	= { "input" + (form.errors.password ? " is-danger" : "") }
								placeholder = "Password"
								disabled	= { isLoading }
								maxLength	= { form.password.validation.max }
								onChange    = { handleChangeForm }

							/>
							<button
								type 	  = "button"
								onClick   = { () => { setShowPassword(!showPassword); } }
								disabled  = { isLoading }
								className = "icon is-right"

							>
								<FontAwesomeIcon icon = {["fas", showPassword ? "eye-slash" : "eye"]} />
							</button>
						</div>
						<p className="help">Between 6 to 12 characters</p>
					</div>
					<div className="field">
							<LaddaButton
								loading			   = { isLoading }
								data-style		   = { ZOOM_OUT }
								data-spinner-size  = { 30 }
								data-spinner-lines = { 12 }
								data-spinner-color = "#ffffff"

							>
								EDIT
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
				</form>
				<SnackBar type={ snackbar.type } index={ snackbar.index } message={ snackbar.message } />
			</section>
		</main>

	);

}

export default withRouter(Main);