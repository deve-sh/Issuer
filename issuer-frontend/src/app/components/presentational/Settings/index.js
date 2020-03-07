import React from "react";

import constants from "../../../constants";
import settingsConstants from "../../../constants/settingsConstants";

import Button from "../../reusables/Button";
import Icon from "../../reusables/Icon";
import Modal from "../../reusables/Modal";
import Input from "../../reusables/Input";

const SettingsUI = props => {
	return (
		<React.Fragment>
			{props.showPassModal ? (
				<Modal
					heading={settingsConstants.UPDATEPASS}
					toggleModal={props.togglePassModal}
				>
					<form onSubmit={props.updatePass} className={"contents"}>
						<Input
							type={"password"}
							placeholder={settingsConstants.PASSPLACEHOLDER1}
							title={settingsConstants.PASSPLACEHOLDER1}
							value={props.passToUpdate1}
							className={"form-control"}
							autoFocus={true}
							required={true}
							onChange={e =>
								props.setpassToUpdate1(e.target.value)
							}
						/>
						<br />
						<Input
							type={"password"}
							placeholder={settingsConstants.PASSPLACEHOLDER2}
							title={settingsConstants.PASSPLACEHOLDER2}
							value={props.passToUpdate2}
							className={"form-control"}
							required={true}
							onChange={e =>
								props.setpassToUpdate2(e.target.value)
							}
						/>
						<br />
						<Button
							type={"submit"}
							title={settingsConstants.UPDATEPASS}
							label={settingsConstants.UPDATEPASS}
							className={"btn btn-primary"}
						/>
						&nbsp;&nbsp;
						<a
							href={"#"}
							className={"btn accessibility"}
							onClick={e => {
								e.preventDefault();
								props.togglePassModal();
							}}
						>
							Cancel
						</a>
					</form>
				</Modal>
			) : (
				""
			)}
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
								{
									/*<React.Fragment><Button
								className={"btn btn-info"}
								title={settingsConstants.UPDATENAME}
								onClick={props.toggleNameModal}
							>
								{settingsConstants.UPDATENAME}
							</Button>&nbsp;&nbsp;</React.Fragemnt>*/ ""
								}
								<Button
									className={"btn btn-info"}
									title={settingsConstants.UPDATEPASS}
									onClick={props.togglePassModal}
								>
									<React.Fragment>
										<Icon className={"fas fa-key"} />
										{" "}{settingsConstants.UPDATEPASS}
									</React.Fragment>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SettingsUI;
