import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Workout name is required"),
	subtitle: Yup.string().required("Subtitle is required"),
	description: Yup.string().required("Description is required"),
	category: Yup.string().required("Category is required"),
	status: Yup.string().required("Status is required"),
});
export const initVals = {
	// subCategoryId:1,
	name: "",
	subtitle: "",
	description: "",
	category: "default",
	status: "",
};
export default CategorySchema;
