import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Exercise name is required"),
	category: Yup.string().required("Target Areas are required"),
	isActive: Yup.string().required("Status is required"),
});
export const initVals = {
	// subCategoryId:1,
	name: "",
	category: "",
	isActive: "",
};
export default CategorySchema;
