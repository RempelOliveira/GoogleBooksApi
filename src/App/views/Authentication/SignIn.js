import React, { useState }  from "react";

import Main from "./SignIn/Main";
import Header from "./SignIn/Header";
import Head from "../../../Shared/views/Components/Head";

function SignIn()
{
	const [isLastPage, setIsLastPage] =
		useState(false);

	const [isLoading, setIsLoading] =
		useState(false);

	return (
		<div className="app">
			<Head
				title = { "Google Books Api - " + (!isLastPage ? "Sign In" : "Recover Password") }

			/>
			<Header
				lastPage =
				{{
					isLastPage   : isLastPage,
					setIsLastPage: setIsLastPage }}

				loading =
				{{
					isLoading   : isLoading,
					setIsLoading: setIsLoading }}

			/>
			<Main
				lastPage =
				{{
					isLastPage   : isLastPage,
					setIsLastPage: setIsLastPage }}

				loading =
				{{
					isLoading   : isLoading,
					setIsLoading: setIsLoading }}

			/>
		</div>

	);

}

export default SignIn;