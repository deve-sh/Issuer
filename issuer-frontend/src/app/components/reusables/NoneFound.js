// Custom No Entries Found Component

import React from "react";
import Icon from "./Icon";

const NoneFound = props => {
	return (
		// This shares the styles with the loader component.
		<div className={"loader"}>
			<Icon className={"fas fa-folder-open fa-3x"} />
			<div className={"loader-text"}>
				{props.children ? props.children : "None Found."}
			</div>
		</div>
	);
};

export default NoneFound;
