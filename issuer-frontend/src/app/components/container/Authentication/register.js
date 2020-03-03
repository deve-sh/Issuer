import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Image from "../../reusables/Image";
import Input from "../../reusables/Input";
import Button from "../../reusables/Button";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";

import { register } from "../../../API/Users";

// Images

import formsImage from "../../../files/forms.svg";

const Register = props => {
	const state = useSelector(state => state);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [name, setname] = useState("");
	const [phone, setphone] = useState("");
	const [loading, setloading] = useState(false);
	const [department, setdepartment] = useState(
		state.institute ? state.institute.departments[0] : ""
	);

	useEffect(() => {
		document.title = constants.APPNAME + " - Register";

		return () => (document.title = constants.APPNAME);
	}, []);

	const registerUser = event => {
		event.preventDefault();
		setloading(true);
		let payLoad = {
			institute: state.institute ? state.institute._id : null,
			email,
			password,
			name,
			phone,
			department
		};

		register(payLoad, err => toasts.generateError(err))
			.then(res => {
				if (res && res.data && res.data.message && res.status === 201) {
					toasts.generateSuccess(res.data.message);

					// Clearing Inputs
					setname("");
					setemail("");
					setpassword("");
					setphone("");
				}
			})
			.then(() => setloading(false));
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
							value={email}
							placeholder={"abc@xyz.com"}
							onChange={e => setemail(e.target.value)}
							required={true}
							disabled={loading}
						/>
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
						<br />
						<label>Name</label>
						<Input
							className={"form-control"}
							type={"text"}
							placeholder={"John Doe"}
							value={name}
							onChange={e => setname(e.target.value)}
							required={true}
							disabled={loading}
						/>
						<br />
						<label>Phone</label>
						<Input
							className={"form-control"}
							type={"tel"}
							placeholder={"+91-1234567890"}
							value={phone}
							onChange={e => setphone(e.target.value)}
							required={true}
							disabled={loading}
						/>
						<br />
						<label>Department</label>
						<select
							className={"form-control"}
							required={true}
							onChange={e => setdepartment(e.target.value)}
							disabled={loading}
						>
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
								disabled={loading}
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
