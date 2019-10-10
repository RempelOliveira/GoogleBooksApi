import React, { useState, useEffect, useCallback } from "react";
import { isMobile } from "react-device-detect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Share({ book, opened, onClickShare })
{
	const [height, setHeight] =
		useState(0);

	const [isVisible, setIsVisible] =
		useState(false);

	const objRef =
		React.createRef();

	const shareText = 
		"What's up man?%0D%0A%0D%0AI found an amazing book and I think you'll like it!%0D%0A%0D%0AVisit the link below to see it.%0D%0A%0D%0A" + window.location.href;

	const handleResize = useCallback(() =>
	{
		setHeight(
			objRef.current.offsetHeight

		);

	}, [objRef]);

	useEffect(() =>
	{
		if(!isVisible)
			setTimeout(() => setIsVisible(true), 500);

		handleResize();

		window.addEventListener(
			"resize", handleResize);

		return () =>
		{
			window.removeEventListener(
				"resize", handleResize);

		};

	}, [isVisible, handleResize]);

	return (
		<div id="share" ref={ objRef } className={ opened ? "opened" : "" } style={{ visibility: (isVisible ? "visible" : "hidden"), bottom: opened ? 0 : "-" + (height + 50) + "px" }}>
			<header>
				<nav>
					<ul>
						<li>
							<h1 className="title">Share via</h1>
						</li>
						<li>
							<button
								className = "close"
								onClick   = { onClickShare }

							>
								<FontAwesomeIcon icon = {["fas", "times"]} />
							</button>
						</li>
					</ul>
				</nav>
			</header>
			<aside>
				<div className="columns is-mobile">
					<div className="column">
						<div className="item">
							<a
								href 	  = { "mailto:?subject=Google Books Api - " + book.title + "&body=" + shareText + "%0D%0A%0D%0A"}
								className = "email"

							>
								<FontAwesomeIcon icon = {["fas", "envelope-open-text"]} />
								<span>E-mail</span>
							</a>
						</div>
					</div>
					<div className="column">
						<div className="item">
							<a
								href	  = { "https://" + (isMobile ? "api" : "web") + ".whatsapp.com/send?text=" + shareText }
								target	  = { isMobile ? "_self" : "_blank" }
								className = "whatsapp"

							>
								<FontAwesomeIcon icon = {["fab", "whatsapp"]} />
								<span>WhatsApp</span>
							</a>
						</div>
					</div>
					<div className="column">
						<div className="item">
							<a
								href 	  = { "https://web.skype.com/share?url=" + window.location.href + "&source=button" }
								target	  = { "_blank" }
								className = "skype"

							>
								<FontAwesomeIcon icon = {["fab", "skype"]} />
								<span>Skype</span>
							</a>
						</div>
					</div>
				</div>
			</aside>
			<div className="overlay"></div>
		</div>

	);

}

export default Share;