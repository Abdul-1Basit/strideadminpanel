import "./index.css";
import React from "react";
import CategorySchema from "./Constants";
import { Formik, Form } from "formik";
import { Select, Progress, notification, Input, Row, Col } from "antd";

import Typography from "../../../Components/Typography";

import { getAllExercises, updateExercise } from "../../../Helpers/firebase";

import RichTextEditor from "react-rte";
const { Option } = Select;
const { TextArea } = Input;
const EditCampaign = (props) => {
	// const [fileList, setFileList] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(false);
	const [progressPercent, setProgressPercent] = React.useState(0);

	const [newinitVals, setNewinitVals] = React.useState(props.activeCategory);
	const addCategoryToList = async (values) => {
		return;
		setIsLoading(true);
		setProgressPercent(25);

		setProgressPercent(50);
		if (await updateExercise(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Successfully updated!`,
				description: `${values.name}  has been successfully updated`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					// props.setAddModal(false);
					setIsLoading(false);
					// navigate(-1);
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
		// if (id) fetchData();
	}, []);
	const fetchData = async () => {
		const listOfExercises = await getAllExercises();
		const selectedItem = {}; // listOfExercises.find((item) => item.id === id);
		// newinitVals.name=	selectedItem.name
		// newinitVals.category=selectedItem.category
		// newinitVals.status	selectedItem.status
		// selectedItem.instructions: "",
		// selectedItem.targetArea: ""

		setNewinitVals(selectedItem);
	};
	return (
		<div>
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
					isSubmitting,
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
										onClick={() => props.setEditModal(false)}
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
													// onChange={(e) => {
													// 	props.item.name = e.target.value;
													// }}
													// value={props.item.name}
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
									</Col>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<div className="flexStart mb30">
											<span className="addBlogInputLabel">Subject</span>
											<div style={{ marginTop: 10 }}>
												<input
													type={"text"}
													name="subject"
													className="addBlogInput inputText"
													// onChange={(e) => {
													// 	props.item.name = e.target.value;
													// }}
													// value={props.item.name}
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.subject}
												/>
												{errors.subject && touched.subject ? (
													<Typography
														alignment="left"
														title={errors.subject}
														fontFamily="Gilroy-Medium"
														color="red"
														type="label"
													/>
												) : null}
											</div>
										</div>
									</Col>
								</Row>
								<div className="flexStart mb30" style={{ width: "100%" }}>
									<span className="addBlogInputLabel">Target Area</span>
									<div style={{ marginTop: 10 }}>
										<TextArea
											className="inputText inputBackgroundGrey"
											rows={8}
											cols={20}
											name="description"
											placeholder="Please enter Target Area"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.description}
										/>
										{errors.description && touched.description ? (
											<Typography
												alignment="left"
												title={errors.description}
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
											className="inputText"
											rows={8}
											cols={20}
											name="reply"
											placeholder="Please enter Target Area"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.reply}
										/>
										{errors.reply && touched.reply ? (
											<Typography
												alignment="left"
												title={errors.reply}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default EditCampaign;
