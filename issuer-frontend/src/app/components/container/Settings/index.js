import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SettingsUI from "../../presentational/Settings";

import constants from "../../../constants";
import settingsConstants from "../../../constants/settingsConstants";
import toasts from "../../../constants/toastConstants";

const Settings = props => {
	const state = useSelector(state => state);
	const [showNameModal, setshowNameModal] = useState(false);
	const [showPassModal, setshowPassModal] = useState(false);
	const [passToUpdate1, setpassToUpdate1] = useState("");
	const [passToUpdate2, setpassToUpdate2] = useState("");

	useEffect(() => {
		document.title = constants.APPNAME + " - Settings";
		return () => (document.title = constants.APPNAME);
	}, []);

	const togglePassModal = () => setshowPassModal(show => !show);
	const toggleNameModal = () => setshowNameModal(show => !show);

	const updatePass = event => {
		event.preventDefault();
		if (!passToUpdate1 || !passToUpdate2)
			toasts.generateError(settingsConstants.NOPASSFILLED);
		else if (passToUpdate1 !== passToUpdate2)
			toasts.generateError(settingsConstants.PASSESDONTMATCH);

		// Make the API Call
	};

	return (
		<SettingsUI
			// Modal Boxes
			showPassModal={showPassModal}
			showNameModal={showNameModal}
			toggleNameModal={toggleNameModal}
			togglePassModal={togglePassModal}
			passToUpdate1={passToUpdate1}
			passToUpdate2={passToUpdate2}
			setpassToUpdate1={setpassToUpdate1}
			setpassToUpdate2={setpassToUpdate2}
			updatePass={updatePass}
			// User Details
			name={state.name}
			email={state.email}
			department={state.department}
			institute={state.institute}
		/>
	);
};

export default Settings;
