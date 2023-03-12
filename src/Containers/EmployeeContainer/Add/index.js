import React from "react";
import Typography from "../../../Components/Typography";
import union from "./../../../Assets/Union.png";

import Wrapper from "../../../Components/Wrapper";
import { message, notification, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import CustomButton from "../../../Components/CustomButton";
import { Formik, Form } from "formik";
import UserSchema, { initVals } from "../Constants";
import { addEmployee } from "../../../Helpers/firebase";
import { primaryColor } from "../../../Constants";
import EmployeeDropZone from "../EmployeeDropZone";
const { Option } = Select;
const Add = (props) => {
	const [addingUser, setAddingUser] = React.useState(false);
	// const [roleError, setRoleError] = React.useState(false);
	const [imageurl, setImageUrl] = React.useState(null);
	const AddUserToList = async (values) => {
		if (!imageurl) {
			message.error("Please add an Image for Employee");
			// alert("error");
			return;
		}
		// if (!values.role) {
		// 	setRoleError(true);
		// 	return;
		// }
		setAddingUser(true);
		values.image = imageurl;
		// if (
		// 	props.employeeListing.length > 0 &&
		// 	props.employeeListing.findIndex((item) => item.email === values.email) >=
		// 		0
		// ) {
		// 	notification.error({
		// 		message: `Employee already exists!`,
		// 		description: `error: please choose a different name`,
		// 		placement: "topRight",
		// 		duration: 3,
		// 		onClose: function () {
		// 			setAddingUser(false);
		// 		},
		// 	});
		// 	return;
		// }
		if (await addEmployee(values)) {
			notification.success({
				message: `Successfully added!`,
				description: `${values.fullName}  has been successfully added to list`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setAddingUser(false);
					props.setAddModal(false);
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
				<Typography
					alignment="left"
					title="Add A New Employee"
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>

				<img
					src={union}
					alt="Close icon"
					onClick={() => props.setAddModal(false)}
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
						<div
							style={{
								// display: "flex",
								// flexDirection: "column",
								// alignItems: "center",
								// justifyContent:'center',
								border: 0,
								backgroundColor: "#fff",
								paddingRight: 35,
								// paddingLeft: 60,
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
										}}
									>
										<img
											src={imageurl}
											alt="UserImage"
											style={{ width: 156, height: 156, borderRadius: "50%" }}
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
								{/* 							
								<div className="fieldDiv">
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Role"
											fontFamily="Gilroy-Medium"
											color="#0F172A"
											type="label"
										/>

										<Typography
											alignment="left"
											title="*"
											fontFamily="Gilroy-Medium"
											color="#E1552F"
											type="label"
										/>
									</Wrapper>

									<Select
										showSearch
										placeholder="Select Role"
										optionFilterProp="children"
										size="large"
										defaultValue={values.role}
										name="role"
										onChange={(e) => {
											setRoleError(false);
											values.role = e;
										}}
										onBlur={handleBlur}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										className="selectStyle"
									>
										<Option key={1} value={"User"}>
											User
										</Option>
										<Option key={2} value={"Trainer"}>
											Trainer
										</Option>
									</Select>

									{roleError ? (
										<Typography
											alignment="left"
											title={"User Role is required!"}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>
								<div className="fieldDiv">
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Joinning date"
											fontFamily="Gilroy-Medium"
											color="#0F172A"
											type="label"
										/>

										<Typography
											alignment="left"
											title="*"
											fontFamily="Gilroy-Medium"
											color="#E1552F"
											type="label"
										/>
									</Wrapper>

									<DatePicker
										className="selectStyle"
										name="joinningDate"
										onChange={(e, dateString) => {
											values.joinningDate = moment(dateString).format("LL");
										}}
										size="large"
										onBlur={handleBlur}
									/>

									{errors.joinningDate && touched.joinningDate ? (
										<Typography
											alignment="left"
											title={errors.joinningDate}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div> */}
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
									title="Add Employee"
								/>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Add;
