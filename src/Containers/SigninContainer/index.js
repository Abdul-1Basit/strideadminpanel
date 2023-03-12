import React from "react";
import CustomButton from "../../Components/CustomButton";
import CustomCard from "../../Components/CustomCard";
import Typography from "../../Components/Typography";
import { Formik } from "formik";
import { endpoints } from "../../Helpers/dbConfig";
import { apiPostRequest } from "./../../Helpers/axiosRequests";
import { setToken } from "../../Helpers/tokenManagement";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import SpinnerComponent from "../../Components/SpinnerComponent";
import { UserContext } from "../UserContext/Context";
import Wrapper from "../../Components/Wrapper";
import { validateForm, initialValues } from "./Constants";
import { primaryColor } from "../../Constants";
import { logInWithEmailAndPassword } from "../../Helpers/firebase";
const SigninContainer = () => {
	const [loading, setLoading] = React.useState(false);
	const [userData, setUserData] = React.useContext(UserContext);
	let navigate = useNavigate();

	const performSignin = async (values, { setSubmitting }) => {
		setLoading(true);
		//  apiPostRequest(endpoints.signinUrl,values)
		// .then((res) => {

		let response = await logInWithEmailAndPassword(
			values.email,
			values.password
		);
		if (response) {
			setToken(response.stsTokenManager.accessToken);
			setUserData({
				...userData,
				id: response.uid,
				firstName: response.firstName ?? "",
				lastName: response.lastName ?? "",
				displayName: response.displayName ?? "",
				phone: response.phoneNumber,
				email: response.email,
				designation: response.designation ?? "",
				roleId: response.role ?? "admin",
				avatar: response.photoURL ?? "",
				isActive: 1,
				isAdmin: 1,
				activeIndex: 0,
			});

			console.log("response", JSON.stringify(response));
			notification.success({
				message: `Logged in successfully!`,
				description: `Welcome ${
					response.displayName
						? response.displayName
						: response.firstName + ` ` + response.lastName
				}`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setSubmitting(false);
					setLoading(false);
					navigate(`/Dashboard`);
				},
			});
			return;
		}

		notification.error({
			message: `Failed to login!`,
			description: ``,
			placement: "topRight",
			duration: 4,
			onClose: () => {
				setSubmitting(false);
				setLoading(false);

				return;
			},
		});

		// })
		// .catch(err => {

		// let error=err.toString();
		// let errorMessage="Network Failure"
		//      if (error.includes("401")) {
		//       errorMessage='Email or Password is incorrect!';
		//     }
		//     else if(error.includes("404")){
		//       errorMessage='Email not registered';
		//     }
		//     else if (error.includes('500')||error.includes("503")){
		//       errorMessage='Server error';
		//     }
		//     setSubmitting(false);
		//     setLoading(false)
	};
	return (
		<div
			className="signinDiv"
			style={{ backgroundImage: "url(/ezgif.com-gif-maker.png)" }}
		>
			<Formik
				initialValues={initialValues}
				validate={(values) => validateForm(values)}
				onSubmit={(values, { setSubmitting }) => {
					performSignin(values, { setSubmitting });
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<div style={{ alignItems: "center", justifyContent: "center" }}>
							<CustomCard>
								<Wrapper type="rowStart" mW={390} w={"100%"} marginBottom={40}>
									<Typography
										alignment="left"
										title="Sign in"
										fontFamily="Gilroy-Bold"
										color={primaryColor}
										type="signInSignUpHeading"
									/>
									<p>&nbsp;&nbsp;</p>
									<Typography
										alignment="left"
										title="to your account"
										fontFamily="Gilroy-Bold"
										color="#000"
										type="signInSignUpHeading"
									/>
								</Wrapper>
								<Wrapper type="flexCol" w={"100%"} mW={390} marginBottom={16}>
									<Typography
										alignment="left"
										fontFamily="Gilroy-Medium"
										title="Email Address"
										color="#000"
										type="label"
									/>
									<input
										type={"email"}
										className="regularInput"
										name="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									<Typography
										alignment="left"
										fontFamily="Gilroy-Medium"
										title={errors.email && touched.email && errors.email}
										color="red"
										type="smallest"
									/>
								</Wrapper>
								<Wrapper type="flexCol" w={"100%"} mW={390} marginBottom={20}>
									<Typography
										title="Password"
										alignment="left"
										fontFamily="Gilroy-Medium"
										color="#000"
										type="label"
									/>
									<input
										type={"password"}
										className="regularInput"
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
									/>

									<Typography
										alignment="left"
										fontFamily="Gilroy-Medium"
										title={
											errors.password && touched.password && errors.password
										}
										color="red"
										type="smallest"
									/>
								</Wrapper>
								<Wrapper type="rowSpaced" w={"100%"} mW={390} marginBottom={48}>
									<Wrapper type="rowSpaced">
										<input type="checkbox" style={{ marginRight: 8 }} />
										<Typography
											title="Remember me"
											alignment="left"
											fontFamily="Gilroy-Medium"
											color="#64748B"
											type="label"
										/>
									</Wrapper>
									{/* <Link to="/ForgotPassword">
										<Typography
											title="Forgot password?"
											alignment="right"
											fontFamily="Gilroy-Medium"
											color={"blue"}
											type="label"
										/>
									</Link> */}
								</Wrapper>
								<Wrapper type="central" w={"100%"}>
									{loading ? (
										<SpinnerComponent size="small" />
									) : (
										<CustomButton
											large={true}
											type={"submit"}
											disabled={isSubmitting}
											title="Sign in"
										/>
									)}
								</Wrapper>
							</CustomCard>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};
export default SigninContainer;
