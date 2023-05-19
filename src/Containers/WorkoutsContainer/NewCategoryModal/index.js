import Modal from "react-modal";
import React from "react";
import Wrapper from "../../../Components/Wrapper";
import Typography from "../../../Components/Typography";
import "./index.css";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import UserSchema, { initVals } from "./Constants";
import union from "./../../../Assets/Union.png";
import CustomButton from "../../../Components/CustomButton";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { message, notification, Input } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
// import { primaryColor } from "../../../Constants";
import { addWorkoutCategory } from "../../../Helpers/firebase";
const { TextArea } = Input;

function NewCategoryModal({ open, setOpen }) {
	const [addingUser, setAddingUser] = React.useState(false);
	const [imageurl, setImageUrl] = React.useState("");
	const customStyles = {
		content: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			width: 713,
			height: 471,
			backgroundColor: "#fff",
			borderRadius: 16,
			borderTopStartRadius: 16,
			paddingLeft: 60,
			paddingRight: 25,
			paddingTop: 30,
			paddingBottom: 30,
			marginBottom: 20,
			overflowX: "hidden",
			overflowY: "hidden",
			zIndex: 2000,
			alignSelf: "center",
		},
	};
	const AddUserToList = async (values) => {
		if (!imageurl) {
			message.error("Please add an Image for Category");
			return;
		}
		setAddingUser(true);
		values.image = imageurl;
		if (await addWorkoutCategory(values)) {
			notification.success({
				message: `Successfully added new category!`,
				description: `${values.name}  has been successfully added to Category list`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setAddingUser(false);
					setOpen(false);
				},
			});
		} else {
			notification.error({
				message: `Failed to add`,
				description: `Please try again later`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setAddingUser(false);
				},
			});
		}
	};
	return (
		<Modal
			isOpen={open}
			onRequestClose={() => setOpen(false)}
			style={customStyles}
			contentLabel="Exercise Category Modal"
		>
			<div
				style={{
					border: 0,
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#fff",
					// paddingRight: 12,
					// paddingLeft: 12,
					width: "100%",
					maxWidth: 713,
				}}
			>
				<Wrapper type="rowSpaced" marginTop={0} marginBottom={24}>
					<span className="categoryModalHeading">Category Details</span>
					<img
						src={union}
						alt="Close icon"
						onClick={() => setOpen(false)}
						style={{ width: 14, height: 14 }}
						className="closeIcon"
					/>
				</Wrapper>
				<Formik
					initialValues={initVals}
					validationSchema={UserSchema}
					onSubmit={(values) => {
						AddUserToList(values);
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
							<div className="formCol">
								<div className="centerAligner">
									{imageurl ? (
										<div className="colCenteral" style={{ width: 212 }}>
											<img
												src={imageurl}
												alt="UserImage"
												style={{
													width: 212,
													height: 244,
													borderRadius: 16,
													marginBottom: 16,
												}}
											/>
											<div
												className="centerAligner newCategorybtn"
												onClick={() => setImageUrl("")}
											>
												Update Image
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
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-start",
										marginTop: -20,
										marginLeft: 24,
									}}
								>
									{/**Full Name*/}

									<Wrapper type="rowSpaced">
										<div className="fieldDiv" style={{ width: "100%" }}>
											<Wrapper type="rowStart" marginBottom={8}>
												<span className="inputLabel">Category Name</span>
											</Wrapper>
											<input
												type={"text"}
												name="name"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.name}
												className="regularInput"
											/>
										</div>
									</Wrapper>
									<Wrapper type="rowSpaced">
										<div>
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
									</Wrapper>
									{/**Email*/}
									<div className="fieldDiv">
										<Wrapper type="rowStart" marginBottom={8}>
											<span className="inputLabel">Description</span>
										</Wrapper>
										<TextArea
											className="addBlogInput inputText"
											rows={8}
											name="description"
											placeholder="Please enter category description"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.description}
											style={{ width: 380, height: 156 }}
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
							</div>
							{/**Add User Button */}
							<div className="centerMe" style={{ marginTop: 24 }}>
								{addingUser ? (
									<SpinnerComponent size={"small"} />
								) : (
									<CustomButton
										large={true}
										onClick={() => {
											handleSubmit();
											console.log("errors", errors);
										}}
										title="Add"
									/>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Modal>
	);
}

export default NewCategoryModal;
