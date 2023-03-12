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

// import { addCampaign, uploadImage } from "../../../../Helpers/firebase";
import moment from "moment";
import { updateOrder } from "../../../../Helpers/firebase";

const { Option } = Select;

const Edit = (props) => {
	let {
		status = "",
		deliveryStatus = "",
		startTime = "",
		endTime = "",
		date = "",
		campaignId = "",
		userId = "",
		assignedTo = "",
		airwayBillNo = "",
	} = props.activeOrder;
	// console.log("activeCategory", props.activeOrder);
	const [deliveryError, setDeliveryError] = React.useState(false);
	const [userError, setUserError] = React.useState(false);
	const [orderDateError, setOrderDateError] = React.useState(false);
	const [campaignError, setCampaignError] = React.useState(false);

	const [loading, setLoading] = React.useState(false);
	const addCategoryToList = async (values) => {
		if (!values.userId || !values.campaignId || !values.date) {
			if (!values.userId) {
				setUserError(true);
			}
			if (!values.campaignId) {
				setCampaignError(true);
			}
			if (!values.date) {
				setOrderDateError(true);
			}
			return;
		}

		setUserError(false);
		setCampaignError(false);
		setOrderDateError(false);
		setLoading(true);
		values.id = props.activeOrder.id;
		console.log("values", values);
		setLoading(false);
		// if (await updateOrder(values)) {
		// 	notification.success({
		// 		message: `Successfully Updated!`,
		// 		description: `Order has been successfully Updated`,
		// 		placement: "topRight",
		// 		duration: 3,
		// 		onClose: function () {
		// 			props.setAddModal(false);
		// 			setLoading(false);
		// 		},
		// 	});
		// 	return;
		// } else {
		// 	notification.error({
		// 		message: `Failed to add!`,
		// 		description: `Give it a try later.`,
		// 		placement: "topRight",
		// 		duration: 2,
		// 		onClose: function () {
		// 			setLoading(false);
		// 		},
		// 	});
		// }
	};
	const checkDay = (e, dateString) => {
		if (dateString) {
			if (moment(dateString).isBefore(moment().format("YYYY MM DD"))) {
				message.error("Cant set date in past");
				return false;
			} else {
				return true;
			}
		}
		return false;
	};

	return (
		<div style={{ width: "100%", maxWidth: 390 }}>
			{/* status: "new", deliveryStatus: "pending", startTime: "", endTime: "",
			date: "", */}
			<Formik
				initialValues={{
					status,
					deliveryStatus,
					startTime,
					endTime,
					date,
					campaignId,
					userId,
					assignedTo,
					airwayBillNo,
				}}
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
					<Form
						style={{
							height: "100%",
							display: "flex",
							justifyContent: "space-between",
							flexDirection: "column",
						}}
					>
						<Wrapper
							type="rowSpaced"
							marginTop={10}
							marginBottom={49}
							w={"100%"}
						>
							<Typography
								alignment="left"
								title="Edit order"
								fontFamily="Gilroy-Bold"
								color="#0F172A"
								type="Heading"
							/>

							<img
								src={"/Union.png"}
								alt="Close icon"
								onClick={() => props.setAddtModal(false)}
								style={{
									width: 20,
									height: 20,
									cursor: "pointer",
									marginRight: -20,
								}}
							/>
						</Wrapper>

						{/**Delivery Listing*/}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Delivery"
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
									values.assignedTo = val;
									if (deliveryError) {
										setDeliveryError(false);
									}
								}}
								size="large"
								className="selectStyle"
								showSearch
								placeholder="Select Delivery"
								optionFilterProp="children"
								defaultValue={values.assignedTo}
								onSearch={(val) => console.log(val)}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								<Option key={1} value={"Classy"}>
									<span style={{ paddingLeft: 5 }}>Classy</span>
								</Option>
							</Select>

							{deliveryError ? (
								<Typography
									alignment="left"
									title={"Delivery is required!"}
									fontFamily="Gilroy-Medium"
									color="red"
									type="label"
								/>
							) : (
								""
							)}
						</div>

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
								className="selectStyle"
								showSearch
								defaultValue={values.userId}
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
													alt={item.id}
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
						</div>

						{/**Campaign Listing*/}

						<div className="fieldDiv">
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
								defaultValue={values.campaignId}
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
						</div>
						{/* delivery status  */}
						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Delivery Status"
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
								showSearch
								placeholder="Delivery Status"
								optionFilterProp="children"
								onChange={(e) => {
									values.deliveryStatus = e;
								}}
								onSearch={() => {}}
								size="large"
								allowClear
								className="selectStyle"
								// style={{ width: 200, borderRadius: 8, marginRight: 10 }}
								// className="inputStyle"
								defaultValue={values.deliveryStatus}
								filterOption={(input, option) =>
									option.children
										.toString()
										.toLowerCase()
										.indexOf(input.toString().toLowerCase()) >= 0
								}
							>
								<Option key={0} value={"Confirmed"}>
									Confirmed
								</Option>

								<Option key={1} value={"SentDelivery"}>
									Sent for Delivery
								</Option>
								<Option key={2} value={"OnDelivery"}>
									On Delivery
								</Option>

								<Option key={3} value={"Completed"}>
									Completed
								</Option>

								<Option key={4} value={"Returned"}>
									Returned
								</Option>
							</Select>
						</div>

						{/**Airway BillNo */}

						<div className="fieldDiv">
							<Wrapper type="rowStart" marginBottom={8}>
								<Typography
									alignment="left"
									title="Airway Bill#"
									fontFamily="Gilroy-Medium"
									color="#0F172A"
									type="label"
								/>
							</Wrapper>
							<input
								type={"text"}
								defaultValue={values.airwayBillNo}
								placeholder="Enter Number"
								className="inputStyle"
								name="airwayBillNo"
								handleBlur={handleBlur}
								onChange={handleChange}
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
								defaultValue={moment(values.date)}
								onChange={(e, dateString) => {
									if (checkDay(e, dateString)) {
										values.date = moment(dateString).format("LL");
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
						{/* order placing Time */}
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
								defaultValue={moment(values.startTime, "HH:mm")}
								name="startTime"
								className="inputStyle"
								onChange={(e, time) => {
									values.startTime = time;
								}}
								onBlur={handleBlur}
								//value={values.startTime}
							/>
							{/* <input
								className="inputStyle"
								value={values.startTime}
								disabled={true}
							/> */}
							{errors.startTime && touched.startTime ? (
								<Typography
									alignment="left"
									title={errors.startTime}
									fontFamily="Gilroy-Medium"
									color="red"
									type="label"
								/>
							) : null}
						</div>

						{/**Add Order Button */}
						<div className="modalButtonStyle" style={{ paddingBottom: 650 }}>
							{loading ? (
								<Spin size="large" />
							) : (
								<CustomButton
									large={true}
									onClick={handleSubmit}
									title="Update"
								/>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default Edit;
