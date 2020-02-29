import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

import constants from "../../../constants";
import toasts from "../../../constants/toastConstants";

import { setInstitute, setInstitutes } from "../../../store/actionCreators";

import { fetchInstitutes } from "../../../API/Institutes";

const SelectInstitute = props => {
	const dispatch = useDispatch();
	const state = useSelector(state => state);
	const { institute, isAuthenticated, hasFetchedInstitutes } = state;

	const [ismounted, setismounted] = useState(true);
	const [fetchedInstitutes, setfetchedInstitutes] = useState(null);

	useEffect(() => {
		if (localStorage.getItem(constants.INSTITUTE)) {
			dispatch(
				setInstitute(
					JSON.parse(localStorage.getItem(constants.INSTITUTE))
				)
			);
		} else if (!hasFetchedInstitutes) {
			fetchInstitutes(err => toasts.generateError(err)).then(res => {
				if (res && res.data && res.status === 200 && ismounted) {
					setfetchedInstitutes(res.data);
					dispatch(setInstitutes(res.data));
				}
			});
		}

		return () => setismounted(false);
	}, []);

	const selectInstitute = institute => {
		dispatch(setInstitute(institute));
		localStorage.setItem(constants.INSTITUTE, JSON.stringify(institute));
	};

	return institute ? (
		<Redirect to={"/home"} />
	) : (
		<div className={"institutepage"}>
			<div className={"fixedcontainer"}>
				<div className={"label"}>Select Your Institute :</div>
				<div className={"row institutelist"}>
					{fetchedInstitutes && Array.isArray(fetchedInstitutes) ? (
						fetchedInstitutes.map((institute, index) => (
							<div
								className={"col-12 option"}
								key={index}
								onClick={e => selectInstitute(institute)}
							>
								{institute.name}
							</div>
						))
					) : (
						<div className={"noinstitutes"}>No Institutes</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SelectInstitute;
