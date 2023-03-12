import React from "react";
import CustomButton from "../../../../Components/CustomButton";
import CategorySchema, { initVals } from "../Constants";
import { Formik, Form } from "formik";
import { Select, Radio, notification, message } from "antd";
import { AiFillDelete } from "react-icons/ai";
import Typography from "../../../../Components/Typography";
import Wrapper from "../../../../Components/Wrapper";
import {
	addWorkout,
	getAllExercises,
	uploadImage,
} from "../../../../Helpers/firebase";
import CustomDropZone from "../../../../Components/CustomDropZone";
import SpinnerComponent from "../../../../Components/SpinnerComponent";
// const { Option } = Select;

const SingleCategoryEntry = ({ props }) => {
	const [fileList, setFileList] = React.useState([]);
	const [imageError, setImageError] = React.useState(false);
	const [exercisesList, setExercisesList] = React.useState([]);
	const [selectedExercisesList, setSelectedExercisesList] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(false);
	const addCategoryToList = async (values) => {
		if (!fileList || fileList.length < 1) {
			message.error("Please attach an image");
			setImageError(true);
			return;
		}

		setIsLoading(true);
		values.image = await uploadImage(fileList[0]);

		if (await addWorkout(values)) {
			notification.success({
				message: `Successfully Added!`,
				description: `${values.name}  has been successfully added`,
				placement: "topRight",
				duration: 3,
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

	const removeImage = (innerIdex) => {
		let tempList = fileList.filter((item, index) => index !== innerIdex);
		setFileList(tempList);
	};
	React.useEffect(() => {
		if (exercisesList.length === 0) {
			fetchExercises();
		}
	}, [exercisesList.length]);
	const fetchExercises = async () => {
		const exercList = await getAllExercises();
		setExercisesList(exercList);
	};
	return (
		<div style={{ width: "100%", maxWidth: 390 }}>
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
							{/* <DropZoneComponent {...{ fileList, setFileList }} /> */}
							{/* {fileList.length} */}
							<CustomDropZone {...{ fileList, setFileList, setImageError }} />
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
												<span>{item.name}</span>{" "}
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
						</div>{" "}
						{/* {"Exercises"} */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Exercises"
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
								mode="multiple"
								placeholder="Search exercises"
								value={selectedExercisesList}
								onChange={setSelectedExercisesList}
								style={{
									width: "100%",
								}}
								options={exercisesList
									.filter((item) => !selectedExercisesList.includes(item.id))
									.map((item) => ({
										value: item.id,
										label: item.name,
									}))}
							/>
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
								name="targetArea"
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
						{/** Status */}
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
								//value={values.isActive}

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
							{isLoading ? (
								<SpinnerComponent />
							) : (
								<CustomButton
									large={true}
									onClick={() => {
										// if (!categoryType) {
										// 	setCategoryTypeError(true);
										// } else {
										// 	setCategoryTypeError(false);
										// 	handleSubmit();
										// }
										handleSubmit();
									}}
									title="Add"
								/>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default SingleCategoryEntry;
