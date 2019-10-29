import React from "react";
import { Helmet } from "react-helmet";

function Head({ title, name, description, image })
{
	return (
		<Helmet>
			<title>{ title }</title>

			<meta name="description" content={ description } />

			<meta property="og:title" content={ title } />
			<meta property="og:site_name" content={ name } />
			<meta property="og:description" content={ description } />
			<meta property="og:image" content={ image } />

		</Helmet>

	);

}

export default Head;