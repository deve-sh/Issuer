import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Image from "../../reusables/Image";
import Input from "../../reusables/Input";
import Button from "../../reusables/Button";

import constants from "../../../constants";

// Images

import formsImage from "../../../files/forms.svg";

const Register = props => {
	const state = useSelector(state => state);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [name, setname] = useState("");
	const [phone, setphone] = useState("");

	useEffect(() => {
		document.title = constants.APPNAME + " - Register";

		return () => (document.title = constants.APPNAME);
	}, []);

	const registerUser = event => {
		event.preventDefault();
	};

	return (
		<div className={"authpage register"}>
			<div className={"fixedcontainer row aligncenter"}>
				<div className={"col-sm-7"}>
					<form className={"authform"} onSubmit={registerUser}>
						<div className={"heading extraweight"}>Register</div>
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
						<label>Name</label>
						<Input
							className={"form-control"}
							type={"text"}
							placeholder={"John Doe"}
							onChange={e => setname(e.target.value)}
							required={true}
						/>
						<br />
						<label>Phone</label>
						<Input
							className={"form-control"}
							type={"tel"}
							placeholder={"+91-1234567890"}
							onChange={e => setphone(e.target.value)}
							required={true}
						/>
						<br />
						<label>Department</label>
						<select className={"form-control"} required={true}>
							{state.institute && state.institute.departments
								? state.institute.departments.map(
										(department, index) => (
											<option
												key={index}
												value={department}
											>
												{department}
											</option>
										)
								  )
								: ""}
						</select>
						<br />
						<div className={"buttoncontainer"}>
							<Button
								className={"btn btn-primary"}
								label={"Register"}
								title={"Register"}
							/>
							&nbsp;&nbsp;
							<Link className={"btn"} title={"Register"} to={"/"}>
								Cancel
							</Link>
						</div>
						<hr className={"sectionseparator"} />
						<div className={"alternatemessage"}>
							Already a user? <Link to={"/login"}>Login</Link>.
						</div>
					</form>
				</div>
				<div className={"col-sm-5 imagecolumn"}>
					<Image className={"resimage"} src={formsImage} />
				</div>
			</div>
		</div>
	);
};

export default Register;
