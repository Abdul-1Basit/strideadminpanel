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
const EditProgramContainer = (props) => {
	const navigate = useNavigate();
	let { id } = useParams();
	const [addingUser, setAddingUser] = React.useState(false);
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
		setScheduleMediaError(false);
		setProgressPercent(25);
		values.id = id;
		values.days = days;
		values.overviewMediaOne = overviewMediaOne ? overviewMediaOne : "noimg";
		values.overviewMediaTwo = overviewMediaTwo ? overviewMediaTwo : "noimg";
		values.scheduleImage = scheduleMedia ? scheduleMedia : "noimg";
		setProgressPercent(50);
		console.log("values", values);
		if (await updateProgram(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Successfully Added!`,
				description: `${values.name}  has been successfully added`,
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
	const viewDetails = (index) => {
		setActiveItemIndex(index);
		setActiveScreen(1);
	};
	const deleteMe = (id) => {
		let newDays = [...days];
		newDays = newDays.filter((item) => item.id !== id);
		setDays(newDays);
	};
	return activeScreen === 0 ? (
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
			}) => (
				<div className="containerForAdd">
					<div className="rowing">
						<div />
						{addingUser ? (
							<Progress type="circle" percent={progressPercent} />
						) : (
							<div className="rowing">
								<span className="duplicateBtn">Duplicate Program</span>
								<span className="draftBtn" onClick={() => navigate(-1)}>
									Cancel
								</span>
								<span className="savebtn" onClick={handleSubmit}>
									Update
								</span>
							</div>
						)}
					</div>
					<div className="cardAdditionBlog">
						<span className="tableTitle">Basic Detail</span>
						<div className="barVertical" />
						<div className="rowingStart">
							<div className="mr500">
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
							<div>
								<div className="flexStart mb30">
									<span className="addBlogInputLabel">DIFFICULTY</span>
									<div style={{ marginTop: 10 }}>
										<select
											name="difficultyLevel"
											id="category"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.difficultyLevel}
											className="addBlogInput inputText"
										>
											<option value="default" selected={true} disabled={true}>
												Select Exercise
											</option>
											<option value="Beginner">Beginner</option>
											<option value="Advanced">Advanced</option>
											<option value="Intermediate">Intermediate</option>
											<option value="BeastMode">Beast Mode</option>
										</select>
									</div>
								</div>
								<div className="flexStart mb30">
									<span className="addBlogInputLabel">STATUS</span>
									<div style={{ marginTop: 10 }}>
										<Radio.Group
											name="status"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.status}
											defaultValue={values.status}
										>
											<Radio value={"Active"}>
												<Typography
													alignment="left"
													title="Active"
													fontFamily="Gilroy-Medium"
													color="#64748B"
													type="label"
												/>
											</Radio>
											<Radio value={"Inactive"}>
												<Typography
													alignment="left"
													title="Inactive"
													fontFamily="Gilroy-Medium"
													color="#64748B"
													type="label"
												/>
											</Radio>
										</Radio.Group>
										{errors.status && touched.status ? (
											<Typography
												alignment="left"
												title={errors.status}
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
						</div>
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
													onClick={() => setOverviewMediaOne("")}
												>
													<CloseOutlined
														style={{ fontSize: 8, color: primaryColor }}
													/>
												</div>
											</div>
										) : (
											<EmployeeDropZone
												{...{ setImageUrl: setOverviewMediaOne, small: false }}
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
									Step 2 (Add text)
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
										maxLength={1000}
										showCount
										className="overViewDescription"
										name="overviewDescription"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.overviewDescription}
									/>
									{errors.overviewDescription && touched.overviewDescription ? (
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
													onClick={() => setOverviewMediaTwo("")}
												>
													<CloseOutlined
														style={{ fontSize: 8, color: primaryColor }}
													/>
												</div>
											</div>
										) : (
											<EmployeeDropZone
												{...{ setImageUrl: setOverviewMediaTwo, small: false }}
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
						<div className="rowFlexStart">
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
															boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
															cursor: "pointer",
															border: "1px solid #000",
														}}
														onClick={() => setScheduleMedia("")}
													>
														<CloseOutlined
															style={{ fontSize: 8, color: primaryColor }}
														/>
													</div>
												</div>
											) : (
												<EmployeeDropZone
													{...{ setImageUrl: setScheduleMedia, small: false }}
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
							<div className="flexStart mb30">
								<span className="addBlogInputLabel">DESCRIPTION</span>
								<div style={{ marginTop: 10 }}>
									<TextArea
										rows={4}
										placeholder="Schedule Description"
										maxLength={1000}
										showCount
										className="scheduleDescription"
										name="scheduleDescription"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.scheduleDescription}
									/>
									{errors.scheduleDescription && touched.scheduleDescription ? (
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
						</div>
						<div className="flexEndd mb30">
							<span className="oOfDays">No. of Days</span>
							<div className="daysAdditionBtnDiv">
								<InputNumber
									min={1}
									max={30}
									// defaultValue={daysNumber}
									onChange={setDaysNumber}
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
								>
									Add
								</button>
							</div>
						</div>
						<div>
							<DaysTable
								data={days}
								deleteMe={deleteMe}
								viewDetails={viewDetails}
							/>
						</div>
					</div>
				</div>
			)}
		</Formik>
	) : (
		<DayEdit
			days={days}
			setDays={setDays}
			setActiveScreen={setActiveScreen}
			activeItemIndex={activeItemIndex}
		/>
	);
};

export default EditProgramContainer;
