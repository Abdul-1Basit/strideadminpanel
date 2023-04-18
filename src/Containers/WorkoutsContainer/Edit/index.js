import React from "react";
import Typography from "../../../Components/Typography";

import { Row, message, Progress, notification, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import programSchema, { initVals } from "./Constants";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
import { getAllWorkouts, updateWorkout } from "../../../Helpers/firebase";
import "./index.css";
import DayEdit from "./DayEdit";
const EditWorkoutContainer = (props) => {
	let { id } = useParams();
	const [addingUser, setAddingUser] = React.useState(false);
	const navigate = useNavigate();
	const [basicDetailMedia, setBasicDetailMedia] = React.useState(null);
	const [basicDetailMediaOneError, setBasicDetailMediaError] =
		React.useState(false);
	const [progressPercent, setProgressPercent] = React.useState(0);
	const [activeData, setActiveData] = React.useState(initVals);
	const [data, setData] = React.useState(null);
	const [prompted, setPrompted] = React.useState(false);

	// const handleSubmit

	const addProgramToList = async (values) => {
		if (!basicDetailMedia) {
			message.error("Please add an Image for Basic Details!");
			setBasicDetailMediaError(true);
			return;
		}
		setBasicDetailMediaError(false);
		if (
			!prompted &&
			data.warmup.length === 0 &&
			data.workout.length === 0 &&
			data.cooldown.length === 0
		) {
			setPrompted(true);
			notification.warning({
				message: `Save all changes made to workout!`,
				description: `If you have made any changes to exercises please save them first!`,
				placement: "topRight",
				duration: 2,
				onClose: function () {},
			});
			return;
		}
		setAddingUser(true);
		setProgressPercent(25);
		values.id = activeData.id;
		values.basicDetailMedia = basicDetailMedia ? basicDetailMedia : "";
		values.exercises = data;
		console.log("values", values);
		// return;
		setProgressPercent(50);
		console.log("values", values);
		if (await updateWorkout(values)) {
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
	// React.useEffect(() => {

	// }, []);
	React.useLayoutEffect(() => {
		if (id) {
			fetchList();
		}
	}, [id]);
	async function fetchList() {
		const workoutList = await getAllWorkouts();
		let foundData = workoutList.find((itm) => itm.id === id);
		if (foundData) {
			setActiveData(foundData);
		}
		setBasicDetailMedia(foundData.basicDetailMedia);
		setData(foundData.exercises);
		// console.log("found this", foundData);
	}

	return (
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
									style={{ backgroundColor: "#7D7D7D" }}
									onClick={() => navigate(-1)}
								>
									Cancel
								</span>
								<span className="savebtn" onClick={handleSubmit}>
									Save
								</span>
							</div>
						)}
					</div>

					<div className="cardAdditionBlog">
						<Row style={{ paddingLeft: 47 }}>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<span className="tableTitle">Basic Detail</span>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<span className="tableTitle">Upload a Media</span>
							</Col>
						</Row>
						<div className="barVertical" />
						<div style={{ paddingLeft: 47 }}>
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
						<br />
						<br /> <br />
						{data && (
							<DayEdit data={data} setData={setData} prompted={prompted} />
						)}
					</div>
				</div>
			)}
		</Formik>
	);
};

