// import SingleCategoryEntry from "./Single";
import "./index.css";
// const AddProductCategory = (props) => {
// 	return (
// 		<div className="cardAdditionBlog">
// 			<span className="tableTitle">Basic Detail</span>
// 			<div className="barVertical" />
// 			<SingleCategoryEntry {...{ props }} />
// 		</div>
// 	);
// };

// export default AddProductCategory;

import React from "react";
import CustomButton from "../../../Components/CustomButton";
import { CloseOutlined } from "@ant-design/icons";
import CategorySchema, { initVals } from "./Constants";
import { Formik, Form } from "formik";
import { Select, Radio, Progress, notification, message } from "antd";
import { AiFillDelete } from "react-icons/ai";
import Typography from "../../../Components/Typography";
import Wrapper from "../../../Components/Wrapper";
import { addExercise, uploadImage } from "../../../Helpers/firebase";
import CustomDropZone from "../../../Components/CustomDropZone";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
const { Option } = Select;

const AddProductCategory = (props) => {
	// const [fileList, setFileList] = React.useState([]);
	// const [imageError, setImageError] = React.useState(false);
	const [imageurl, setImageUrl] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [progressPercent, setProgressPercent] = React.useState(0);
	const addCategoryToList = async (values) => {
		if (!imageurl) {
			message.error("Please attach an image");
			// setImageError(true);
			return;
		}
		// setImageError(false);
		// console.log("values", values);
		// return;
		setIsLoading(true);
		setProgressPercent(25);
		values.img = imageurl;
		setProgressPercent(50);
		console.log("values", values);
		if (await addExercise(values)) {
			setProgressPercent(100);
			notification.success({
				message: `Successfully Added!`,
				description: `${values.name}  has been successfully added`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					props.setAddModal(false);
					setIsLoading(false);
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
					setIsLoading(false);
				},
			});
		}
	};

	return (
		<div>
			<Formik
				initialValues={initVals}
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
									<span className="draftBtn">Save as draft</span>
									<span className="savebtn" onClick={handleSubmit}>
										Save
									</span>
								</div>
							)}
						</div>
						<div className="cardAdditionBlog">
							<span className="tableTitle">Basic Detail</span>
							<div className="barVertical" />
							<div className="rowFlexCenter mb30">
								{/**Name Input */}
								<div className="flexStart mb30 mr72">
									<span className="addBlogInputLabel">PROGRAM NAME</span>
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
								{/* {"Target Area"} */}
								<div className="flexStart">
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
											<option value="default" selected={true} disabled={true}>
												Select Exercise
											</option>
											<option value="Chest">Chest</option>
											<option value="Arms">Arms</option>
											<option value="Back">Back</option>
											<option value="Shoulders">Shoulders</option>
											<option value="Legs">Legs</option>
											<option value="Abs">Abs</option>
											<option value="Core">Core</option>
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
							<div className="rowFlexCenter mb30">
								{/** Image */}
								<div className="flexStart mrDynamic">
									<span className="addBlogInputLabel">EXERCISE IMAGE</span>
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
												{...{ setImageUrl: setImageUrl, small: false }}
											/>
										)}
										{/* {imageError ? (
											<Typography
												alignment="left"
												title={"Image is required!"}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										) : (
											""
										)} */}
									</div>
								</div>
								{/** Status */}
								<div className="flexStart">
									<span className="addBlogInputLabel">STATUS</span>
									<div style={{ marginTop: 10 }}>
										<Radio.Group
											name="isActive"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.isActive}
											defaultValue={values.isActive}
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
										{errors.isActive && touched.isActive ? (
											<Typography
												alignment="left"
												title={errors.isActive}
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
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default AddProductCategory;
