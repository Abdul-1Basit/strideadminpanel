import { Col, Form, Input, Row, Typography, notification, message } from "antd";
import { Formik } from "formik";
import CategorySchema from "./Constants";
import React from "react";
import { primaryColor } from "../../Constants";
import EmployeeDropZone from "../EmployeeContainer/EmployeeDropZone";
import { CloseOutlined } from "@ant-design/icons";
import SpinnerComponent from "../../Components/SpinnerComponent";
import { getOnboarding, updateOnboarding } from "../../Helpers/firebase";

const { TextArea } = Input;
export default function OnboardingContainer(props) {
	const [mediaOne, setMediaOne] = React.useState(null);
	const [mediaOneError, setMediaOneError] = React.useState(false);
	const [mediaTwo, setMediaTwo] = React.useState(null);
	const [mediaTwoError, setMediaTwoError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [initVals, setInitVals] = React.useState({
		titleOne: "",
		descriptionOne: "",
		titleTwo: "",
		descriptionTwo: "",
	});
	const checkValues = async (values) => {
		setMediaOneError(!mediaOne);
		setMediaTwoError(!mediaTwo);
		if (!mediaOne || !mediaTwo) {
			message.error("Please attach both media");
			return;
		}
		values.id = initVals.id ?? null;
		values.mediaOne = mediaOne;
		values.mediaTwo = mediaTwo;
		if (await updateOnboarding(values)) {
			notification.success({
				message: `Successfully Updated!`,
				description: `Onboarding screens have been successfully updated`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
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
	React.useLayoutEffect(() => {
		(async function () {
			const result = await getOnboarding();
			console.log("resulte", result);
			if (result.length !== 0) {
				setInitVals(result[0]);
				setMediaOne(result[0].mediaOne);
				setMediaTwo(result[0].mediaTwo);
			}
		})();
	}, []);

	return (
		<Formik
			initialValues={initVals}
			validationSchema={CategorySchema}
			onSubmit={checkValues}
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
							height: "100%",
							paddingTop: 52,
							paddingLeft: 40,
							paddingRight: 40,
						}}
					>
						<div className="flexEnd">
							{isLoading ? (
								<SpinnerComponent />
							) : (
								<span className="savebtn" onClick={handleSubmit}>
									Save
								</span>
							)}
						</div>
						<div className="cardAdditionBlog">
							<Row>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<span className="tableTitle">Screens Detail</span>
								</Col>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<span className="tableTitle">Upload a Media</span>
								</Col>
							</Row>
							<div className="barVertical" />
							<Row>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<div className="flexStart mb30">
										<span className="addBlogInputLabel">#1 Screen Title</span>
										<div style={{ marginTop: 10 }}>
											<input
												type={"text"}
												name="titleOne"
												className="addBlogInput inputText"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.titleOne}
											/>
											{errors.titleOne && touched.titleOne ? (
												<Typography
													alignment="left"
													title={errors.titleOne}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											) : null}
										</div>
									</div>
									<div className="flexStart mb30">
										<span className="addBlogInputLabel">Description</span>
										<div style={{ marginTop: 10 }}>
											<TextArea
												rows={4}
												name="descriptionOne"
												className="addBlogInput inputText"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.descriptionOne}
											/>
											{errors.descriptionOne && touched.descriptionOne ? (
												<Typography
													alignment="left"
													title={errors.descriptionOne}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											) : null}
										</div>
									</div>
									<div className="flexStart mb30">
										<span className="addBlogInputLabel">#2 Screen Title</span>
										<div style={{ marginTop: 10 }}>
											<input
												type={"text"}
												name="titleTwo"
												className="addBlogInput inputText"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.titleTwo}
											/>
											{errors.titleTwo && touched.titleTwo ? (
												<Typography
													alignment="left"
													title={errors.titleTwo}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											) : null}
										</div>
									</div>
									<div className="flexStart mb30">
										<span className="addBlogInputLabel">Description</span>
										<div style={{ marginTop: 10 }}>
											<TextArea
												rows={4}
												name="descriptionTwo"
												className="addBlogInput inputText"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.descriptionTwo}
											/>
											{errors.descriptionTwo && touched.descriptionTwo ? (
												<Typography
													alignment="left"
													title={errors.descriptionTwo}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											) : null}
										</div>
									</div>
								</Col>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<div className="flexStart mb30">
										<div className="mt10">
											{mediaOne ? (
												<div className="rowingStart">
													<img
														src={mediaOne}
														alt="UserImage"
														className="userImgStyling"
													/>
													<div
														className="centerAligner mediaSettings"
														onClick={() => setMediaOne("")}
													>
														<CloseOutlined
															style={{ fontSize: 8, color: primaryColor }}
														/>
													</div>
												</div>
											) : (
												<EmployeeDropZone
													{...{
														setImageUrl: setMediaOne,
														small: false,
														shortWidth: true,
													}}
												/>
											)}
											{mediaOneError && (
												<Typography
													alignment="left"
													title={"Image is required!"}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											)}
										</div>
									</div>
									<br />
									<div className="flexStart mb30">
										<div className="mt10">
											{mediaTwo ? (
												<div className="rowingStart">
													<img
														src={mediaTwo}
														alt="UserImage"
														className="userImgStyling"
													/>
													<div
														className="centerAligner mediaSettings"
														onClick={() => setMediaTwo("")}
													>
														<CloseOutlined
															style={{ fontSize: 8, color: primaryColor }}
														/>
													</div>
												</div>
											) : (
												<EmployeeDropZone
													{...{
														setImageUrl: setMediaTwo,
														small: false,
														shortWidth: true,
													}}
												/>
											)}
											{mediaTwoError && (
												<Typography
													alignment="left"
													title={"Image is required!"}
													fontFamily="Gilroy-Medium"
													color="red"
													type="label"
												/>
											)}
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
