import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Workout name is required"),
	targetArea: Yup.string().required("Target Areas are required"),
	isActive: Yup.number().required("Status is required"),
});
export const initVals = {
	// subCategoryId:1,
	name: "",
	targetArea: "",
	isActive: 1,
};
export default CategorySchema;
