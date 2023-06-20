import React from "react";
import Typography from "../../../Components/Typography";
import { Row, message, Input, Progress, notification, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import programSchema, { initVals } from "../Add/Constants";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
import {
	getAllWorkoutCategories,
	getAllWorkouts,
	addWorkout,
} from "../../../Helpers/firebase";
import "./index.css";
import DayEdit from "../Add/DayEdit";
import NewCategoryModal from "../NewCategoryModal";
import SpinnerComponent from "../../../Components/SpinnerComponent";
const { TextArea } = Input;

const CloneWorkoutContainer = (props) => {
	let { id } = useParams();
	const [addingUser, setAddingUser] = React.useState(false);
	const navigate = useNavigate();
	const [basicDetailMedia, setBasicDetailMedia] = React.useState(null);
	const [basicDetailMediaOneError, setBasicDetailMediaError] =
		React.useState(false);
	const [progressPercent, setProgressPercent] = React.useState(0);
	const [activeData, setActiveData] = React.useState(null);
	const [data, setData] = React.useState(null);
	const [categoryListing, setCategoryListing] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const addProgramToList = async (values) => {
		if (!basicDetailMedia) {
			message.error("Please add an Image for Basic Details!");
			setBasicDetailMediaError(true);
			return;
		}
		setBasicDetailMediaError(false);
		setAddingUser(true);
		setProgressPercent(25);
		// values.id = activeData.id;
		values.basicDetailMedia = basicDetailMedia ? basicDetailMedia : "";
		values.exercises = data;
		setProgressPercent(50);
		if (await addWorkout(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Your changes have been saved!`,
				description: ``, //`${values.name}  has been successfully updated`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setAddingUser(false);
					navigate(-1);
				},
			});
			return;
		} else {
			notification.error({
				message: `Failed to add!`,
				description: `Give it a try later.`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setAddingUser(false);
				},
			});
		}
	};
	React.useLayoutEffect(() => {
		if (id && activeData === null) {
			fetchList();
		}
		(async function () {
			const rsp = await getAllWorkoutCategories();
			setCategoryListing(rsp);
		})();
	}, [id, open]);

	async function fetchList() {
		const workoutList = await getAllWorkouts();
		let foundData = workoutList.find((itm) => itm.id === id);
		if (foundData) {
			setActiveData(foundData);
		}
		foundData.name += " duplicate";
		setBasicDetailMedia(foundData.basicDetailMedia);
		setData(foundData.exercises);
	}

	return activeData ? (
		<Formik
			initialValues={activeData}
			validationSchema={programSchema}
			onSubmit={addProgramToList}
			enableReinitialize
		>
			{({
				errors,
				touched,
				values,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<div className="containerForAdd">
					<div className="rowing">
						<div />
						{addingUser ? (
							<Progress type="circle" percent={progressPercent} />
						) : (
							<div className="rowing">
								<span
									className="draftBtn"
									style={{ backgroundColor: "#222222" }}
									onClick={() => navigate(-1)}
								>
									Cancel
								</span>
								<span
									className="savebtn"
									onClick={() => {
										handleSubmit();
										if (Object.keys(errors).length !== 0) {
											console.log("erros", errors);
											notification.error({
												message: `Please add all the required fields`,
												// description: `Give it a try later.`,
												placement: "topRight",
												duration: 2,
												onClose: function () {},
											});
										}
									}}
								>
									Save
								</span>
							</div>
						)}
					</div>
					{open && <NewCategoryModal {...{ open, setOpen }} />}
					<div className="cardAdditionBlog">
						<Row style={{ paddingLeft: 47 }}>
							<Col xs={24} sm={24} md={24} lg={12} xl={13}>
								<span className="tableTitle">Basic Detail</span>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} xl={11}>
								<span className="tableTitle">Upload a Media</span>
							</Col>
						</Row>
						<div className="barVertical" />
						<div style={{ paddingLeft: 47 }}>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
									<div className="colStart">
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">WORKOUT NAME</span>
											<div style={{ marginTop: 10 }}>
												<input
													className="addBlogInput inputText"
													type={"text"}
													name="name"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.name}
												/>
												{errors.name && touched.name ? (
													<Typography
														alignment="left"
														title={errors.name}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : (
													""
												)}
											</div>
										</div>
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">SUBTITLE</span>
											<div style={{ marginTop: 10 }}>
												<input
													className="addBlogInput inputText"
													type={"text"}
													name="subtitle"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.subtitle}
												/>
												{errors.subtitle && touched.subtitle ? (
													<Typography
														alignment="left"
														title={errors.subtitle}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : (
													""
												)}
											</div>
										</div>
									</div>
									<div className="flexStart mb30">
										<span>
											<span className="addBlogInputLabel">CATEGORY</span>
											<span
												className="newCategorybtn"
												onClick={() => {
													setOpen(true);
												}}
											>
												Add new category
											</span>
										</span>
										<div style={{ marginTop: 10 }}>
											<select
												name="category"
												id="category"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.category}
												className="addBlogInput inputText"
											>
												<option value="default" selected={true} disabled={true}>
													Select Category
												</option>
												{categoryListing.map((item) => (
													<option value={item.name}>{item.name}</option>
												))}
											</select>

											{errors.category && (
												<Typography
													alignment="left"
													title={errors.category}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											)}
										</div>
									</div>
								</Col>
								<Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={2} />
								<Col xs={24} sm={24} md={24} lg={11} xl={11} xxl={11}>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
										}}
									>
										{basicDetailMedia ? (
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<img
													src={basicDetailMedia}
													alt="UserImage"
													style={{
														width: 250,
														height: 250,
														borderRadius: 6,
													}}
												/>
												<div
													className="centerAligner"
													style={{
														width: 15,
														height: 15,
														borderRadius: "50%",
														backgroundColor: "#fff",
														marginLeft: -10,
														marginTop: -20,
														boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
														cursor: "pointer",
														border: "1px solid #000",
													}}
													onClick={() => setBasicDetailMedia("")}
												>
													<CloseOutlined
														style={{ fontSize: 8, color: primaryColor }}
													/>
												</div>
											</div>
										) : (
											<EmployeeDropZone
												{...{
													setImageUrl: setBasicDetailMedia,
													small: false,
												}}
											/>
										)}
										{basicDetailMediaOneError && (
											<Typography
												alignment="left"
												title={"Please add an image"}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										)}
									</div>
									<div className="flexStart mb30" style={{ marginTop: 27 }}>
										<span className="addBlogInputLabel">STATUS</span>
										<div style={{ marginTop: 10 }}>
											<select
												name="status"
												id="category"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.status}
												className="addBlogInput inputText"
												style={{
													background:
														values.status === "Active"
															? "#5DB135"
															: values.status === "Pending"
															? "#E2BB2E"
															: values.status === "Draft"
															? "#7D7D7D"
															: "#F4F4F4",
													color:
														values.status === "Active" ||
														values.status === "Pending" ||
														values.status === "Draft"
															? "#fff"
															: "#000000",
													paddingRight: 50,
													borderRight: "16px solid transparent",
												}}
											>
												<option value="" selected={true} disabled={true}>
													Select Status
												</option>
												<option value="Active">Active</option>
												<option value="Pending">Pending</option>
												<option value="Draft">Draft</option>
											</select>
											{errors.status && (
												<Typography
													alignment="left"
													title={errors.status}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											)}
										</div>
									</div>
								</Col>
							</Row>
						</div>
						<br />
						<br />
						<div className="flexStart mb30" style={{ paddingLeft: 47 }}>
							<span className="addBlogInputLabel">DESCRIPTION</span>
							<div style={{ marginTop: 10 }}>
								<TextArea
									autoSize={{
										minRows: 12,
										maxRows: 12,
									}}
									placeholder="Enter Description"
									maxLength={500}
									showCount
									className="addBlogInput overViewDescription"
									name="description"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.description}
									style={{
										width: "100%",
										display: "flex",
										height: 300,
										backgroundColor: "#F4F4F4",
									}}
								/>
								{errors.description && (
									<Typography
										alignment="left"
										title={errors.description}
										fontFamily="Gilroy-Medium"
										color="red"
										type="label"
									/>
								)}
							</div>
						</div>
						<br />
						<br /> <br />
						{data && <DayEdit {...{ data, setData }} />}
					</div>
				</div>
			)}
		</Formik>
	) : (
		<SpinnerComponent />
	);
};
export default CloneWorkoutContainer;
