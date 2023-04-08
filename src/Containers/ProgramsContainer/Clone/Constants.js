import * as Yup from "yup";
const programSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Program name is required"),
	subTitle: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Program Subtitle is required"),
	overviewDescription: Yup.string().required(
		"Overview Description are required"
	),
	scheduleDescription: Yup.string().required(
		"Program Description are required"
	),
	difficultyLevel: Yup.string().required("Program Difficulty is required"),
	status: Yup.string().required("Status is required"),
});
export const initVals = {
	name: "",
	subTitle: "",
	status: "",
	difficultyLevel: "",
	scheduleDescription: "",
	overviewDescription: "",
	days: [],
};
export default programSchema;
