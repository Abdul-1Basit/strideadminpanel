import React from "react";
import Typography from "../../../Components/Typography";

import { Input, Row, message, Progress, notification, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import programSchema, { initVals } from "./Constants";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import AudioDropZone from "../../../Components/AudioDropZone";
import { primaryColor } from "../../../Constants";
import { addWorkout } from "../../../Helpers/firebase";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "./index.css";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
const { TextArea } = Input;
const AddWorkoutContainer = (props) => {
	const [addingUser, setAddingUser] = React.useState(false);
	const navigate = useNavigate();
	const [basicDetailMedia, setBasicDetailMedia] = React.useState(null);
	const [basicDetailMediaOneError, setBasicDetailMediaError] =
		React.useState(false);
	const [noOfExercises, setNoOfExercises] = React.useState(0);
	const [listOfExercises, setListOfExercises] = React.useState([]);
	const [progressPercent, setProgressPercent] = React.useState(0);

	// const handleSubmit

	const addProgramToList = async (values) => {
		if (!basicDetailMedia) {
			message.error("Please add an Image for Basic Details!");
			setBasicDetailMediaError(true);
			return;
		}
		setBasicDetailMediaError(false);
		setAddingUser(true);
		setProgressPercent(25);
		values.basicDetailMedia = basicDetailMedia ? basicDetailMedia : "noimg";
		values.listOfExercises = listOfExercises;
		setProgressPercent(50);
		console.log("values", values);
		if (await addWorkout(values)) {
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

	const deleteMe = (id) => {
		let newDays = [...listOfExercises];
		newDays = newDays.filter((item) => item.id !== id);
		setListOfExercises(newDays);
	};
	const changeListing = () => {
		let oldList = [...listOfExercises];
		for (let i = 0; i < noOfExercises; i++) {
			oldList.push({
				id: oldList.length,
				targetArea: "",
				instructions: "",
				targetArea: "",
				video: "",
				audio: "",
			});
		}
		setListOfExercises(oldList);
	};
	return (
		<Formik
			initialValues={initVals}
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
								<span className="duplicateBtn">Duplicate Workout</span>
								<span className="draftBtn">Save as draft</span>
								<span className="savebtn" onClick={handleSubmit}>
									Save
								</span>
							</div>
						)}
					</div>

					<div className="cardAdditionBlog">
						<Row>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<span className="tableTitle">Basic Detail</span>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<span className="tableTitle">Upload a Media</span>
							</Col>
						</Row>
						<div className="barVertical" />
						<div>
							<Row>
								<Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
								</Col>
								<div>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
									</Col>
								</div>
							</Row>
						</div>
						<div className="alignMeStart">
							<span className="tableTitle">Exercises</span>{" "}
							<span className="secondTitle">No. of Exercises</span>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"number"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										defaultValue={noOfExercises}
										onChange={(e) => {
											setNoOfExercises(e.target.value);
										}}
										style={{ width: 50 }}
									/>
									<button className="dayssAdditionBtn" onClick={changeListing}>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="barVertical" />
						{listOfExercises.map((item, index) => (
							<ExerciseItem key={index} item={item} deleteMe={deleteMe} />
						))}
					</div>
				</div>
			)}
		</Formik>
	);
};

const ExerciseItem = (props) => {
	const [visible, setVisible] = React.useState(true);
	const setVideoValue = (item) => {
		props.item.video = item;
	};
	const setAudioValue = (item) => {
		props.item.audio = item;
	};
	return (
		<div>
			<div className="rowing">
				<div className="alignMeStart">
					<span
						className="tableTitle"
						style={{ fontWeight: 600, color: "#222222" }}
					>
						Exercise # 1
					</span>
					<span>
						<AiFillEye
							size={25}
							style={{
								color: "#2DAB22",
								marginLeft: 15,
								marginRight: 15,
							}}
						/>
					</span>
					<span onClick={() => props.deleteMe(props.item.id)}>
						<AiFillDelete
							size={22}
							style={{ color: "#D30E0E", marginRight: 15 }}
						/>
					</span>
					<span className="setToAllText">set to all</span>
				</div>
				<span onClick={() => setVisible(!visible)}>
					{visible ? (
						<SlArrowUp
							color={"#D30E0E"}
							size={22}
							style={{ fontWeight: "bold" }}
						/>
					) : (
						<SlArrowDown
							color={"#D30E0E"}
							size={22}
							style={{ fontWeight: "bold" }}
						/>
					)}
				</span>
			</div>
			{visible && (
				<div style={{ marginTop: 42 }}>
					<Row>
						<Col xs={24} sm={24} md={24} lg={12} xl={12}>
							<div className="flexStart mb30">
								<span className="addBlogInputLabel">Exercise Name</span>
								<div style={{ marginTop: 10 }}>
									<input
										className="addBlogInput inputText"
										type={"text"}
										onChange={(e) => {
											props.item.name = e.target.value;
										}}
										// value={props.item.name}
									/>
								</div>
							</div>
							<div className="flexStart mb30">
								<span className="addBlogInputLabel">Instructions</span>
								<div style={{ marginTop: 10 }}>
									<TextArea
										className="addBlogInput inputText"
										rows={12}
										placeholder="Please enter instructions for exercise"
										onChange={(e) => {
											props.item.instructions = e.target.value;
										}}
										allowClear
									/>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={12}>
							<div className="flexStart mb30">
								<span className="addBlogInputLabel">Exercise Video</span>
								<div
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									{props.item.video ? (
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<img
												src={props.item.video}
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
												onClick={() => setVideoValue("")}
											>
												<CloseOutlined
													style={{ fontSize: 8, color: primaryColor }}
												/>
											</div>
										</div>
									) : (
										<EmployeeDropZone
											{...{
												setImageUrl: setVideoValue,
												small: false,
											}}
										/>
									)}
								</div>
							</div>
							<div className="flexStart mb30">
								<span className="addBlogInputLabel ">Exercise Audio</span>
								<div
									style={{
										display: "flex",
										justifyContent: "flex-start",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									{props.item.audio ? (
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<img
												src={props.item.audio}
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
												onClick={() => setAudioValue("")}
											>
												<CloseOutlined
													style={{ fontSize: 8, color: primaryColor }}
												/>
											</div>
										</div>
									) : (
										<AudioDropZone
											{...{
												setImageUrl: setAudioValue,
												small: false,
											}}
										/>
									)}
								</div>
							</div>
						</Col>
					</Row>
					<div className="flexStart mb30" style={{ width: "100%" }}>
						<span className="addBlogInputLabel">Target Area</span>
						<div style={{ marginTop: 10 }}>
							<TextArea
								className="inputText textAreaGrey"
								rows={4}
								cols={20}
								placeholder="Please enter Target Area"
								onChange={(e) => {
									props.item.targetArea = e.target.value;
								}}
								// allowClear
								// style={{
								// 	width: "85%",
								// 	backgroundColor: "#F4F4F4",
								// 	borderRadius: 8,
								// }}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddWorkoutContainer;
