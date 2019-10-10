import React, { Fragment, useState } from "react";

import Main from "./List/Main";
import Header from "./List/Header";
import DrawerMenu from "../Components/DrawerMenu";
import Head from "../Components/Head";
import PageNotFound from "../404.js";

function List({ history })
{
	const hash =
		history.location.hash;

	const [tab, setTab] =
		useState(history.location.hash === "#favorites" ? "favorites" : "browse");

	const [category, setCategory] =
		useState("typography");

	const handleChangeTab = (tab) =>
	{
		setTab(tab);

		history.replace("/#" + tab);

	}

    const handleChangeCategory = (event) =>
	{
		setCategory(event.currentTarget.dataset.category);

    }

	return (
		<Fragment>
			<Head
				title = "Google Books Api"

			/>
			{
				hash && (hash !== "#browse" && hash !== "#favorites")
					?
						<PageNotFound />

					:
						<Fragment>
							<DrawerMenu />
							<div className="app">
								<Header
									tab				 = { tab }
									category		 = { category }
									onChangeTab 	 = { handleChangeTab }
									onChangeCategory = { handleChangeCategory }

								/>
								<Main
									tab		 = { tab }
									category = { category }

								/>
							</div>
						</Fragment>

			}
		</Fragment>

	);

}

export default List;