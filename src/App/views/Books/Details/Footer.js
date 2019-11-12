import React from "react";

function Footer({ url, price })
{
	return (
		<footer id="footer">
			<span>R$ { price }</span>
			<a
				href   = { url }
				target = "_blank"
				rel	   = "noopener noreferrer"

			>
				BUY NOW
			</a>
		</footer>

	);

}

export default Footer;