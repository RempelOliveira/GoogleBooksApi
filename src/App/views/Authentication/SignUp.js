import React, { useState } from "react";

import Main from "./SignUp/Main";
import Header from "./SignUp/Header";
import Head from "../Components/Head";

function SignUp()
{
	const [isLastPage, setIsLastPage] =
		useState(false);

	const [isLoading, setIsLoading] =
		useState(false);

	return (
		<div className="app">
			<Head
				title = "Google Books Api - Sign Up"

			/>
			<Header
				lastPage =
				{{
					isLastPage   : isLastPage,
					setIsLastPage: setIsLastPage }}

				loading =
				{{
					isLoading: isLoading }}

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

export default SignUp;