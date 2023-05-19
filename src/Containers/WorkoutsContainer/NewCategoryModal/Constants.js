import * as Yup from "yup";
const UserSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Minimum 2 characters!")
		.max(250, "Too Long!")
		.required("Category Name is required!"),

	description: Yup.string().required("Description is required!"),
});
export const initVals = {
	name: "",
	description: "",
};
export default UserSchema;
