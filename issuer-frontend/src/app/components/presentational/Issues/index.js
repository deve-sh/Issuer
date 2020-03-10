import React from "react";

import Loader from "../../reusables/Loader";
import Button from "../../reusables/Button";
import Icon from "../../reusables/Icon";
import Modal from "../../reusables/Modal";
import Input from "../../reusables/Input";
import NoneFound from "../../reusables/NoneFound";
import Ender from "../../reusables/Ender";

import issuesConstants from "../../../constants/issuesConstants";

const IssuesUI = props => {
	return (
		<div className={"issues-container"}>
			{!props.isAdmin &&
			!props.isHead &&
			props.isApproved &&
			props.showIssueModal ? (
				<Modal
					heading={issuesConstants.CREATEISSUE}
					toggleModal={props.toggleIssueModal}
					className={"lengthymodal"}
				>
					<form onSubmit={props.issueCreator}>
						<label>{issuesConstants.ISSUENAME}</label>
						<Input
							className={"form-control"}
							value={props.issueName}
							placeholder={issuesConstants.ISSUENAMEPH}
							onChange={e => props.setissueName(e.target.value)}
						/>
						<br />
						<label>{issuesConstants.ISSUEDESC}</label>
						<textarea
							className={"form-control issues-textarea"}
							value={props.issueDesc}
							onChange={e => props.setissueDesc(e.target.value)}
							placeholder={issuesConstants.ISSUEDESCPH}
						/>
						<br />
						<label>{issuesConstants.ISSUECATEGORY}</label>
						<br />
						<select
							className={"form-control"}
							value={props.issueCategory}
							onChange={e =>
								props.setissueCategory(e.target.value)
							}
						>
							{props.categories.map((category, index) => (
								<option value={index}>{category.name}</option>
							))}
							<option value={props.categories.length}>
								Others
							</option>
						</select>
						{props.issueCategory === props.categories.length ? (
							<React.Fragment>
								<br />
								<label>{issuesConstants.OTHERREASON}</label>
								<Input
									className={"form-control"}
									value={props.otherReason}
									onChange={e =>
										props.setotherReason(e.target.value)
									}
									placeholder={issuesConstants.OTHERREASONPH}
								/>
							</React.Fragment>
						) : (
							""
						)}
						<br />
						<Button
							className={"btn btn-success"}
							label={"Create"}
							title={issuesConstants.CREATEISSUE}
							type={"submit"}
						/>
						&nbsp;&nbsp;
						<a
							href={"#"}
							className={"btn accessibility"}
							onClick={e => {
								e.preventDefault();
								props.toggleIssueModal();
							}}
						>
							Cancel
						</a>
					</form>
				</Modal>
			) : (
				""
			)}
			<div className={"fixedcontainer"}>
				{!props.isAdmin && !props.isHead && props.isApproved ? (
					<Button
						className={"issues-toggler"}
						title={issuesConstants.CREATEISSUE}
						onClick={e => props.toggleIssueModal()}
					>
						<Icon className={"fas fa-plus fa-lg"} />
					</Button>
				) : (
					""
				)}
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
