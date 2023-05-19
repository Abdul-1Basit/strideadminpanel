import "./index.css";
import React from "react";
import CustomButton from "../../../Components/CustomButton";
import { CloseOutlined } from "@ant-design/icons";
import CategorySchema, { initVals } from "./Constants";
import { Formik, Form } from "formik";
import { Progress, notification, message, Input, Row, Col } from "antd";
import Typography from "../../../Components/Typography";
import {
	getAllExerciseCategories,
	getAllExercises,
	updateExercise,
} from "../../../Helpers/firebase";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
import AudioDropZone from "../../../Components/AudioDropZone";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "react-rte";
import NewCategoryModal from "../NewCategoryModal";
const { TextArea } = Input;
const EditExerciseContainer = (props) => {
	let { id } = useParams();
	const navigate = useNavigate();
	const [value, setValue] = React.useState(RichTextEditor.createEmptyValue());
	const [imageError, setImageError] = React.useState(false);
	const [videoError, setVideoError] = React.useState(false);
	const [audioError, setAudioError] = React.useState(false);
	const [imageurl, setImageUrl] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [progressPercent, setProgressPercent] = React.useState(0);
	const [audioValue, setAudioValue] = React.useState("");
	const [videoValue, setVideoValue] = React.useState("");
	const [newinitVals, setNewinitVals] = React.useState(initVals);

	const [open, setOpen] = React.useState(false);
	const [categoryListing, setCategoryListing] = React.useState([]);
	const addCategoryToList = async (values) => {
		if (!imageurl) {
			message.error("Please attach an image");
			setImageError(true);
			return;
		}
		if (!videoValue) {
			message.error("Please attach a video");
			setVideoError(true);
			return;
		}

		setVideoError(false);
		setImageError(false);
		setIsLoading(true);
		setProgressPercent(25);
		values.img = imageurl;
		values.audio = audioValue ?? "";
		values.video = videoValue;
		values.id = newinitVals.id;
		setProgressPercent(50);
		if (await updateExercise(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Successfully updated!`,
				description: `${values.name}  has been successfully updated`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setIsLoading(false);
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
					setIsLoading(false);
				},
			});
		}
	};
	React.useEffect(() => {
		if (id) fetchData();
		getExercs();
	}, [open]);
	const getExercs = async () => {
		let reslts = await getAllExerciseCategories();
		setCategoryListing(reslts);
	};
	const fetchData = async () => {
		const listOfExercises = await getAllExercises();
		const selectedItem = listOfExercises.find((item) => item.id === id);
		setValue(
			RichTextEditor.createValueFromString(
				selectedItem.instructions,
				"markdown"
			)
		);
		setImageUrl(selectedItem.img);
		setVideoValue(selectedItem.video);
		setAudioValue(selectedItem.audio);
		setNewinitVals(selectedItem);
	};
	return (
		<div
			style={{
				height: "100%",
				paddingTop: 52,
				paddingLeft: 40,
				paddingRight: 40,
				paddingBottom: 37,
			}}
		>
			<Formik
				initialValues={newinitVals}
				validationSchema={CategorySchema}
				onSubmit={(values) => {
					addCategoryToList(values);
				}}
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
					<Form>
						<div className="rowing">
							<div />
							{isLoading ? (
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
									<span
										className="savebtn"
										onClick={() => {
											handleSubmit();
											console.log(";errors", errors);
										}}
									>
										Save
									</span>
								</div>
							)}
						</div>
						{open && <NewCategoryModal {...{ open, setOpen }} />}

						<div className="cardAdditionBlog">
							<span className="tableTitle">Basic Detail</span>
							<div className="barVertical" />
							<div style={{ marginTop: 42 }}>
								<Row>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">Exercise Name</span>
											<div style={{ marginTop: 10 }}>
												<input
													type={"text"}
													name="name"
													className="addBlogInput inputText"
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
												) : null}
											</div>
										</div>
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">Instructions</span>
											<div
												style={{
													marginTop: 10,
													width: "100%",
													maxWidth: 420,
												}}
											>
												<RichTextEditor
													value={value}
													onChange={(val) => {
														console.log("value", val.toString("html"));
														setValue(val);
														values.instructions = val.toString("html");
													}}
													editorStyle={{
														height: 420,
														marginBottom: 50,
														width: 400,
													}}
												/>
												{errors.instructions && touched.instructions ? (
													<Typography
														alignment="left"
														title={errors.instructions}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : null}
											</div>
										</div>
										<div className="flexStart mb30" style={{ width: "100%" }}>
											<span className="addBlogInputLabel">Target Area</span>
											<div style={{ marginTop: 10 }}>
												<TextArea
													className="addBlogInput inputText"
													autoSize={{
														minRows: 8,
														maxRows: 8,
													}}
													name="targetArea"
													placeholder="Please enter Target Area"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.targetArea}
												/>
												{errors.targetArea && touched.targetArea ? (
													<Typography
														alignment="left"
														title={errors.targetArea}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : null}
											</div>
										</div>
									</Col>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										{/* {"Target Area"} */}
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">CATEGORY</span>
											<div style={{ marginTop: 10 }}>
												<select
													name="category"
													id="category"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.category}
													className="addBlogInput inputText"
												>
													<option
														value="default"
														selected={true}
														disabled={true}
													>
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
																: values.status === "Inactive"
																? "#E2BB2E"
																: "#F4F4F4",
														color:
															values.status === "Active" ||
															values.status === "Inactive"
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
													<option value="Inactive">Inactive</option>
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
										<div className="rowingStart">
											<div className="flexStart mb30">
												<span className="addBlogInputLabel">
													EXERCISE IMAGE
												</span>
												<div style={{ marginTop: 10 }}>
													{imageurl ? (
														<div
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}
														>
															<img
																src={imageurl}
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
																onClick={() => setImageUrl("")}
															>
																<CloseOutlined
																	style={{ fontSize: 8, color: primaryColor }}
																/>
															</div>
														</div>
													) : (
														<EmployeeDropZone
															{...{
																setImageUrl: setImageUrl,
																small: false,
																shortWidth: true,
															}}
														/>
													)}
													{imageError && (
														<Typography
															alignment="left"
															title={"Image is required!"}
															fontFamily="Gilroy-Medium"
															color="red"
															type="label"
														/>
													)}
												</div>
											</div>
											<div />
											<div className="flexStart mb30 ml">
												<span className="addBlogInputLabel">
													Exercise Video
												</span>
												<div
													style={{
														display: "flex",
														justifyContent: "flex-start",
														alignItems: "center",
														marginTop: 10,
													}}
												>
													{videoValue ? (
														<div
															style={{
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}
														>
															<img
																src={videoValue}
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
																shortWidth: true,
															}}
														/>
													)}
												</div>
												{videoError && (
													<Typography
														alignment="left"
														title={"Video is required!"}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
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
												{audioValue ? (
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<img
															src={audioValue}
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
															increaseLength: true,
														}}
													/>
												)}
											</div>
											{audioError && (
												<Typography
													alignment="left"
													title={"Audio is required!"}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											)}
										</div>
									</Col>
								</Row>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default EditExerciseContainer;
