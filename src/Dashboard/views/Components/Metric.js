import React from "react"

function Metric({ name, value })
{
	return (
		<div className="metric">
			<div className="value-name">
				<h1 className="value">
					{ value }
				</h1>
				<h2 className="name">
					{ name }
				</h2>
			</div>
		</div>

	);

}

export default Metric;