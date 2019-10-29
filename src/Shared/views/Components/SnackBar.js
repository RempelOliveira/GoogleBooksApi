import React, { useState, useEffect } from "react";

import { Snackbar, Slide } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SnackBar({ index, type = "info", message })
{
	const [isOpen, setIsOpen] =
		useState(false);

	const [icon, setIcon] =
		useState("");

	useEffect(() =>
	{
		if(message !== "")
		{
			if(type === "success")
				setIcon("check-circle");

			if(type === "warning")
				setIcon("exclamation-triangle");

			if(type === "danger")
				setIcon("exclamation-circle");

			setIsOpen(true);

		}

	}, [message, type, index]);

	return (
		<Snackbar
			key					= { index }
			open    			= { isOpen }
			className			= { "snackbar-" + type }
			autoHideDuration	= { 5000 }
			TransitionComponent = { Slide }
			anchorOrigin		= {{ vertical: "bottom", horizontal: "center" }}
			onClose				= { () => setIsOpen(false) }
			message 			=
			{
				<span className="snackbar-message">
					{ !icon || <FontAwesomeIcon icon = {["fas", icon]} /> } <span dangerouslySetInnerHTML={{ __html: (type === "success" ? "Success! " : (type === "warning" ? "Warning! " : (type === "danger" ? "Error! " : ""))) + message }} />
				</span>

			}

		/>

	);

}

export default SnackBar;