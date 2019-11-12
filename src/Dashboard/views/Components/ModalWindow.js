import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalWindow({ opened = false, content, onChangeModal })
{
	const [isActive, setIsActive] =
		useState(false);

	const handleOnClick = () =>
	{
		setIsActive(
			false

		);

		setTimeout(() => { onChangeModal(); }, 450);

	};

	useEffect(() =>
	{
		setIsActive(opened);

	}, [opened]);

	return (
		<div id="modal" className={ opened && isActive ? "opened" : "" }>
			<div className="close">
				<button
					type 	= "button"
					onClick = { handleOnClick }

				>
					<FontAwesomeIcon icon = {["fa", "times-circle"]} />
				</button>
			</div>
			<div className="content">
				{ content }
			</div>
		</div>

	);

}

export default ModalWindow;