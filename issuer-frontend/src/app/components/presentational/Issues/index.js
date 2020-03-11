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
							required={true}
							value={props.issueName}
							placeholder={issuesConstants.ISSUENAMEPH}
							onChange={e => props.setissueName(e.target.value)}
						/>
						<br />
						<label>{issuesConstants.ISSUEDESC}</label>
						<textarea
							className={"form-control issues-textarea"}
							value={props.issueDesc}
							required={true}
							onChange={e => props.setissueDesc(e.target.value)}
							placeholder={issuesConstants.ISSUEDESCPH}
						/>
						<br />
						<label>{issuesConstants.ISSUECATEGORY}</label>
						<br />
						<select
							className={"form-control"}
							required={true}
							value={props.issueCategory}
							onChange={e =>
								props.setissueCategory(e.target.value)
							}
						>
							{props.categories.map((category, index) => (
								<option value={index} key={index}>
									{category.name}
								</option>
							))}
							<option value={props.categories.length}>
								Others
							</option>
						</select>
						{props.issueCategory >= props.categories.length ? (
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
			{props.showCategoryModal &&
			(props.isAdmin || props.isHead) &&
			props.isApproved ? (
				<Modal
					heading={issuesConstants.ADDCATEGORY}
					toggleModal={props.toggleCategoryModal}
				>
					<form onSubmit={props.categoryCreator}>
						<Input
							type={"text"}
							placeholder={issuesConstants.CATEGORYNAME}
							required={true}
							value={props.categoryName}
							onChange={e =>
								props.setcategoryName(e.target.value)
							}
							className={"form-control"}
							disabled={props.working}
						/>
						<br />
						<Button
							className={"btn btn-success"}
							label={"Submit"}
							title={issuesConstants.ADDCATEGORY}
							type={"submit"}
							disabled={props.working}
						/>
						&nbsp;&nbsp;
						<a
							href={"#"}
							className={"btn accessibility"}
							disabled={props.working}
							onClick={e => {
								e.preventDefault();
								props.toggleCategoryModal();
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
						<div className={"issues-categoryselector row"}>
							<div className={"column col-sm-3"}>
								{issuesConstants.FILTER} :{" "}
							</div>
							<div className={"column col-sm-6"}>
								<select
									className={"form-control"}
									value={props.activeCategory}
									onChange={e =>
										props.setactiveCategory(e.target.value)
									}
								>
									<option value={0}>All</option>
									{props.categories
										? props.categories.map(
												(category, index) => (
													<option
														key={index}
														value={index + 1}
													>
														{category.name}
													</option>
												)
										  )
										: ""}
									<option value={props.categories.length + 1}>
										Others
									</option>
								</select>
							</div>
							{props.isAdmin &&
							props.isApproved &&
							props.isHead ? (
								<div
									className={
										"column col-sm-3 buttoncontainer"
									}
								>
									<Button
										className={"btn btn-info"}
										title={issuesConstants.ADDCATEGORY}
										onClick={props.toggleCategoryModal}
									>
										<Icon className={"fas fa-plus"} />
										&nbsp;
										{issuesConstants.ADDCATEGORY}
									</Button>
								</div>
							) : (
								""
							)}
						</div>
						<br />
						{props.issuesList && props.issuesList.length > 0 ? (
							props.issuesList.map((issue, index) => (
								<div className={"issue row"} key={index}>
									<div className={`issue-info`}>
										<Button
											className={
												"accessibility issue-info-heading"
											}
											label={issue.name}
										/>
										<div className={"issue-info-desc"}>
											{issue.desc.length > 100
												? issue.desc.slice(0, 99) +
												  " ..."
												: issue.desc}
										</div>
										<div className={"issue-info-createdat"}>
											<Icon className={"fas fa-clock"} />
											&nbsp;&nbsp;
											{new Date(
												issue.createdOn
											).toDateString() +
												" - " +
												new Date(
													issue.createdOn
												).toLocaleTimeString()}
										</div>
									</div>
									<div className={`issue-info-options`}></div>
								</div>
							))
						) : (
							<NoneFound>{`No ${props.activePane} belonging to the category found.`}</NoneFound>
						)}
					</React.Fragment>
				)}
				<Ender />
			</div>
		</div>
	);
};

export default IssuesUI;
