import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	titleOne: Yup.string()
		.min(2, "Too Short!")
		.max(200, "Too Long!")
		.required("Title One is required"),
	descriptionOne: Yup.string().required("Description One is required"),
	titleTwo: Yup.string()
		.min(2, "Too Short!")
		.max(200, "Too Long!")
		.required("Title Two is required"),
	descriptionTwo: Yup.string().required("Description Two is required"),
});
export const initVals = {
	titleOne: "",
	descriptionOne: "",
	titleTwo: "",
	descriptionTwo: "",
};
export default CategorySchema;
