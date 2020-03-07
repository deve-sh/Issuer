import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SettingsUI from "../../presentational/Settings";

import constants from "../../../constants";

const Settings = props => {
	const state = useSelector(state => state);
	const [showNameModal, setshowNameModal] = useState(false);
	const [showPassModal, setshowPassModal] = useState(false);

	useEffect(() => {
		document.title = constants.APPNAME + " - Settings";
		return () => (document.title = constants.APPNAME);
	}, []);

	const togglePassModal = () => setshowPassModal(show => !show);
	const toggleNameModal = () => setshowNameModal(show => !show);

	return (
		<SettingsUI
			// Modal Boxes
			showPassModal={showPassModal}
			showNameModal={showNameModal}
			toggleNameModal={toggleNameModal}
			togglePassModal={togglePassModal}
			// User Details
			name={state.name}
			email={state.email}
			department={state.department}
			institute={state.institute}
		/>
	);
};

export default Settings;
