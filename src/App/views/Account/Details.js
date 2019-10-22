import React, { Fragment, useEffect }  from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import Main from "./Details/Main";
import Header from "./Details/Header";
import Head from "../Components/Head";

function Details({ history })
{
	const user =
		useSelector(state => state.Users.data);

	useEffect(() =>
	{
		if(!user)
			history.push({
				pathname: "/sign-in", state: { route: history.location.pathname }

			});

	}, [history, user]);

	return (
		<Fragment>
			<Head
				title = "Google Books Api - Account"

			/>
			{
				user
					?
						<Fragment>
							<Header />
							<Main user = { user } />
						</Fragment>
					:
						""

			}
		</Fragment>

	);

}

export default withRouter(Details);