import React from "react";
import { notification, message, Input } from "antd";
import { Formik, Form } from "formik";
import Typography from "../../../../Components/Typography";
import ProductSchema, { initVals } from "../../Constants";
import Wrapper from "../../../../Components/Wrapper";
import { addProduct } from "../../../../Helpers/firebase";
import CustomDropZone from "../../../../Components/CustomDropZone";

import SpinnerComponent from "../../../../Components/SpinnerComponent";
import { MdDeleteOutline } from "react-icons/md";

const { TextArea } = Input;

const SingleProductEntry = (props) => {
	const [titleImage, setTitleImage] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const addProductToList = async (values) => {
		if (!titleImage) {
			message.error("Please add a title image!");
			return;
		}

		setIsLoading(true);
		values.images = [titleImage].filter(Boolean).join(", ");
		console.log("values are", values);
		if (await addProduct(values)) {
			notification.success({
				message: `Successfully Added!`,
				description: `${values.productName}  has been successfully added`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					props.setAddModal(false);
					setIsLoading(false);
				},
			});
		} else {
			notification.error({
				message: `Failed to add`,
				description: `error: couldn't add product`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setIsLoading(false);
				},
			});
		}
	};
	return (
		<Formik
			initialValues={initVals}
			validationSchema={ProductSchema}
			onSubmit={addProductToList}
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
				<Form style={{ width: "100%" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "justify-between",
							width: "100%",
							paddingTop: 24,
						}}
					>
						<div className="rowStart">
							<div>
								{titleImage ? (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<img
											src={titleImage}
											alt={"titlepic"}
											style={{
												width: 212,
												height: 244,
												objectFit: "cover",
												borderRadius: 16,
												marginBottom: 10,
												// boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
											}}
										/>
										<div
											className="centerAligner"
											onClick={() => setTitleImage("")}
										>
											<span className="removeImageText">Remove</span>
										</div>
									</div>
								) : (
									<CustomDropZone
										{...{ setImageUrl: setTitleImage, small: false }}
									/>
								)}
								<br />
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									width: "100%",
									paddingLeft: 15,
									marginTop: -20,
								}}
							>
								{/**Name Input */}
								<div className="fieldDiv">
									<Wrapper type="rowStart" marginBottom={8}>
										<span className="inputLabel">Product Name</span>
									</Wrapper>
									<input
										type={"text"}
										name="productName"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.productName}
										className="regularInput"
										// style={{ width: 385 }}
									/>
								</div>
								<div className="rowing">
									{/* {pricee} */}
									<div className="fieldDiv" style={{ paddingRight: 0 }}>
										<Wrapper type="rowStart" marginBottom={8}>
											<span className="inputLabel">Price</span>
										</Wrapper>
										<input
											name="unitPrice"
											type="number"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.unitPrice}
											className="smallNewInput"
											placeholder="$ 23"
										/>
									</div>
									{/**Product quantity */}
									<div className="fieldDiv">
										<Wrapper type="rowStart" marginBottom={8}>
											<span className="inputLabel">Inventory quantity</span>
										</Wrapper>
										<input
											type={"number"}
											value={values.noOfItems}
											onChange={handleChange}
											onBlur={handleBlur}
											name="noOfItems"
											placeholder="Enter Quantity"
											className="smallNewInput"
										/>
										{errors.noOfItems && touched.noOfItems ? (
											<Typography
												alignment="left"
												title={errors.noOfItems}
												fontFamily="Gilroy-Medium"
												color="red"
												type="label"
											/>
										) : (
											""
										)}
									</div>
								</div>
								<div className="rowing">
									{errors.noOfItems && touched.noOfItems && (
										<Typography
											alignment="left"
											title={errors.noOfItems}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									)}

									{errors.unitPrice && touched.unitPrice && (
										<Typography
											alignment="left"
											title={errors.unitPrice}
											fontFamily="Gilroy-Medium"
											color="red"
											type="label"
										/>
									)}
								</div>
							</div>
						</div>
						{/**Description */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Description"
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
							<TextArea
								rows={4}
								name="description"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
								className="textAreaInput"
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
					{/**Add Product Button */}
					<div
						className={"modalButtonStyle hoverIncrease"}
						style={{ paddingTop: 0 }}
					>
						{isLoading ? (
							<SpinnerComponent size="small" />
						) : (
							<button
								type="submit"
								// style={{
								// 	color: "#fff",
								// 	size: 16,
								// 	textAlign: "center",
								// 	border: 0,
								// 	width: "100%",
								// 	height: 46,
								// 	borderRadius: 8,
								// 	fontFamily: "Gilroy-Bold",
								// 	backgroundColor: primaryColor,
								// 	maxWidth: 350,
								// }}
								className="addBtnModal"
								onClick={() => {
									console.log("errors", errors);
								}}
							>
								Add Product
							</button>
						)}
					</div>
				</Form>
			)}
		</Formik>
	);
};
export default SingleProductEntry;
