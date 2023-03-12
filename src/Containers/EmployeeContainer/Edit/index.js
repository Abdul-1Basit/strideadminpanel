import React from "react";
import { message, notification } from "antd";
import Typography from "../../../Components/Typography";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import CustomButton from "../../../Components/CustomButton";
import { Formik, Form } from "formik";
import UserSchema from "../Constants";
import Wrapper from "../../../Components/Wrapper";
import { updateEmployee } from "../../../Helpers/firebase";
import { RxCross2 } from "react-icons/rx";
import EmployeeDropZone from "../EmployeeDropZone";

const Edit = (props) => {
	const { image, fullName, email, password, address, role, phonenumber } =
		props.activeCategory;
	const [addingUser, setAddingUser] = React.useState(false);
	const [imageurl, setImageUrl] = React.useState(image);

	const AddUserToList = async (values) => {
		if (!imageurl) {
			message.error("Please add an Image for Employee");
			return;
		}

		setAddingUser(true);
		values.id = props.activeCategory.id;
		values.image = imageurl;
		console.log("values", values);

		if (await updateEmployee(values)) {
			notification.success({
				message: `Successfully updated!`,
				description: `${values.fullName}  has been successfully updated`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setAddingUser(false);
					props.setEditModal(false);
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
		<div style={{ width: "100%" }}>
			<Formik
				initialValues={{
					image,
					fullName,
					email,
					password,
					address,
					role,
					phonenumber,
				}}
				validationSchema={UserSchema}
				onSubmit={(values) => AddUserToList(values)}
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
							<p className="editModalHeading">Edit employee Details</p>
							<RxCross2
								onClick={() => props.setEditModal(false)}
								style={{ width: 20, height: 20, cursor: "pointer" }}
							/>
						</div>
						<div
							style={{
								border: 0,
								backgroundColor: "#fff",
								paddingRight: 35,
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
								alignItems: "flex-start",
								flexDirection: "row",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{imageurl ? (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											flexDirection: "column",
										}}
									>
										<img
											src={imageurl}
											alt="UserImage"
											style={{ width: 212, height: 214, borderRadius: "50%" }}
										/>
										<div
											// className="centerAligner"
											// style={{
											// 	textDecorationLine: "underline",
											// 	color: "#F94F00",
											// 	cursor: "pointer",
											// }}
											className="updateTxt"
											onClick={() => setImageUrl("")}
										>
											Update Image
										</div>
									</div>
								) : (
									<EmployeeDropZone
										{...{ setImageUrl: setImageUrl, small: false }}
									/>
								)}
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginTop: -20,
								}}
							>
								{/**Full Name*/}

								<Wrapper type="rowSpaced">
									<div className="fieldDiv" style={{ width: "100%" }}>
										<Wrapper type="rowStart" marginBottom={8}>
											<span className="inputLabel">Employee Name </span>
										</Wrapper>
										<input
											type={"text"}
											name="fullName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.fullName}
											className="regularInput"
										/>
									</div>
								</Wrapper>
								<Wrapper type="rowSpaced">
									<div>
										{errors.fullName && touched.fullName ? (
											<Typography
												alignment="left"
												title={errors.fullName}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										) : (
											""
										)}
									</div>
									<div>
										{errors.lastName && touched.lastName ? (
											<Typography
												alignment="left"
												title={errors.lastName}
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
										<span className="inputLabel">Email</span>
									</Wrapper>
									<input
										type={"email"}
										name="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										// name="email"
										className="regularInput"
									/>
									{errors.email && touched.email ? (
										<Typography
											alignment="left"
											title={errors.email}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>
								{/**Password     */}
								<div className="fieldDiv">
									<Wrapper type="rowStart" marginBottom={8}>
										<span className="inputLabel">Password</span>
									</Wrapper>
									<input
										type={"password"}
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										className="regularInput"
									/>
									{errors.password && touched.password ? (
										<Typography
											alignment="left"
											title={errors.password}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>
								{/**Address*/}
								<div className="fieldDiv">
									<Wrapper type="rowStart" marginBottom={8}>
										<span className="inputLabel">Address</span>
									</Wrapper>
									<input
										type={"text"}
										name="address"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.address}
										// name="address"
										className="regularInput"
									/>
									{errors.address && touched.address ? (
										<Typography
											alignment="left"
											title={errors.address}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>

								{/**Phone Number*/}
								<div className="fieldDiv">
									<Wrapper type="rowStart" marginBottom={8}>
										<span className="inputLabel">Phone Number</span>
									</Wrapper>
									<input
										type={"text"}
										name="phonenumber"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.phonenumber}
										// name="phon"
										className="regularInput"
									/>
									{errors.phonenumber && touched.phonenumber ? (
										<Typography
											alignment="left"
											title={errors.phonenumber}
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
									}}
									title="Update"
								/>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default Edit;