// const ExerciseItem = (props) => {
// 	const [visible, setVisible] = React.useState(true);
// 	const setVideoValue = (item) => {
// 		props.item.video = item;
// 	};
// 	const setAudioValue = (item) => {
// 		props.item.audio = item;
// 	};
// 	return (
// 		<div>
// 			<div className="rowing">
// 				<div className="alignMeStart">
// 					<span
// 						className="tableTitle"
// 						style={{ fontWeight: 600, color: "#222222" }}
// 					>
// 						Exercise # 1
// 					</span>
// 					<span>
// 						<AiFillEye
// 							size={25}
// 							style={{
// 								color: "#2DAB22",
// 								marginLeft: 15,
// 								marginRight: 15,
// 							}}
// 						/>
// 					</span>
// 					<span onClick={() => props.deleteMe(props.item.id)}>
// 						<AiFillDelete
// 							size={22}
// 							style={{ color: "#D30E0E", marginRight: 15 }}
// 						/>
// 					</span>
// 					<span
// 						className="setToAllText"
// 						onClick={() => props.setToAll(props.item.id)}
// 					>
// 						set to all
// 					</span>
// 				</div>
// 				<span onClick={() => setVisible(!visible)}>
// 					{visible ? (
// 						<SlArrowUp
// 							color={"#D30E0E"}
// 							size={22}
// 							style={{ fontWeight: "bold" }}
// 						/>
// 					) : (
// 						<SlArrowDown
// 							color={"#D30E0E"}
// 							size={22}
// 							style={{ fontWeight: "bold" }}
// 						/>
// 					)}
// 				</span>
// 			</div>
// 			{visible && (
// 				<div style={{ marginTop: 42 }}>
// 					<Row>
// 						<Col xs={24} sm={24} md={24} lg={12} xl={12}>
// 							<div className="flexStart mb30">
// 								<span className="addBlogInputLabel">Exercise Name</span>
// 								<div style={{ marginTop: 10 }}>
// 									<input
// 										className="addBlogInput inputText"
// 										type={"text"}
// 										onChange={(e) => (props.item.name = e.target.value)}
// 										value={props.item.name}
// 									/>
// 								</div>
// 							</div>
// 							<div className="flexStart mb30">
// 								<span className="addBlogInputLabel">Instructions</span>
// 								<div style={{ marginTop: 10 }}>
// 									<TextArea
// 										className="addBlogInput inputText"
// 										rows={12}
// 										placeholder="Please enter instructions for exercise"
// 										onChange={(e) => {
// 											// console.log("e", e.target.value);
// 											props.item.instructions = e.target.value;
// 										}}
// 										allowClear
// 										defaultValue={props.item.instructions}
// 									/>
// 								</div>
// 							</div>
// 						</Col>
// 						<Col xs={24} sm={24} md={24} lg={12} xl={12}>
// 							<div className="flexStart mb30">
// 								<span className="addBlogInputLabel">Exercise Video</span>
// 								<div
// 									style={{
// 										display: "flex",
// 										justifyContent: "flex-start",
// 										alignItems: "center",
// 										marginTop: 10,
// 									}}
// 								>
// 									{props.item.video ? (
// 										<div
// 											style={{
// 												display: "flex",
// 												justifyContent: "center",
// 												alignItems: "center",
// 											}}
// 										>
// 											<img
// 												src={props.item.video}
// 												alt="UserImage"
// 												style={{
// 													width: 156,
// 													height: 156,
// 													borderRadius: "50%",
// 												}}
// 											/>
// 											<div
// 												className="centerAligner"
// 												style={{
// 													width: 15,
// 													height: 15,
// 													borderRadius: "50%",
// 													backgroundColor: "#fff",
// 													marginLeft: -10,
// 													marginTop: -20,
// 													boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
// 													cursor: "pointer",
// 													border: "1px solid #000",
// 												}}
// 												onClick={() => setVideoValue("")}
// 											>
// 												<CloseOutlined
// 													style={{ fontSize: 8, color: primaryColor }}
// 												/>
// 											</div>
// 										</div>
// 									) : (
// 										<EmployeeDropZone
// 											{...{
// 												setImageUrl: setVideoValue,
// 												small: false,
// 											}}
// 										/>
// 									)}
// 								</div>
// 							</div>
// 							<div className="flexStart mb30">
// 								<span className="addBlogInputLabel ">Exercise Audio</span>
// 								<div
// 									style={{
// 										display: "flex",
// 										justifyContent: "flex-start",
// 										alignItems: "center",
// 										marginTop: 10,
// 									}}
// 								>
// 									{props.item.audio ? (
// 										<div
// 											style={{
// 												display: "flex",
// 												justifyContent: "center",
// 												alignItems: "center",
// 											}}
// 										>
// 											<img
// 												src={props.item.audio}
// 												alt="UserImage"
// 												style={{
// 													width: 156,
// 													height: 156,
// 													borderRadius: "50%",
// 												}}
// 											/>
// 											<div
// 												className="centerAligner"
// 												style={{
// 													width: 15,
// 													height: 15,
// 													borderRadius: "50%",
// 													backgroundColor: "#fff",
// 													marginLeft: -10,
// 													marginTop: -20,
// 													boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
// 													cursor: "pointer",
// 													border: "1px solid #000",
// 												}}
// 												onClick={() => setAudioValue("")}
// 											>
// 												<CloseOutlined
// 													style={{ fontSize: 8, color: primaryColor }}
// 												/>
// 											</div>
// 										</div>
// 									) : (
// 										<AudioDropZone
// 											{...{
// 												setImageUrl: setAudioValue,
// 												small: false,
// 											}}
// 										/>
// 									)}
// 								</div>
// 							</div>
// 						</Col>
// 					</Row>
// 					<div className="flexStart mb30" style={{ width: "100%" }}>
// 						<span className="addBlogInputLabel">Target Area</span>
// 						<div style={{ marginTop: 10 }}>
// 							<TextArea
// 								className="inputText textAreaGrey"
// 								rows={4}
// 								cols={20}
// 								placeholder="Please enter instructions for exercise"
// 								onChange={(e) => {
// 									props.item.targetArea = e.target.value;
// 								}}
// 								value={props.item.targetArea}

// 								// allowClear
// 								// style={{
// 								// 	width: "85%",
// 								// 	backgroundColor: "#F4F4F4",
// 								// 	borderRadius: 8,
// 								// }}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

export default EditWorkoutContainer;
