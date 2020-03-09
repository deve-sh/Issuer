import React from "react";

import Loader from "../../reusables/Loader";
import Button from "../../reusables/Button";
import Input from "../../reusables/Input";
import NoneFound from "../../reusables/NoneFound";
import Ender from "../../reusables/Ender";

import issuesConstants from "../../../constants/issuesConstants";

const IssuesUI = props => {
	return (
		<div className={"issues-container"}>
			<div className={"fixedcontainer"}>
				<div className={"heading extraweight"}>
					{issuesConstants.ISSUES}
				</div>
				{props.loading ? (
					<Loader />
				) : (
					<React.Fragment>
						<div className={"issues-paneswitcher"}>
							<label className="switch">
								<Input
									type="checkbox"
									onChange={e => {
										props.switchPane(
											e.target.checked
												? issuesConstants.RESOLVED
												: issuesConstants.UNRESOLVED
										);
									}}
									title={issuesConstants.SWITCH}
								/>
								<span className="slider round"></span>
							</label>
							<div className={"issues-paneswitcher-label"}>
								{issuesConstants.RESOLVED}
							</div>
						</div>
						<br />
						{props.issuesList && props.issuesList.length > 0 ? (
							props.issuesList.map((issue, index) => {
								"";
							})
						) : (
							<NoneFound>{`No ${props.activePane} found.`}</NoneFound>
						)}
					</React.Fragment>
				)}
				<Ender />
			</div>
		</div>
	);
};

export default IssuesUI;
