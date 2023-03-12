import React from "react";
import CustomButton from "../../../Components/CustomButton";
import CategorySchema from "../Add/Constants";
import { Formik, Form } from "formik";
// import axios from "axios";
import { Select, Radio, Input, Checkbox, notification, message } from "antd";
// import { getToken, xApiKey } from "../../Helpers/tokenManagement";
// import { apiGetRequest } from "../../Helpers/axiosRequests";
// import { endpoints } from "../../Helpers/dbConfig";
import Typography from "../../../Components/Typography";
import Wrapper from "../../../Components/Wrapper";
import { AiFillDelete } from "react-icons/ai";
import CustomDropZone from "../../../Components/CustomDropZone";
import { updateWorkout, uploadImage } from "../../../Helpers/firebase";
const { TextArea } = Input;

const { Option } = Select;

const EditCampaign = (props) => {
	const [fileList, setFileList] = React.useState([]);
	const [imageError, setImageError] = React.useState(false);
	const [product, setProduct] = React.useState(
		props.activeCategory.productId ?? ""
	);
	const [productError, setProductError] = React.useState(null);
	const [prize, setPrize] = React.useState(props.activeCategory.prizeId ?? "");
	const [prizeError, setPrizeError] = React.useState(null);
	const [imageRecieved, setImageRecieved] = React.useState(
		props.activeCategory.image
	);
	const addCategoryToList = async (values) => {
		if (!imageRecieved && fileList.length < 1) {
			message.error("Please attach an image");
			setImageError(true);
			return;
		}

		values.image = imageRecieved ?? (await uploadImage(fileList[0]));
		values.id = props.activeCategory.id;
		if (await updateWorkout(values)) {
			notification.success({
				message: `Successfully Updated!`,
				description: `${values.name}  has been successfully Updated`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					props.setEditModal(false);
				},
			});
			return;
		} else {
			notification.error({
				message: `Failed to add!`,
				description: `Give it a try later.`,
				placement: "topRight",
				duration: 2,
				onClose: function () {},
			});
		}
	};
	const removeImage = (innerIdex) => {
		let tempList = fileList.filter((item, index) => index !== innerIdex);
		setFileList(tempList);
	};
	const { name, isActive, targetArea } = props.activeCategory ?? null;

	return (
		<div style={{ width: "100%", maxWidth: 390 }}>
			<Formik
				initialValues={{
					name,
					targetArea,
					isActive,
				}}
				validationSchema={CategorySchema}
				onSubmit={addCategoryToList}
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
						<Wrapper
							type="rowSpaced"
							marginTop={10}
							marginBottom={49}
							w={"100%"}
						>
							<Typography
								alignment="left"
								title="Edit campaign"
								fontFamily="Gilroy-Bold"
								color="#0F172A"
								type="Heading"
							/>

							<img
								src={"/Union.png"}
								alt="Close icon"
								onClick={() => props.setEditModal(false)}
								style={{ width: 20, height: 20, cursor: "pointer" }}
							/>
						</Wrapper>
						{/**Sub Category Image */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Image"
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
							{imageRecieved ? (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										border: "1px solid black",
									}}
								>
									<img
										src={imageRecieved ?? "/noImage.png"}
										style={{ height: 80, width: 40, objectFit: "contain" }}
									/>
									<AiFillDelete
										onClick={() => {
											setImageRecieved(null);
										}}
									/>
								</div>
							) : (
								<CustomDropZone {...{ fileList, setFileList, setImageError }} />
							)}
							{fileList.length > 0 && (
								<div
									style={{
										display: "flex",
										alignItems: "flex-start",
										justifyContent: "flex-start",
										flexDirection: "column",
									}}
								>
									{fileList.map((item, index) => {
										return (
											<div
												key={index}
												style={{ padding: 5, border: "1px solid black" }}
											>
												<span>{JSON.stringify(item)}</span>{" "}
												<AiFillDelete
													style={{ color: "red", cursor: "pointer" }}
													onClick={() => removeImage(index)}
												/>
											</div>
										);
									})}
								</div>
							)}
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

						{/**Name Input */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Name"
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
								name="name"
								className="inputStyle"
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
						{/* {"Target Area"} */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Target Area"
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
								name="quantity"
								className="inputStyle"
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

						{/**Category Status */}
						<div className="fieldDiv">
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
								name="isActive"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.isActive}
								defaultValue={values.isActive}
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

						{/**Add Product Button */}
						<div className="modalButtonStyle">
							<CustomButton
								large={true}
								onClick={() => {
									handleSubmit();
								}}
								title="Update"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default EditCampaign;
