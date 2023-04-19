import * as Yup from "yup";
const CategorySchema = Yup.object().shape({
	name: Yup.string().notRequired(),
	catesubjectgory: Yup.string().notRequired(),
	description: Yup.string().notRequired(),
	reply: Yup.string().required("Reply is required"),
});
export const initVals = {
	name: "",
	subject: "",
	description: "",
	reply: "",
};
export default CategorySchema;
