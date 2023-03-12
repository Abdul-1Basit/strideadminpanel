import * as Yup from "yup";
const UserSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(3, "Minimum 3 characters!")
		.max(50, "Too Long!")
		.required("First Name is required!"),

	email: Yup.string()
		.email()
		.min(5, "Email Address should be minimum 5 characters!")
		.max(100, "Too Long!")
		.required("Email Address is required!"),
	password: Yup.string().required("Password is required!"),
	role: Yup.string(),
	address: Yup.string(),
	phonenumber: Yup.string(),
});
export const initVals = {
	fullName: "",
	email: "",
	password: "",
	address: "",
	role: "",
	phonenumber: "",
};
export default UserSchema;
