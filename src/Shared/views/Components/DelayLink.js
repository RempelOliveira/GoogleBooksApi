import React from "react";
import { Link, withRouter } from "react-router-dom";

function DelayLink({ to, delay = 0, className, replace, onClick, children, history })
{
	const handleClick = (event) =>
	{
		event.preventDefault();

		onClick();

		setTimeout(() =>
		{
			if(replace)
			{
				history.replace(to);

			}
			else
				history.push(to);

		}, delay);

	}

	return (
		<Link 
			to 		  = { to }
			className = { className }
			onClick   = { handleClick }

		>
			{ children }
		</Link>

	)

}

export default withRouter(DelayLink);