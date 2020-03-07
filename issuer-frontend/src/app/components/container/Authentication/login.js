import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Image from "../../reusables/Image";
import Input from "../../reusables/Input";
import Button from "../../reusables/Button";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";
import authConstants from "../../../constants/authConstants";

import { login, sendResetRequest } from "../../../API/Users";
import { loginUser } from "../../../store/actionCreators";

// Images

import identityImage from "../../../files/identity.svg";

const Login = props => {
	const dispatch = useDispatch();
	const state = useSelector(state => state);
	const [ismounted, setismounted] = useState(true);
	const [authMode, setauthMode] = useState(authConstants.LOGINMODE);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [loading, setloading] = useState(false);

	useEffect(() => {
		document.title = constants.APPNAME + " - Login";

		return () => {
			document.title = constants.APPNAME;
			setismounted(false);
		};
	}, []);

	const switchMode = () => {
		setauthMode(mode => {
			if (mode === authConstants.LOGINMODE)
				return authConstants.FORGOTPASSMODE;
			else return authConstants.LOGINMODE;
		});
	};

	const userLogin = event => {
		event.preventDefault();
		setloading(true);
		if (authMode === authConstants.LOGINMODE) {
			// Log user in.
			let payLoad = {
				email,
				password,
				institute: state.institute ? state.institute._id : null
			};

			login(payLoad, err => toasts.generateError(err))
				.then(res => {
					if (res && res.data && res.data.token) {
						// Dispatch login for user.
						if (ismounted) {
							localStorage.setItem(
								constants.AUTHTOKEN,
								res.data.token
							);
							dispatch(loginUser(res.data));
						}
					}
					else setloading(false);
				})
		} else {
			// Forgot Password
			if (email) {
				sendResetRequest(email, err => toasts.generateError(err))
					.then(res => {
						if (res && res.status === 200 && res.data)
							toasts.generateSuccess(res.data.message);
					})
					.then(() => setloading(false));
			}
		}
	};

	return (
		<div className={"authpage login"}>
			<div className={"fixedcontainer row aligncenter"}>
				<div className={"col-sm-7"}>
					<form className={"authform"} onSubmit={userLogin}>
						<div className={"heading extraweight"}>
							{authMode === authConstants.LOGINMODE
								? authConstants.LOGIN
								: authConstants.FORGOTPASS}
						</div>
						<label>Email or Phone</label>
						<Input
							className={"form-control"}
							type={"text"}
							value={email}
							placeholder={"abc@xyz.com / +91-1234567890"}
							onChange={e => setemail(e.target.value)}
							required={true}
							disabled={loading}
						/>
						{authMode === authConstants.LOGINMODE ? (
							<React.Fragment>
								<br />
								<label>Password</label>
								<Input
									className={"form-control"}
									type={"password"}
									value={password}
									placeholder={"Enter Your Password"}
									onChange={e => setpassword(e.target.value)}
									required={true}
									disabled={loading}
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
								disabled={loading}
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
