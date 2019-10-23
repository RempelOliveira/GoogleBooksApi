import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "../App/styles/styles.css";
import "../App/styles/styles-media.css";

import { isAuth, isAdmin } from "../App/utils/UserAuthentication";

import BooksList from "../App/views/Books/List";
import BooksDetails from "../App/views/Books/Details";
import BooksReviews from "../App/views/Books/Reviews";

import PrivacyAndTerms from "../App/views/PrivacyAndTerms/Details";

import SignIn from "../App/views/Authentication/SignIn";
import SignUp from "../App/views/Authentication/SignUp";

import Account from "../App/views/Account/Details";
import RecoverPassword from "../App/views/Account/RecoverPassword";
import PageNotFound from "../App/views/404.js";

import DashboardBooksList from "../Dashboard/views/Books/List";

function Router()
{
	const PrivateRoute = ({ component: Component, ...rest }) =>
	(
		<Route {...rest} render={props =>
			(rest.admin ? isAdmin() : isAuth()) ? <Component {...props} /> : <Redirect to="/sign-in" />

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

				<Route exact path="/recover-password/:email" component={ RecoverPassword } />

				<PrivateRoute exact path="/account" component={ Account } />

				<PrivateRoute path="/control-panel/books" component={ DashboardBooksList } admin={ true } />

				<Route
					component={ PageNotFound }

				/>

			</Switch>
		</BrowserRouter>

	);

}

export default Router;