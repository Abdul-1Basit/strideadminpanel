import React from "react";
import Typography from "../../../Components/Typography";
import { Row, message, Progress, notification, Col, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import programSchema, { initVals } from "./Constants";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
import { addWorkout, getAllWorkoutCategories } from "../../../Helpers/firebase";
import "./index.css";
import DayEdit from "./DayEdit";
import NewCategoryModal from "../NewCategoryModal";

const { TextArea } = Input;

const AddWorkoutContainer = (props) => {
	const [addingUser, setAddingUser] = React.useState(false);
	const navigate = useNavigate();
	const [basicDetailMedia, setBasicDetailMedia] = React.useState(null);
	const [categoryListing, setCategoryListing] = React.useState([]);
	const [basicDetailMediaOneError, setBasicDetailMediaError] =
		React.useState(false);
	const [progressPercent, setProgressPercent] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const [data, setData] = React.useState({
		id: 0,
		warmup: [],
		workout: [],
		cooldown: [],
		notes: "",
	});
	const addProgramToList = async (values) => {
		if (!basicDetailMedia) {
			message.error("Please add an Image for Basic Details!");
			setBasicDetailMediaError(true);
			return;
		}
		setBasicDetailMediaError(false);
		setAddingUser(true);
		setProgressPercent(25);
		values.basicDetailMedia = basicDetailMedia ? basicDetailMedia : "";
		values.exercises = data;
		setProgressPercent(50);
		console.log("values", values);
		if (await addWorkout(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Successfully added your workout!`,
				description: ``, // `${values.name}  has been successfully added`,
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
	React.useEffect(() => {
		(async function () {
			const rsp = await getAllWorkoutCategories();
			setCategoryListing(rsp);
		})();
	}, [open]);
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
								{/* <span className="duplicateBtn">Duplicate Workout</span>
								<span className="draftBtn">Save as draft</span> */}
								<span
									className="draftBtn"
									style={{ backgroundColor: "#222222" }}
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
													<option value="" selected={true} disabled={true}>
														Select Category
													</option>
													{categoryListing.map((item) => (
														<option value={item.name}>{item.name}</option>
													))}
												</select>
												{errors.category && touched.category ? (
													<Typography
														alignment="left"
														title={errors.category}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : null}
											</div>
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
														width: 298,
														height: 215,
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
													categoryType: true,
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
								</Col>
							</Row>
						</div>
						<div className="flexStart mb30" style={{ paddingLeft: 47 }}>
							<br />
							<br />
							<span className="addBlogInputLabel">DESCRIPTION</span>
							<div style={{ marginTop: 10 }}>
								<TextArea
									// rows={4}
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
								{errors.description && touched.description ? (
									<Typography
										alignment="left"
										title={errors.description}
										fontFamily="Gilroy-Medium"
										color="red"
										type="label"
									/>
								) : (
									""
								)}
							</div>
						</div>
						<br />
						<br /> <br />
						<DayEdit {...{ data, setData }} />
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
// 					<span className="setToAllText">set to all</span>
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
// 										onChange={(e) => {
// 											props.item.name = e.target.value;
// 										}}
// 										// value={props.item.name}
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
// 											props.item.instructions = e.target.value;
// 										}}
// 										allowClear
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
// 								placeholder="Please enter Target Area"
// 								onChange={(e) => {
// 									props.item.targetArea = e.target.value;
// 								}}
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

export default AddWorkoutContainer;
