import React from "react";
import {
	message,
	notification,
	DatePicker,
	Radio,
	Input,
	Select,
	Upload,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Typography from "../../../../Components/Typography";
import imgg from "../../../../Assets/uzer.jpg";
import SpinnerComponent from "../../../../Components/SpinnerComponent";
import CustomButton from "../../../../Components/CustomButton";
import { Formik, Form } from "formik";
// import { endpoints } from "../../../../Helpers/dbConfig";
// import { apiPostRequest } from "../../../../Helpers/axiosRequests";
import UserSchema, { initVals } from "../../Constants";
import Styles from "../Styles";
import Wrapper from "../../../../Components/Wrapper";
import { addUser, uploadImage } from "../../../../Helpers/firebase";
import moment from "moment";

const { Option } = Select;

const SingleUserEntry = (props) => {
	const [addingUser, setAddingUser] = React.useState(false);
	const [fileList, setFileList] = React.useState([]);
	const [uploading, setUploading] = React.useState(false);
	const [imageurl, setImageUrl] = React.useState(null);
	const [imageError, setImageError] = React.useState(false);
	//const [imageName, setImageName] = React.useState(null);
	// const [userType, setUserType] = React.useState("Admin");
	const [status, setStatus] = React.useState(1);
	// const [userTypeError, setUserTypeError] = React.useState(null);

	const handleUpload = async () => {
		if (fileList.length < 1) {
			message.error("no file attached");
			return;
		}

		// const formData = new FormData();
		// fileList.forEach((file) => {
		// 	formData.append("file", file);
		// });

		setUploading(true);

		try {
			setImageUrl(await uploadImage(fileList[0]));
			//		console.log("data is", response.data);
			//	setImageName("response.data.data.imageName");
			setImageError(false);
			setFileList([]);

			// const response = await apiPostRequest(
			// 	endpoints.userImageUpload,
			// 	formData
			// );

			// if (response.status === 200) {
			// 	message.success("upload successfully.");
			// 	setImageUrl(response.data.data.url);
			// 	console.log("data is", response.data);
			// 	setImageName(response.data.data.imageName);
			// 	setImageError(false);
			// 	setFileList([]);
			// }
		} catch (error) {
			message.error("Error: " + error.response.data.message);
		} finally {
			setUploading(false);
		}
	};

	const uploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			return {
				fileList: newFileList,
			};
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	const AddUserToList = async (values) => {
		// console.log("values", values);
		setAddingUser(true);
		values.image = imageurl;
		values.isActive = status;
		values.role = "User";

		if (await addUser(values)) {
			notification.success({
				message: `Successfully added!`,
				description: `${
					values.firstName + " " + values.lastName
				}  has been successfully added to list`,
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
				onClose: function () {},
			});
		}
	};

	// const checkVals = (handleSubmit) => {
	// 	console.log("checking");
	// 	if (!userType) {
	// 		setUserTypeError(true);
	// 		//console.log("truuuuu");
	// 		return;
	// 	} else {
	// 		setUserTypeError(false);
	// 		//console.log("falsee");
	// 		handleSubmit();
	// 	}
	// };
	return (
		<div style={{ width: "100%" }}>
			<Formik
				initialValues={initVals}
				validationSchema={UserSchema}
				onSubmit={(values) => AddUserToList(values)}
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
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								border: 0,
								backgroundColor: "#fff",
								paddingRight: 12,
								paddingLeft: 12,
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									paddingLeft: 12,
									paddingRight: 12,
								}}
							>
								<div style={Styles.centerlizeColumn}>
									<img
										src={imageurl ?? imgg}
										alt="UserImage"
										style={{ width: 156, height: 156, borderRadius: "50%" }}
									/>
									<div
										style={{ marginTop: -35, marginLeft: 80, display: "flex" }}
									>
										<Upload
											{...uploadProps}
											progress={{ strokeWidth: 2, showInfo: false }}
											onChange={() => handleUpload()}
										>
											{uploading ? (
												<SpinnerComponent size={"small"} />
											) : (
												<img
													src={"/editImageIcon.png"}
													alt="Edit Icon"
													style={{ width: 32, height: 32, borderRadius: "50%" }}
												/>
											)}
										</Upload>
									</div>

									{imageError ? (
										<Typography
											alignment="left"
											title={"Image is required!"}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>
								{/**First and Last Name*/}

								<Wrapper type="rowSpaced" w="100%">
									<div className="fieldDiv" style={{ width: "100%" }}>
										<Wrapper type="rowStart" marginBottom={8}>
											<Typography
												alignment="left"
												title="First name"
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
										<input
											type={"text"}
											name="firstName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.firstName}
											className="inputStyle"
										/>
									</div>
									<div className="fieldDiv" style={{ width: "100%" }}>
										<Wrapper type="rowStart" marginBottom={8}>
											<Typography
												alignment="left"
												title="Last name"
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
										<div style={{ width: "100%" }}>
											<input
												type={"text"}
												name="lastName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.lastName}
												className="inputStyle"
											/>
										</div>
									</div>
								</Wrapper>
								<Wrapper type="rowSpaced" w="100%">
									<div>
										{" "}
										{errors.firstName && touched.firstName ? (
											<Typography
												alignment="left"
												title={errors.firstName}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										) : (
											""
										)}
									</div>
									<div>
										{" "}
										{""}{" "}
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
								{/**Role */}
								{/* <div className="fieldDiv" style={{ width: "100%" }}>
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
										defaultValue={userType}
										onChange={(val) => {
											// console.log("setting false");
											if (userTypeError) {
												setUserTypeError(false);
												// console.log("setting false");
											}
											setUserType(val);
										}}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										className="selectStyle"
									>
										<Option value={"Admin"}>Admin</Option>
										<Option value={"Customer"}>User</Option>
									</Select>

									{userTypeError ? (
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
								</div> */}

								{/**Email*/}
								<div className="fieldDiv" style={{ width: "100%" }}>
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Email"
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
									<input
										type={"email"}
										name="emailAddress"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.emailAddress}
										// name="emailAddress"
										className="inputStyle"
									/>
									{errors.emailAddress && touched.emailAddress ? (
										<Typography
											alignment="left"
											title={errors.emailAddress}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>

								{/**PhoneNumber     */}
								<div className="fieldDiv" style={{ width: "100%" }}>
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Phone Number"
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
									<input
										type={"email"}
										name="phoneNumber"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.phoneNumber}
										className="inputStyle"
									/>
									{errors.phoneNumber && touched.phoneNumber ? (
										<Typography
											alignment="left"
											title={errors.phoneNumber}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>
								{/**Password     */}
								<div className="fieldDiv" style={{ width: "100%" }}>
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Password"
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
									<Input.Password
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										size="large"
										iconRender={(visible) =>
											visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
										}
										className="inputStyle"
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
								{/**Gender */}
								<div className="fieldDiv" style={{ width: "100%" }}>
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Gender"
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
										placeholder="Select Gender"
										optionFilterProp="children"
										size="large"
										name="gender"
										defaultValue={values.gender}
										onChange={(val) => handleChange(val)}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										className="selectStyle"
									>
										<Option value={"Male"}>Male</Option>
										<Option value={"Female"}>Female</Option>
									</Select>

									{errors.gender && touched.gender ? (
										<Typography
											alignment="left"
											title={errors.gender}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>

								{/**Date of Birth */}
								<div className="fieldDiv" style={{ width: "100%" }}>
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Date of Birth"
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
										className="inputStyle"
										name="dob"
										onChange={(e, dateString) => {
											values.dob = moment(dateString).format("LL");
										}}
										onBlur={handleBlur}
									/>

									{errors.dob && touched.dob ? (
										<Typography
											alignment="left"
											title={errors.dob}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									) : (
										""
									)}
								</div>
								{/**User Status */}
								<div className="fieldDiv" style={{ width: "100%" }}>
									<Wrapper type="rowStart" marginBottom={8}>
										<Typography
											alignment="left"
											title="Status"
											fontFamily="Gilroy-Medium"
											color="#0F172A"
											type="label"
										/>
									</Wrapper>
									<Radio.Group
										onChange={(e) => {
											setStatus(e.target.value);
										}}
										defaultValue={1}
									>
										<Radio value={1}>
											<Typography
												alignment="left"
												title="Active"
												fontFamily="Gilroy-Medium"
												color="#64748B"
												type="label"
											/>
										</Radio>
										<Radio value={0}>
											<Typography
												alignment="left"
												title="Inactive"
												fontFamily="Gilroy-Medium"
												color="#64748B"
												type="label"
											/>
										</Radio>
									</Radio.Group>
								</div>

								{/**Add User Button */}
								<div className="modalButtonStyle" style={{ width: "100%" }}>
									{addingUser ? (
										<SpinnerComponent size={"small"} />
									) : (
										<CustomButton
											large={true}
											onClick={() => {
												handleSubmit();
											}}
											title="Add"
										/>
									)}
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default SingleUserEntry;
