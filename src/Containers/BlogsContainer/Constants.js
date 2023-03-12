import * as Yup from "yup";
const blogSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Blog name is required"),
	description: Yup.string().required("Blog Description are required"),
	status: Yup.string().required("Status is required"),
	dateCreated: Yup.string().notRequired(""),
});
const initVals = {
	// subCategoryId:1,

	name: "",
	description: "",
	status: "",
	dateCreated: "",
};
export { initVals, blogSchema };
