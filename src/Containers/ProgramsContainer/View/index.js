import React from "react";
import Typography from "../../../Components/Typography";
import "./index.css";
import {
	Input,
	Radio,
	// Select,
	InputNumber,
	message,
	Progress,
	notification,
	Row,
	Col,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import programSchema, { initVals } from "./Constants";
// import SpinnerComponent from "../../../Components/SpinnerComponent";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
import DaysTable from "../../../Components/DaysTable";
import DayEdit from "./DayEdit";
import {
	addProgram,
	getAllPrograms,
	updateProgram,
} from "../../../Helpers/firebase";
const { TextArea } = Input;
const ViewProgramContainer = (props) => {
	const navigate = useNavigate();
	let { id } = useParams();
	const [addingUser, setAddingUser] = React.useState(false);

	const [basicDetailMedia, setBasicDetailMedia] = React.useState(null);
	const [basicDetailMediaOneError, setBasicDetailMediaError] =
		React.useState(false);
	const [overviewMediaOne, setOverviewMediaOne] = React.useState(null);
	const [overviewMediaOneError, setOverviewMediaOneError] =
		React.useState(false);
	const [overviewMediaTwo, setOverviewMediaTwo] = React.useState(null);
	const [scheduleMediaError, setScheduleMediaError] = React.useState(false);
	const [scheduleMedia, setScheduleMedia] = React.useState(null);
	const [daysNumber, setDaysNumber] = React.useState(1);
	const [days, setDays] = React.useState([]);
	const [activeScreen, setActiveScreen] = React.useState(0);
	const [activeItemIndex, setActiveItemIndex] = React.useState(-1);
	const [progressPercent, setProgressPercent] = React.useState(0);
	const [newinitVals, setNewinitVals] = React.useState(initVals);
	// const handleSubmit
	React.useEffect(() => {
		getDetails();
	}, []);
	const getDetails = async () => {
		let programsList = await getAllPrograms();
		let foundProgram = programsList.find((itm) => itm.id === id);
		if (foundProgram) {
			let tempvals = { ...newinitVals };
			tempvals.name = foundProgram.name;
			tempvals.subTitle = foundProgram.subTitle;
			tempvals.status = foundProgram.status;
			tempvals.difficultyLevel = foundProgram.difficultyLevel;
			tempvals.scheduleDescription = foundProgram.scheduleDescription;
			tempvals.overviewDescription = foundProgram.overviewDescription;
			setBasicDetailMedia(foundProgram.basicDetailMedia);
			setDays(foundProgram.days);
			setOverviewMediaOne(foundProgram.overviewMediaOne);
			setOverviewMediaTwo(foundProgram.overviewMediaTwo);
			setScheduleMedia(foundProgram.scheduleImage);
			setNewinitVals(tempvals);
		}
	};

	const addProgramToList = async (values) => {
		// name: "",
		// subTitle: "",
		// status: "",
		// difficultyLevel: "",
		// scheduleDescription: "",
		// overviewDescription: "",
		if (!overviewMediaOne) {
			message.error("Please add an Image for Overview!");
			setOverviewMediaOneError(true);
			return;
		}
		setOverviewMediaOneError(false);
		if (!scheduleMedia) {
			message.error("Please add an Image for Overview!");
			setScheduleMediaError(true);
			return;
		}
		if (!basicDetailMedia) {
			message.error("Please add an Image for Basic Details!");
			setBasicDetailMediaError(true);
			return;
		}
		setBasicDetailMediaError(false);
		setScheduleMediaError(false);
		setProgressPercent(25);
		values.id = id;
		values.days = days;
		values.basicDetailMedia = basicDetailMedia ? basicDetailMedia : "noimg";
		values.overviewMediaOne = overviewMediaOne ? overviewMediaOne : "noimg";
		values.overviewMediaTwo = overviewMediaTwo ? overviewMediaTwo : "noimg";
		values.scheduleImage = scheduleMedia ? scheduleMedia : "noimg";
		setProgressPercent(50);
		console.log("values", values);
		if (await updateProgram(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Successfully Updated!`,
				description: `${values.name}  has been successfully updated`,
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
				message: `Failed to update!`,
				description: `Give it a try later.`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setAddingUser(false);
				},
			});
		}
	};
	const viewDetails = (index) => {
		setActiveItemIndex(index);
		setActiveScreen(1);
	};
	const deleteMe = (id) => {
		let newDays = [...days];
		newDays = newDays.filter((item) => item.id !== id);
		setDays(newDays);
	};
	return (
		<Formik
			initialValues={newinitVals}
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
			}) =>
				activeScreen === 0 ? (
					<div className="containerForAdd">
						<div className="rowing">
							<div />
							{addingUser ? (
								<Progress type="circle" percent={progressPercent} />
							) : (
								<div className="rowing">
									{/* <span
											className="duplicateBtn"
										>Duplicate Program</span> */}
									<span
										// className="duplicateBtn"
										className="draftBtn"
										style={{ backgroundColor: "#7D7D7D" }}
										onClick={() => navigate(-1)}
									>
										Back
									</span>
									{/* <span className="draftBtn">Save as draft</span>
									<span className="savebtn" onClick={handleSubmit}>
										Save
									</span> */}
								</div>
							)}
						</div>
						<div className="cardAdditionBlog">
							<span className="tableTitle">Basic Detail</span>
							<div className="barVertical" />
							<div>
								<Row>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<div className="colStart">
											<div className="flexStart mb30">
												<span className="addBlogInputLabel">PROGRAM NAME</span>
												<div style={{ marginTop: 10 }}>
													<input
														className="addBlogInput inputText"
														type={"text"}
														name="name"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.name}
														disabled
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
														name="subTitle"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.subTitle}
														disabled
													/>
													{errors.subTitle && touched.subTitle ? (
														<Typography
															alignment="left"
															title={errors.subTitle}
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
									</Col>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<div className="colStart">
											<div className="flexStart mb30">
												<span className="addBlogInputLabel">DIFFICULTY</span>
												<div style={{ marginTop: 10 }}>
													<Radio.Group
														name="difficultyLevel"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.difficultyLevel}
														defaultValue={values.difficultyLevel}
														disabled
													>
														<Row>
															<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																<Radio value={"Beginner"}>
																	<span className="radioBtnCustomized">
																		Beginner
																	</span>
																</Radio>
															</Col>
															<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																<Radio value={"Advanced"}>
																	<span className="radioBtnCustomized">
																		Advanced
																	</span>
																</Radio>
															</Col>
															<Col xs={24} sm={24} md={24} lg={24} xl={24}>
																<div style={{ margin: 16 }} />
															</Col>
															<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																<Radio value={"Intermediate"}>
																	<span className="radioBtnCustomized">
																		Intermediate
																	</span>
																</Radio>
															</Col>
															<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																<Radio value={"BeastMode"}>
																	<span className="radioBtnCustomized">
																		Beast Mode
																	</span>
																</Radio>
															</Col>
														</Row>
													</Radio.Group>
													{errors.difficultyLevel && touched.difficultyLevel ? (
														<Typography
															alignment="left"
															title={errors.difficultyLevel}
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
																	: "#F4F4F4",
															color: "#fff",
															paddingRight: 50,
															borderRight: "16px solid transparent",
														}}
														disabled
													>
														<option value="" selected={true} disabled={true}>
															Select Status
														</option>
														<option value="Active">Active</option>
														<option value="Pending">Pending</option>
													</select>
													{errors.status && touched.status ? (
														<Typography
															alignment="left"
															title={errors.status}
															fontFamily="Gilroy-Medium"
															color="red"
															type="label"
														/>
													) : (
														<></>
													)}
												</div>
											</div>
										</div>
									</Col>
								</Row>
							</div>
							<div>
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
													width: 156,
													height: 156,
													borderRadius: "50%",
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
												// onClick={() => setBasicDetailMedia("")}
											>
												<CloseOutlined
													style={{ fontSize: 8, color: primaryColor }}
												/>
											</div>
										</div>
									) : (
										<EmployeeDropZone
											{...{ setImageUrl: setBasicDetailMedia, small: false }}
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
							</div>
							<div style={{ margin: 40 }} />
							<span className="tableTitle">Overview</span>
							<div className="barVertical" />
							<div className="greyCard ">
								<div className="flexStart mb30">
									<span className="tableTitle" style={{ color: "#000000" }}>
										Step 1 (Upload media)
									</span>
									<div
										className="barVertical"
										style={{
											border: "1px solid gray",
											width: 800,
										}}
									/>
									<div>
										<div
											style={{
												display: "flex",
												justifyContent: "flex-start",
												alignItems: "center",
											}}
										>
											{overviewMediaOne ? (
												<div
													style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
													}}
												>
													<img
														src={overviewMediaOne}
														alt="UserImage"
														style={{
															width: 156,
															height: 156,
															borderRadius: "50%",
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
														// onClick={() => setOverviewMediaOne("")}
													>
														<CloseOutlined
															style={{ fontSize: 8, color: primaryColor }}
														/>
													</div>
												</div>
											) : (
												<EmployeeDropZone
													{...{
														setImageUrl: setOverviewMediaOne,
														small: false,
													}}
												/>
											)}
										</div>
										{overviewMediaOneError && (
											<Typography
												alignment="left"
												title={"Please add an image"}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										)}
									</div>
								</div>
								<div className="flexStart mb30">
									<span className="tableTitle" style={{ color: "#000000" }}>
										Step 2 (Overview text)
									</span>
									<div
										className="barVertical"
										style={{
											border: "1px solid gray",
											width: 800,
										}}
									/>
									<div style={{ marginTop: 10 }}>
										<TextArea
											rows={4}
											placeholder="Enter Description"
											maxLength={250}
											showCount
											className="addBlogInput overViewDescription"
											name="overviewDescription"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.overviewDescription}
											style={{
												width: 700,
												height: 650,
											}}
											disabled
										/>
										{errors.overviewDescription &&
										touched.overviewDescription ? (
											<Typography
												alignment="left"
												title={errors.overviewDescription}
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
									<span className="tableTitle" style={{ color: "#000000" }}>
										Step 3 (media - optional)
									</span>
									<div
										className="barVertical"
										style={{
											border: "1px solid gray",
											width: 800,
										}}
									/>
									<div>
										<div
											style={{
												display: "flex",
												justifyContent: "flex-start",
												alignItems: "center",
											}}
										>
											{overviewMediaTwo ? (
												<div
													style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
													}}
												>
													<img
														src={overviewMediaTwo}
														alt="UserImage"
														style={{
															width: 156,
															height: 156,
															borderRadius: "50%",
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
														// onClick={() => setOverviewMediaTwo("")}
													>
														<CloseOutlined
															style={{ fontSize: 8, color: primaryColor }}
														/>
													</div>
												</div>
											) : (
												<EmployeeDropZone
													{...{
														setImageUrl: setOverviewMediaTwo,
														small: false,
													}}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<br /> <br /> <br />
							<span className="tableTitle" style={{ marginTop: 30 }}>
								Schedule
							</span>
							<div className="barVertical" />
							<div>
								<Row>
									<Col xs={24} sm={24} md={24} lg={10} xl={10}>
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">DIFFICULTY</span>
											<div style={{ marginTop: 10 }}>
												<div>
													<div
														style={{
															display: "flex",
															justifyContent: "flex-start",
															alignItems: "center",
														}}
													>
														{scheduleMedia ? (
															<div
																style={{
																	display: "flex",
																	justifyContent: "center",
																	alignItems: "center",
																}}
															>
																<img
																	src={scheduleMedia}
																	alt="UserImage"
																	style={{
																		width: 156,
																		height: 156,
																		borderRadius: "50%",
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
																		boxShadow:
																			"rgba(0, 0, 0, 0.24) 0px 3px 8px",
																		cursor: "pointer",
																		border: "1px solid #000",
																	}}
																	// onClick={() => setScheduleMedia("")}
																>
																	<CloseOutlined
																		style={{ fontSize: 8, color: primaryColor }}
																	/>
																</div>
															</div>
														) : (
															<EmployeeDropZone
																{...{
																	setImageUrl: setScheduleMedia,
																	small: false,
																}}
															/>
														)}
													</div>
													{scheduleMediaError && (
														<Typography
															alignment="left"
															title={"Please add an image"}
															fontFamily="Gilroy-Medium"
															color="red"
															type="label"
														/>
													)}
												</div>
											</div>
										</div>
									</Col>
									<Col xs={24} sm={24} md={24} lg={14} xl={14}>
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">DESCRIPTION</span>
											<div style={{ marginTop: 10, width: 500 }}>
												<TextArea
													rows={4}
													placeholder="Schedule Description"
													maxLength={250}
													showCount
													// className="scheduleDescription"
													// className="addBlogInput"
													name="scheduleDescription"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.scheduleDescription}
													style={{
														width: 500,
														height: 400,
														display: "flex",
													}}
													disabled
												/>
												{errors.scheduleDescription &&
												touched.scheduleDescription ? (
													<Typography
														alignment="left"
														title={errors.scheduleDescription}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : (
													""
												)}
											</div>
										</div>
									</Col>
								</Row>
							</div>
							<br />
							<div
								className="rowing"
								style={{ paddingLeft: 10, paddingRight: 10 }}
							>
								<span className="oOfDays">Program Duration</span>
								<div className="flexEndd mb30">
									<span className="oOfDays">No. of Days</span>
									<div className="daysAdditionBtnDiv">
										<input
											type={"number"}
											// defaultValue={daysNumber}
											className="inputfont nmbrBtn"
											onChange={(e) => setDaysNumber(e.target.value)}
										/>
										<button
											className="dayssAdditionBtn"
											onClick={() => {
												let tempDays = [...days];
												for (let i = 0; i < daysNumber; i++) {
													tempDays.push({
														id: days.length + i,
														warmpup: [],
														workout: [],
														cooldown: [],
													});
												}
												setDays(tempDays);
											}}
											disabled
										>
											Add
										</button>
									</div>
								</div>
							</div>
							<div>
								<DaysTable
									data={days}
									deleteMe={deleteMe}
									viewDetails={viewDetails}
									disabledOption={true}
								/>
							</div>
						</div>
					</div>
				) : (
					<DayEdit
						days={days}
						setDays={setDays}
						setActiveScreen={setActiveScreen}
						activeItemIndex={activeItemIndex}
					/>
				)
			}
		</Formik>
	);
};

export default ViewProgramContainer;
