import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Image from "../../reusables/Image";
import Input from "../../reusables/Input";
import Button from "../../reusables/Button";

import constants from "../../../constants";
import authConstants from "../../../constants/authConstants";

// Images

import identityImage from "../../../files/identity.svg";

const Login = props => {
	const [authMode, setauthMode] = useState(authConstants.LOGINMODE);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	useEffect(() => {
		document.title = constants.APPNAME + " - Login";

		return () => (document.title = constants.APPNAME);
	}, []);

	const switchMode = () => {
		setauthMode(mode => {
			if (mode === authConstants.LOGINMODE)
				return authConstants.FORGOTPASSMODE;
			else return authConstants.LOGINMODE;
		});
	};

	const loginUser = event => {
		event.preventDefault();

		if (authMode === authConstants.LOGINMODE) {
			// Log user in.
		} else {
			// Forgot Password
		}
	};

	return (
		<div className={"authpage login"}>
			<div className={"fixedcontainer row aligncenter"}>
				<div className={"col-sm-7"}>
					<form className={"authform"} onSubmit={loginUser}>
						<div className={"heading extraweight"}>
							{authMode === authConstants.LOGINMODE
								? authConstants.LOGIN
								: authConstants.FORGOTPASS}
						</div>
						<label>Email</label>
						<Input
							className={"form-control"}
							type={"email"}
							placeholder={"abc@xyz.com"}
							onChange={e => setemail(e.target.value)}
							required={true}
						/>
						{authMode === authConstants.LOGINMODE ? (
							<React.Fragment>
								<br />
								<label>Password</label>
								<Input
									className={"form-control"}
									type={"password"}
									placeholder={"Enter Your Password"}
									onChange={e => setpassword(e.target.value)}
									required={true}
								/>
							</React.Fragment>
						) : (
							""
						)}
						<br />
						<div className={"buttoncontainer"}>
							<Button
								className={"btn btn-primary"}
								type={"submit"}
								label={
									authMode === authConstants.LOGINMODE
										? authConstants.LOGIN
										: authConstants.UPDATEPASS
								}
								title={
									authMode === authConstants.LOGINMODE
										? authConstants.LOGIN
										: authConstants.UPDATEPASS
								}
							/>
							&nbsp;&nbsp;
							<Link className={"btn"} title={"Cancel"} to={"/"}>
								Cancel
							</Link>
						</div>
						<br />
						<div className={"alternatemessage"}>
							<a
								href={"#"}
								onClick={e => {
									e.preventDefault();
									switchMode();
								}}
								className={"accessibility linkbutton"}
							>
								{authMode === authConstants.LOGINMODE
									? authConstants.FORGOTPASS
									: authConstants.LOGININSTEAD}
							</a>
						</div>
						<hr className={"sectionseparator"} />
						<div className={"alternatemessage"}>
							Not a user? <Link to={"/register"}>Register</Link>.
						</div>
					</form>
				</div>
				<div className={"col-sm-5 imagecolumn"}>
					<Image className={"resimage"} src={identityImage} />
				</div>
			</div>
		</div>
	);
};

export default Login;
