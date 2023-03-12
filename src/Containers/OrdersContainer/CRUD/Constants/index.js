import * as Yup from "yup";
const orderSchena = Yup.object().shape({
	userId: Yup.string().nullable(),
	noOfItems: Yup.number().nullable(),
	orderDateTime: Yup.string().nullable(),
	orderStatus: Yup.string().nullable(),
	deliveryDateTime: Yup.string().nullable(),
	cartTotal: Yup.number().nullable(),
	discount: Yup.string().nullable(),
	totalBill: Yup.number().nullable(),
	assignedTo: Yup.string().nullable(),
});
const initVals = {
	userId: "",
	noOfItems: "",
	orderDateTime: "",
	orderStatus: "",
	deliveryDateTime: "",
	cartTotal: 0,
	discount: "",
	totalBill: 0,
	assignedTo: "",
};

export { orderSchena, initVals };
