import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Workout name is required"),
	subtitle: Yup.string().required("Subtitle are required"),

	description: Yup.string().required("Description are required"),
});
export const initVals = {
	// subCategoryId:1,
	name: "",
	subtitle: "",
	description: "",
};
export default CategorySchema;
