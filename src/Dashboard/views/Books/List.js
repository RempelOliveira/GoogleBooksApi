import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import Main from "./List/Main";
import Header from "./List/Header";
import DrawerMenu from "../../../Shared/views/Components/DrawerMenu";
import Head from "../../../Shared/views/Components/Head";
import MinResolution from "../MinResolution";

function List({ history })
{
	const [width, setWidth] =
		useState(window.innerWidth);

	const [category, setCategory] =
		useState("typography");

	const user =
		useSelector(state => state.Users.data);

    const handleChangeCategory = (event) =>
	{
		setCategory(event.currentTarget.dataset.category);

    }

	const handleResize = () =>
	{
		setWidth(
			window.innerWidth

		);

	};

	useEffect(() =>
	{
		window.addEventListener("resize", handleResize);

		return (() =>
		{
			window.removeEventListener("resize", handleResize);

		});

	}, []);

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
			{
				width < 768
					?
						<MinResolution />

					:
						<Fragment>
							<DrawerMenu />
							<div className="app">
								<Header
									category		 = { category }
									onChangeCategory = { handleChangeCategory }

								/>
								<Main
									category = { category }

								/>
							</div>
						</Fragment>

			}
		</Fragment>

	);

}

export default withRouter(List);