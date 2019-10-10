import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function CircularProgressLoader({ isRelative, isCovered })
{
	return (
		<div className={ "loader" + (isRelative ? " infinite-scroll" : "") + (isCovered ? " covered" : "") }>
			<CircularProgress color="primary" />
		</div>

	);

}

export default CircularProgressLoader;