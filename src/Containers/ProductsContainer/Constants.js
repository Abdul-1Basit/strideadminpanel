import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
	productName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Name of Product is required"),
	description: Yup.string()
		.min(2, "Too Short!")
		.max(1000, "Too Long!")
		.required("Description is required"),
	isActive: Yup.boolean().notRequired(),
	unitPrice: Yup.number("Product Price must be a number")
		.positive("Product Price must be greater than 0")
		.required("Product Price is required"),
	reviews: Yup.number().nullable(),
	ratings: Yup.number().nullable(),
	noOfItems: Yup.number("Total Items must be a number").notRequired(),
});
export const initVals = {
	productName: "",
	description: "",
	isActive: true,
	// unitPrice: 0,
	ratings: "",
	noOfItems: 0,
	reviews: 0,
};
export default ProductSchema;
