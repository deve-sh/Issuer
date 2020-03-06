import React, { useEffect } from 'react';
import constants from "../../../constants";

const Settings = props => {
	useEffect(() => {
		document.title = constants.APPNAME + " - Settings";

		return () => {document.title = constants.APPNAME;}
	}, []);
	return ("");
};

export default Settings;