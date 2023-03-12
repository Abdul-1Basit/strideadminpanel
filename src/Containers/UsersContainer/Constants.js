import * as Yup from "yup";
const UserSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(3, "Minimum 3 characters!")
		.max(50, "Too Long!")
		.required("First Name is required!"),
	lastName: Yup.string()
		.min(3, "Minimum 3 characters!")
		.max(50, "Too Long!")
		.required("Last Name is required!"),
	emailAddress: Yup.string()
		.email()
		.min(5, "Email Address should be minimum 5 characters!")
		.max(100, "Too Long!")
		.required("Email Address is required!"),
	password: Yup.string()
		.min(8, "Password should be minimum 8 characters!")
		.max(16, "Too Long!")
		.required("Password is required!"),
	gender: Yup.string(),
	nationality: Yup.string().nullable(),
	residency: Yup.string().nullable(),
	phoneNumber: Yup.string(),
	dob: Yup.string(),
});
export const initVals = {
	firstName: "",
	lastName: "",
	emailAddress: "",
	password: "",
	gender: "Male",
	nationality: "India",
	residency: "India",
	phoneNumber: "",
	dob: "",
};
export default UserSchema;
