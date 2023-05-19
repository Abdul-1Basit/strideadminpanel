import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Exercise name is required"),
	category: Yup.string().required("Category is required"),
	instructions: Yup.string().required("Instructions are required"),
	targetArea: Yup.string().required("Target Area are required"),
	status: Yup.string().required("Status is required"),
});
export const initVals = {
	// subCategoryId:1,
	name: "",
	category: "default",
	status: "",
	instructions: "",
	targetArea: "",
};
export default CategorySchema;
