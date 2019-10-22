import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import DrawerMenu from "../../../App/views/Components/DrawerMenu";
import Head from "../../../App/views/Components/Head";

function List({ history })
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
				title = "Google Books Api - Dashboard"

			/>
			<Fragment>
				<DrawerMenu />
				<div className="app">
					
				</div>
			</Fragment>
		</Fragment>

	);

}

export default withRouter(List);