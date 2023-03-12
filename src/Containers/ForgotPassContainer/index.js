import React from "react";

import CustomButton from "../../Components/CustomButton";
import CustomCard from "../../Components/CustomCard";
import Typography from "../../Components/Typography";
import { Formik, Form, Field } from "formik";
import { forgotPasswordSchema, primaryColor } from "../../Constants";
import { apiPostRequest } from "../../Helpers/axiosRequests";
import { endpoints } from "../../Helpers/dbConfig";
import { notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../Components/Wrapper";
const ForgotPassContainer = () => {
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();
	const performForgotPassword = async (values) => {
		setLoading(true);
		try {
			let response = await apiPostRequest(endpoints.forgotPasswordUrl, values);
			if (response.status === 200) {
				setLoading(false);
				notification.success({
					message: `Email sent successfully!`,
					description: "Please login to your email for password reset details",
					placement: "topRight",
					duration: 3,
					onClose: function () {
						navigate("/Signin");
					},
				});
				return;
			}
			setLoading(false);

			throw new Error("Error resetting password");
		} catch (err) {
			setLoading(false);

			notification.error({
				message: `Failed to reset password!`,
				description: `${err}`,
				placement: "topRight",
				duration: 3,
			});

			//alert('Error occured while forgot password request'+err)
			return;
		}
	};

	return (
		<div className="signinDiv" style={{ backgroundImage: "url(/img.png)" }}>
			<Formik
				initialValues={{
					email: "",
				}}
				validationSchema={forgotPasswordSchema}
				onSubmit={() => {
					navigate(`/signin`);
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<div style={{ alignItems: "center", justifyContent: "center" }}>
							<CustomCard>
								<Wrapper type="rowStart" mW={390} w={"100%"} marginBottom={40}>
									<Typography
										alignment="left"
										title="Please"
										color={primaryColor}
										type="signInSignUpHeading"
									/>
									<p>&nbsp;&nbsp;</p>
									<Typography
										alignment="left"
										title="enter your email"
										color="#000"
										type="signInSignUpHeading"
									/>
								</Wrapper>

								<Wrapper type="flexCol" w={"100%"} mW={390} marginBottom={25}>
									<Typography
										alignment="left"
										title=""
										color="#000"
										type="label"
									/>
									<Field
										name="email"
										type="email"
										placeholder="abc@ymail.com"
										className="inputStyle"
									/>
									<Typography
										alignment="left"
										fontFamily="Gilroy-Medium"
										title={errors.email && touched.email ? errors.email : ""}
										color="red"
										type="smallest"
									/>
								</Wrapper>
								<Wrapper type="central" w="100%">
									{loading ? (
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Spin size="large" />
										</div>
									) : (
										<CustomButton large={true} title="Submit" type="Submit" />
									)}
								</Wrapper>
							</CustomCard>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default ForgotPassContainer;
