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

const Clone = (props) => {
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
		<div style={{ width: "100%", height: 304 }}>
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
						<div className="flexEnd">
							<RxCross2
								onClick={() => props.setCloneModal(false)}
								style={{
									width: 20,
									height: 20,
									cursor: "pointer",
									marginBottom: -20,
									marginRight: -10,
								}}
							/>
						</div>
						<div
							style={{
								border: 0,
								backgroundColor: "#fff",
								paddingRight: 35,
								display: "flex",
								width: "100%",
								justifyContent: "center",
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
										style={{ width: 212, height: 244, borderRadius: 16 }}
									/>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									marginTop: 0,
									paddingLeft: 24,
								}}
							>
								{/**Full Name*/}
								<div className="rowing">
									<Wrapper type="rowStart" marginBottom={16} w={164}>
										<span className="viewHeading">{values.fullName} </span>
									</Wrapper>
								</div>
								{/**Email*/}
								<Wrapper type="rowStart" marginBottom={16}>
									<span className="viewLabel">{values.email}</span>
								</Wrapper>

								{/**Address*/}
								<Wrapper type="rowStart" marginBottom={16}>
									<span className="viewLabel">{values.address}</span>
								</Wrapper>
								{/**Phone Number*/}
								<Wrapper type="rowStart" marginBottom={0}>
									<span className="viewLabel">{values.phonenumber}</span>
								</Wrapper>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default Clone;
