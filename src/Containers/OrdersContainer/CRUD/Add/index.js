import React from "react";
import CustomButton from "../../../../Components/CustomButton";
import { orderSchena, initVals } from "../Constants";
import { Formik, Form } from "formik";
import {
	Select,
	DatePicker,
	TimePicker,
	notification,
	message,
	Spin,
} from "antd";
import Typography from "../../../../Components/Typography";
import Wrapper from "../../../../Components/Wrapper";

import moment from "moment";
import { addOrder } from "../../../../Helpers/firebase";

const { Option } = Select;

const Add = (props) => {
	// const [deliveryError, setDeliveryError] = React.useState(false);
	const [userError, setUserError] = React.useState(false);
	const [orderDateError, setOrderDateError] = React.useState(false);
	// const [campaignError, setCampaignError] = React.useState(false);
	const [selectedProducts, setSelectedProducts] = React.useState([]);
	const [orderStatus, setOrderStatus] = React.useState("");
	const [totalCart, setTotalCart] = React.useState("");
	const [discount, setDiscount] = React.useState("");
	const [totalBill, setTotalBill] = React.useState("");
	const [orderTime, setOrderTime] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const addCategoryToList = async (values) => {
		// if (!values.userId || !values.campaignId || !values.date) {
		// 	if (!values.userId) {
		// 		setUserError(true);
		// 	}
		// 	if (!values.date) {
		// 		setOrderDateError(true);
		// 	}
		// 	return;
		// }
		values.orderStatus = orderStatus;
		values.productList = selectedProducts;
		values.cartTotal = totalCart;
		values.discount = discount ?? 0;
		values.totalBill = totalBill;
		values.deliveryDateTime += values.deliveryDateTime;
		values.noOfItems = selectedProducts.length;
		values.assignedTo = "self";
		// console.log("values", values);
		setLoading(true);
		if (await addOrder(values, props.productList)) {
			notification.success({
				message: `Successfully Added!`,
				description: `Order has been successfully added`,
				placement: "topRight",
				duration: 3,
				onClose: function () {
					props.setAddModal(false);
					setLoading(false);
				},
			});
			return;
		} else {
			notification.error({
				message: `Failed to add!`,
				description: `Give it a try later.`,
				placement: "topRight",
				duration: 2,
				onClose: function () {
					setLoading(false);
				},
			});
		}
	};
	const checkDay = (e, dateString) => {
		if (dateString) {
			// console.log(
			// 	"recvd " + dateString + " cuurent" + moment().format("YYYY MM DD")
			// );
			if (moment(dateString).isBefore(moment().format("YYYY MM DD"))) {
				message.error("Cant set date in past");
				return false;
			} else {
				//setDay(moment(dateString).format("LL"));
				//	setDateVal(e);
				return true;
			}
			//	console.log("aaa", );
			//console.log("date", dateString);
		}
		return false;
		//	;
		//message.error("Cant set date in past");
		// setDay(moment(dateString).format("LL"));
	};
	// console.log("propslist", props.campaignList);
	const calculateTotal = (newList) => {
		let totalPrice = 0;
		newList.forEach((itemmm) => {
			console.log("item", props.productList);
			totalPrice += parseFloat(
				props.productList.find((item) => item.id === itemmm).unitPrice
			);
		});
		console.log("called", totalPrice);
		setTotalCart(totalPrice);
		if (discount) {
			setTotalBill(totalPrice - parseFloat(discount));
		} else {
			setTotalBill(totalPrice);
		}
	};
	return (
		<div style={{ width: "100%", maxWidth: 390 }}>
			{/* status: "new", deliveryStatus: "pending", startTime: "", endTime: "",
			date: "", */}
			<Formik
				initialValues={initVals}
				validationSchema={orderSchena}
				onSubmit={(values) => {
					addCategoryToList(values);
				}}
				enableReinitialize
			>
				{({
					errors,
					isSubmitting,
					touched,
					values,
					handleChange,
					handleBlur,
					handleSubmit,
				}) => (
					<Form>
						<Wrapper
							type="rowSpaced"
							marginTop={10}
							marginBottom={49}
							w={"100%"}
						>
							<Typography
								alignment="left"
								title="Add order"
								fontFamily="Gilroy-Bold"
								color="#0F172A"
								type="Heading"
							/>

							<img
								src={"/Union.png"}
								alt="Close icon"
								onClick={() => props.setAddtModal(false)}
								style={{ width: 20, height: 20, cursor: "pointer" }}
							/>
						</Wrapper>
						{/* 
	orderStatus: "",
	assignedTo: "", */}

						{/**User Listing*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="User"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<Select
								onChange={(val) => {
									values.userId = val;
									if (userError) {
										setUserError(false);
									}
								}}
								size="large"
								className="regularInput"
								showSearch
								placeholder="Select User"
								optionFilterProp="children"
								onSearch={(val) => console.log(val)}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								{props.userList &&
									props.userList.length > 0 &&
									props.userList.map((item, index) => {
										return (
											<Option key={index} value={item.id}>
												<div
													style={{
														flexDirection: "row",
														alignItems: "flex-start",
														justifyContent: "flex-start",
														display: "flex",
													}}
												>
													<img
														src={item.image ?? "/noImage.png"}
														alt={item.firstName}
														style={{
															height: 35,
															width: 30,
															objectFit: "contain",
														}}
													/>
													<span style={{ paddingLeft: 5 }}>
														{" "}
														{item.firstName} {item.lastName}
													</span>
												</div>
											</Option>
										);
									})}
							</Select>

							{userError && (
								<Typography
									alignment="left"
									title={"User is required!"}
									fontFamily="Gilroy-Medium"
									color="red"
									type="label"
								/>
							)}
						</div>
						{/* *User Listing
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="User"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<Select
								onChange={(val) => {
									values.userId = val;
									if (userError) {
										setUserError(false);
									}
								}}
								size="large"
								className="selectStyle"
								showSearch
								placeholder="Select User"
								optionFilterProp="children"
								onSearch={(val) => console.log(val)}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								{props.userList &&
									props.userList.length > 0 &&
									props.userList.map((item, index) => {
										return (
											<Option key={index} value={item.id}>
												<img
													src={item.image ?? "/noImage.png"}
													alt={item.firstName}
													style={{
														height: 50,
														width: 40,
														objectFit: "contain",
													}}
												/>
												<span style={{ paddingLeft: 5 }}>
													{" "}
													{item.firstName} {item.lastName}
												</span>
											</Option>
										);
									})}
							</Select>

							{userError && (
								<Typography
									alignment="left"
									title={"User is required!"}
									fontFamily="Gilroy-Medium"
									color="red"
									type="label"
								/>
							)}
						</div> */}
						{/**No of Products*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="No of products"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<Select
								onChange={(newList) => {
									setSelectedProducts(newList);
									calculateTotal(newList);
								}}
								size="large"
								mode="multiple"
								className="regularInput"
								// style={{ height: 50 }}
								showSearch
								placeholder="Select Products"
								optionFilterProp="children"
								onSearch={(val) => console.log(val)}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								{props.productList &&
									props.productList.length > 0 &&
									props.productList.map((item, index) => {
										return (
											<Option key={index} value={item.id}>
												<div
													style={{
														flexDirection: "row",
														alignItems: "flex-start",
														justifyContent: "flex-start",
														display: "flex",
													}}
												>
													<img
														src={item.images ?? "/noImage.png"}
														alt={item.name}
														style={{
															height: 35,
															width: 30,
															objectFit: "contain",
														}}
													/>
													<span style={{ paddingLeft: 5 }}>{item.name}</span>
												</div>
											</Option>
										);
									})}
							</Select>
						</div>
						{/**No of items*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="No of items"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<input
								value={selectedProducts.length}
								name="noOfItems"
								type={"text"}
								className="inputStyle"
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={false}
							/>
						</div>
						{/* Order status */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Order status"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<Select
								onChange={(val) => {
									setOrderStatus(val);
								}}
								size="large"
								className="regularInput"
								showSearch
								placeholder="Order status"
								optionFilterProp="children"
								onSearch={(val) => console.log(val)}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								<Option key={0} value={"ordered"}>
									<span style={{ paddingLeft: 5, textTransform: "uppercase" }}>
										ordered
									</span>
								</Option>
								<Option key={1} value={"inprogress"}>
									<span style={{ paddingLeft: 5, textTransform: "uppercase" }}>
										in progress
									</span>
								</Option>
								<Option key={2} value={"delivered"}>
									<span style={{ paddingLeft: 5, textTransform: "uppercase" }}>
										Delivered
									</span>
								</Option>
								<Option key={3} value={"confirmed"}>
									<span style={{ paddingLeft: 5, textTransform: "uppercase" }}>
										Confirmed
									</span>
								</Option>
								<Option key={4} value={"returned"}>
									<span style={{ paddingLeft: 5, textTransform: "uppercase" }}>
										returned
									</span>
								</Option>
							</Select>
						</div>
						{/**Campaign Listing*/}
						{/* <div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Campaign"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<Select
								onChange={(val) => {
									values.campaignId = val;

									if (campaignError) {
										setCampaignError(false);
									}
								}}
								size="large"
								className="selectStyle"
								showSearch
								placeholder="Select Campaign"
								optionFilterProp="children"
								onSearch={(val) => console.log(val)}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								{props.campaignList &&
									props.campaignList.map((item, index) => {
										return (
											<Option key={index} value={item.id}>
												<img
													//src={item.image}
													alt={item.id}
													src={item.image ? item.image : "/noImage.png"}
													style={{
														height: 50,
														width: 34,
														objectFit: "contain",
													}}
												/>
												<span style={{ paddingLeft: 5 }}>{item.name}</span>
											</Option>
										);
									})}
							</Select>

							{campaignError ? (
								<Typography
									alignment="left"
									title={"Campaign is required!"}
									fontFamily="Gilroy-Medium"
									color="red"
									type="label"
								/>
							) : (
								""
							)}
						</div> */}
						{/**total cart Items*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Cart total"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<input
								value={totalCart}
								type={"text"}
								className="inputStyle"
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={true}
							/>
						</div>
						{/**discount*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Discount"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<input
								// value={values.discount}
								type={"number"}
								className="inputStyle"
								onChange={(e) => {
									setDiscount(e.target.value);
								}}
								onBlur={handleBlur}
							/>
						</div>
						{/**total cart Items*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Total bill"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<input
								value={totalBill}
								type={"text"}
								className="inputStyle"
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={true}
							/>
						</div>
						{/**Date of Order */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Order Date"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>
								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<DatePicker
								onChange={(e, dateString) => {
									if (checkDay(e, dateString)) {
										values.orderDateTime = moment(dateString).format("LL");
									}
									if (dateString && orderDateError) {
										setOrderDateError(false);
									}
								}}
							/>

							{orderDateError && (
								<Typography
									alignment="left"
									title={"Order Date is Required"}
									fontFamily="Gilroy-Medium"
									color="red"
									type="label"
								/>
							)}
						</div>
						{/* order delivery Time */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Order Time"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>
								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<TimePicker
								defaultValue={moment("00:00", "HH:mm")}
								name="startTime"
								className="inputStyle"
								onChange={(e, time) => {
									setOrderTime(time);
								}}
								onBlur={handleBlur}
								//value={values.startTime}
							/>
						</div>
						{/**total cart Items*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Assigned to"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>

								<Typography
									alignment="left"
									title="*"
									fontFamily="Gilroy-Medium"
									color="#E1552F"
									type="label"
								/>
							</Wrapper>
							<input
								value={"Self"}
								type={"text"}
								className="inputStyle"
								onChange={handleChange}
								onBlur={handleBlur}
								disabled={true}
							/>
						</div>
						{/**Add Order Button */}
						<div className="modalButtonStyle">
							{loading ? (
								<Spin size="large" />
							) : (
								<CustomButton large={true} onClick={handleSubmit} title="Add" />
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default Add;
