import React from "react";
import "./index.css";
import { Select, notification, message } from "antd";
import EmployeeDropZone from "../../EmployeeContainer/EmployeeDropZone";
import { primaryColor } from "../../../Constants";
import { CloseOutlined } from "@ant-design/icons";
import { initVals, blogSchema } from "../Constants";
import { Formik } from "formik";
import RichTextEditor from "react-rte";
import Typography from "../../../Components/Typography";
import { addBlog } from "../../../Helpers/firebase";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "../../../Components/SpinnerComponent";
const AddBlogContainer = (props) => {
	const [addingUser, setAddingUser] = React.useState(false);
	// const [roleError, setRoleError] = React.useState(false);
	const navigate = useNavigate();
	const [value, setValue] = React.useState(RichTextEditor.createEmptyValue());
	const [imageurl, setImageUrl] = React.useState(null);
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};
	const onSearch = (value) => {
		console.log("search:", value);
	};
	const addBlogToList = async (values) => {
		if (!imageurl) {
			message.error("Please add an Image for Employee");
			return;
		}
		values.image = imageurl;
		setAddingUser(true);
		let response = await addBlog(values);
		if (response) {
			notification.success({
				message: `Successfully added!`,
				description: `${values.name} has been successfully added to list`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					setAddingUser(false);
					navigate(-1);
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
		<Formik
			initialValues={initVals}
			validationSchema={blogSchema}
			onSubmit={addBlogToList}
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
							<SpinnerComponent size={"small"} />
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
						<div className="rowingStart">
							<span className="tableTitle mr500">Basic Detail</span>
							<span className="tableTitle" style={{ marginLeft: 265 }}>
								Upload a Media
							</span>
						</div>
						<div className="barVertical" />
						<div className="rowingStart">
							<div className="mr500">
								<div className="flexStart mb30">
									<span className="addBlogInputLabel">Blog Title</span>
									<div style={{ marginTop: 10 }}>
										<input
											className="addBlogInput"
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
									<span className="addBlogInputLabel">Status</span>
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
														: "#F4F4F4",
												color:
													values.status === "Active" ||
													values.status === "Pending"
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
									{/* <div className="flexStart" style={{ marginTop: 10 }}>
										<Select
											showSearch
											// className="addBlogInput"
											placeholder="Select status"
											optionFilterProp="children"
											size="large"
											onChange={(val) => {
												values.status = val;
											}}
											style={{
												width: 416,
												backgroundColor:
													values.status === "Active"
														? "#5DB135"
														: values.status === "Inactive"
														? "#E2BB2E"
														: "#fff",
											}}
											filterOption={(input, option) =>
												(option?.label ?? "")
													.toLowerCase()
													.includes(input.toLowerCase())
											}
											options={[
												{
													value: "Active",
													label: "Active",
												},
												{
													value: "Inactive",
													label: "Inactive",
												},
											]}
										/>
										{errors.status && touched.status ? (
											<Typography
												alignment="left"
												title={errors.status}
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
							<div>
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
							</div>
						</div>
						<div>
							<span className="addBlogInputLabel">DESCRIPTION</span>
							<div style={{ marginTop: 10, width: "100%" }}>
								<RichTextEditor
									value={value}
									onChange={(val) => {
										// console.log("value", val.toString("html"));
										setValue(val);
										values.description = val.toString("html");
									}}
									editorStyle={{
										height: 441,
										marginBottom: 50,
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
					</div>
				</div>
			)}
		</Formik>
	);
};

export default AddBlogContainer;
