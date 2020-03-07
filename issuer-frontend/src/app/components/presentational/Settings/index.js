import React from "react";

import constants from "../../../constants";
import settingsConstants from "../../../constants/settingsConstants";

import Button from "../../reusables/Button";
import Icon from "../../reusables/Icon";

const SettingsUI = props => {
	return (
		<div className={"settingsui"}>
			<div className={"fixedcontainer"}>
				<div className={"heading extraweight"}>
					{settingsConstants.PROFILESETTINGS}
				</div>
				<div className={"row profilesettings"}>
					<div className={"col-md-3 profilepicture"}>
						{/* If later need be, add profile picture here. */}
						<Icon
							className={"fas fa-user-circle fa-7x"}
							title={props.name}
						/>
					</div>
					<div className={"col-md-9 profileoptions"}>
						<div className={"userdetails"}>
							<div className={"username"}>{props.name}</div>
							<div className={"usermail"}>{props.email}</div>
							<div className={"userinstitute"}>
								{props.institute.name}
							</div>
							<div className={"userdepartment"}>
								{props.department}
							</div>
						</div>
						<div className={"useroptions"}>
							{/*<React.Fragment><Button
								className={"btn btn-info"}
								title={settingsConstants.UPDATENAME}
								onClick={props.toggleNameModal}
							>
								{settingsConstants.UPDATENAME}
							</Button>&nbsp;&nbsp;</React.Fragemnt>*/""}
							<Button
								className={"btn btn-dark"}
								title={settingsConstants.UPDATEPASS}
								onClick={props.togglePassModal}
							>
								{settingsConstants.UPDATEPASS}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsUI;
