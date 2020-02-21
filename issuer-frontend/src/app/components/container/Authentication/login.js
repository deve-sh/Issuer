import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Image from "../../reusables/Image";
import Input from "../../reusables/Input";
import Button from "../../reusables/Button";

import constants from "../../../constants";

// Images

import identityImage from "../../../files/identity.svg";

const Login = props => {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	useEffect(() => {
		document.title = constants.APPNAME + " - Login";

		return () => (document.title = constants.APPNAME);
	}, []);

	const loginUser = event => {
		event.preventDefault();
	};

	return (
		<div className={"authpage login"}>
			<div className={"fixedcontainer row aligncenter"}>
				<div className={"col-sm-7"}>
					<form className={"authform"} onSubmit={loginUser}>
						<div className={"heading extraweight"}>Login</div>
						<label>Email</label>
						<Input
							className={"form-control"}
							type={"email"}
							placeholder={"abc@xyz.com"}
							onChange={e => setemail(e.target.value)}
							required={true}
						/>
						<br />
						<label>Password</label>
						<Input
							className={"form-control"}
							type={"password"}
							placeholder={"Enter Your Password"}
							onChange={e => setpassword(e.target.value)}
							required={true}
						/>
						<br />
						<div className={"buttoncontainer"}>
							<Button
								className={"btn btn-primary"}
								type={"submit"}
								label={"Login"}
								title={"Login"}
							/>
							&nbsp;&nbsp;
							<Link className={"btn"} title={"Register"} to={"/"}>
								Cancel
							</Link>
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
