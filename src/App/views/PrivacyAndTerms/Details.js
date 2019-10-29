import React, { Fragment } from "react";

import Main from "./Details/Main";
import Header from "./Details/Header";
import Head from "../../../Shared/views/Components/Head";

function Details()
{
	return (
		<Fragment>
			<Head
				title = "Google Books Api - Privacy & Terms"

			/>
			<Header /><Main />
		</Fragment>

	);

}

export default Details;