import React, { useState } from "react";

import Main from "./RecoverPassword/Main";
import Header from "./RecoverPassword/Header";
import Head from "../../../Shared/views/Components/Head";

function RecoverPassword(props)
{
	const [isLastPage, setIsLastPage] =
		useState(false);

	const [isLoading, setIsLoading] =
		useState(false);

	return (
		<div className="app">
			<Head
				title = "Google Books Api - Recover Password"

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

				email =
				{
					props.match.params.email }

			/>
		</div>

	);

}

export default RecoverPassword;