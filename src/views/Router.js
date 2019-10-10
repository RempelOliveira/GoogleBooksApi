import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "../styles/styles.css";
import "../styles/styles-media.css";

import { isAuth } from "../utils/UserAuthentication";

import BooksList from "./Books/List";
import BooksDetails from "./Books/Details";
import BooksReviews from "./Books/Reviews";

import PrivacyAndTerms from "./PrivacyAndTerms/Details";

import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";

import Account from "./Account/Details";
import RecoverPassword from "./Account/RecoverPassword";

import PageNotFound from "./404.js";

function Router()
{
	const PrivateRoute = ({ component: Component, ...rest }) =>
	(
		<Route {...rest} render={ (props) =>
			isAuth() ? <Component {...props} /> : <Redirect to="/" />

		} />

	);

	return (
		<BrowserRouter>
			<Switch>

				<Route exact path="/(|#browse|#favorites)" component={ BooksList } />

				<Route exact path="/book/:id" component={ BooksDetails } />
				<Route exact path="/book/:id/reviews" component={ BooksReviews } />

				<Route exact path="/privacy-and-terms" component={ PrivacyAndTerms } />

				<Route exact path="/sign-in" component={ SignIn } />
				<Route exact path="/sign-up" component={ SignUp } />

				<PrivateRoute exact path="/account" component={ Account } />
				<Route exact path="/recover-password/:email" component={ RecoverPassword } />

				<Route
					component={ PageNotFound }

				/>

			</Switch>
		</BrowserRouter>

	);

}

export default Router;