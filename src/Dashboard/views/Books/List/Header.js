import React, { useState, useEffect, useCallback }  from "react";
import { useSelector, useDispatch } from "react-redux";

import shortid from "shortid";
import IndianaDragScroll from "react-indiana-drag-scroll";

import { List as Categories } from "../../../../Shared/actions/Categories";

function Header({ category, onChangeCategory })
{
	const [width, setWidth] =
		useState(window.innerWidth);

	const [sticky, setSticky] =
		useState(false);

	const dispatch =
		useDispatch();

	const categories =
		useSelector(state => state.Categories.data);

	const handleResize = () =>
	{
		setWidth(
			window.innerWidth

		);

	};

	const handleScroll = useCallback(() =>
	{
		setSticky(
			width < 302
				? !(window.pageYOffset <= 39) : (width < 320 ? !(window.pageYOffset <= 51) : (width < 425 ? !(window.pageYOffset <= 51) : !(window.pageYOffset <= 63)))

		);

	}, [width]);

	useEffect(() =>
	{
		dispatch(
			Categories(category)

		);

	}, [category, dispatch]);

	useEffect(() =>
	{
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return (() =>
		{
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScroll);

		});

	}, [handleScroll]);

	return (
		<header id="header" className={ sticky ? "sticky" : "" }>
			<nav>
				<ul>
					<li className={ "active" }>
						<button
							type    = "button"
							onClick = { () => {} }

						>
							Books
						</button>
					</li>
				</ul>
			</nav>
			<menu>
				<IndianaDragScroll vertical={ false }>
					<ul>
						{
							!categories || 
								categories.map((item) =>
								{
									return (
										<li
											key 	  = { shortid.generate() }
											className = { category === item.id ? "active" : "" }

										>
											<button
												type 		  = "button"
												data-category = { item.id }
												onClick 	  = { onChangeCategory }

											>
												{ item.name }
											</button>
										</li>

									);

								})

						}
					</ul>
				</IndianaDragScroll>
			</menu>
		</header>

	);

}

export default Header;