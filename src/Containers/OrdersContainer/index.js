import React from "react";
import { Modal, notification, Tabs, Select, Row, Col, message } from "antd";
import { Add, Edit, Delete, Search, Listing } from "./CRUD";
import Analytics from "./Analytics";
import { primaryColor } from "../../Constants";
import {
	getAllCampaigns,
	getAllEmployees,
	getAllOrders,
	getAllProducts,
	getAllUsers,
	updateOrder,
} from "../../Helpers/firebase";
import CustomSmallCard from "../../Components/CustomSmallCard";
import { BsCheck } from "react-icons/bs";
import { FaExclamation } from "react-icons/fa";
const { Option } = Select;
const OrdersContainer = (props) => {
	const [filterBy, setFilterBy] = React.useState("");
	const [orderBy, setOrderBy] = React.useState("");
	const [searchQuery, setSearchQuery] = React.useState("");
	const [addModal, setAddModal] = React.useState(false);
	const [editModal, setEditModal] = React.useState(false);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [activeOrder, setActiveOrder] = React.useState(null);
	const [activeKey, setActiveKey] = React.useState("All");
	// const [campaignList, setCampaignList] = React.useState([]);
	const [productList, setProductList] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [userList, setUserList] = React.useState([]);
	const [statusOption, setStatusOption] = React.useState("No");
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
	const [orderList, setOrderList] = React.useState([]);
	const [topValues, setTopValues] = React.useState({
		totalPrograms: 0,
		activePrograms: 0,
		pendingPrograms: 0,
	});
	const successMessage = (modalFunc, type, cat) => {
		let title = "";
		let subTitle = "";
		let catName = activeOrder.name;
		if (type === "add") {
			title = "added";
			subTitle = "added to the list";
			catName = cat.name ? cat.name : "Product";
		} else if (type === "edit") {
			title = "edited";
			subTitle = "updated";
			catName = cat.name;
		} else if (type === "delete") {
			title = "deleted";
			subTitle = "deleted from the list";
		}
		modalFunc(false);

		notification.success({
			message: `Successfully ${title}!`,
			description: `${catName}  has been successfully ${subTitle}`,
			placement: "topRight",
			duration: 3,
			onClose: function () {},
		});
		return;
	};
	const confirmOrder = async (order) => {
		setLoading(true);
		order.deliveryStatus = "Confirmed";
		if (await updateOrder(order)) {
			message.success("Order has been confirmed");
		} else {
			message.error("Failed to confirm order");
		}
		setLoading(false);
	};
	React.useLayoutEffect(() => {
		getAllData();
	}, [addModal, editModal, deleteModal]);
	const getAllData = async () => {
		setLoading(true);

		const ordsList = await getAllOrders();
		setOrderList(ordsList);

		let totalPrograms = ordsList.length,
			activePrograms = 0,
			pendingPrograms = 0;
		ordsList.forEach((rowData) => {
			rowData.deliveryStatus === "Fullfilled" ||
			rowData.deliveryStatus === "Fulfilled"
				? activePrograms++
				: pendingPrograms++;
		});
		setTopValues({
			totalPrograms,
			pendingPrograms,
			activePrograms,
		});
		setLoading(false);
	};

	return (
		<div
			style={{
				height: "100%",
				backgroundColor: "#F8F7F3",
				paddingTop: 52,
				width: "100%",
				paddingLeft: 35,
				paddingRight: 25,
			}}
		>
			<div style={{ display: "flex", width: "100%" }}>
				<Modal
					visible={addModal}
					title=""
					onCancel={() => setAddModal(false)}
					closable={false}
					// className="ModalStyle"
					footer={null}
					destroyOnClose
					style={{ position: "absolute", right: 0, height: "100%", top: 0 }}
				>
					<Add
						{...{
							setAddModal,
							successMessage,
							userList,
							productList,
						}}
					/>
				</Modal>
				<Modal
					visible={deleteModal}
					title=""
					onCancel={() => setDeleteModal(false)}
					closable={false}
					className="DeleteModalStyle"
					footer={null}
					destroyOnClose
				>
					<Delete
						{...{
							setDeleteModal,
							activeOrder,
							setActiveOrder,
							successMessage,
						}}
					/>
				</Modal>

				<Modal
					visible={editModal}
					title=""
					onCancel={() => setEditModal(false)}
					closable={false}
					className="ModalStyle"
					footer={null}
					style={{ minHeight: "100vh", height: "100%" }}
				>
					<Edit
						{...{
							setEditModal,
							activeOrder,
							setActiveOrder,
							successMessage,
						}}
					/>
				</Modal>
			</div>
			<div className="rowing" style={{ marginBottom: 25 }}>
				<CustomSmallCard
					textColor="#fff"
					primaryColor="#F94F00"
					secondaryColor="rgba(255, 255, 255, 0.16)"
					icon={
						<img src="/Icon2.png" style={{ width: 38.75, height: 35.23 }} />
					}
					heading="Orders Today"
					// headingCount="120"
					subHeading={topValues.totalPrograms}
					type=""
				/>
				<CustomSmallCard
					textColor="#D30E0E"
					primaryColor="rgba(211, 14, 14, 0.08)"
					secondaryColor="rgba(211, 14, 14, 0.16)"
					icon={
						<FaExclamation
							style={{ width: 38.75, height: 35.23, color: "#D30E0E" }}
						/>
					}
					heading="Pending Orders"
					// headingCount="120"
					subHeading={topValues.pendingPrograms}
					type=""
				/>
				<CustomSmallCard
					textColor="#2DAB22"
					primaryColor="rgba(33, 201, 18, 0.08)"
					secondaryColor="rgba(45, 171, 34, 0.16)"
					icon={
						<BsCheck
							style={{ width: 38.75, height: 35.23, color: "#2DAB22" }}
						/>
					}
					heading="Fulfilled Orders"
					// headingCount="120"
					subHeading={topValues.activePrograms}
					type=""
				/>
			</div>
			<div
				style={{
					paddingLeft: 35,
					paddingRight: 25,
					width: "100%",
					backgroundColor: "#fff",
					paddingTop: 19,
					boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.16)",
					borderRadius: 20,
				}}
			>
				{/* <Analytics {...{ orderList }} /> */}
				<Search
					{...{
						setAddModal,
						filterBy,
						setFilterBy,
						orderBy,
						setOrderBy,
						searchQuery,
						setSearchQuery,
					}}
				/>
				<Tabs
					defaultActiveKey={activeKey}
					style={{
						backgroundColor: "#fff",
						paddingLeft: 12,
						fontWeight: "bold",
					}}
					onChange={(e) => {
						setActiveKey(e);
					}}
					items={[
						{
							label: <span>All</span>,
							key: "1",
							// children: "Tab 1",
						},
						{
							label: <span>Fullfilled</span>,
							key: "2",
							// children: "Tab 2",
						},
						{
							label: <span>Pending</span>,
							key: "3",
							// children: "Tab 3",
						},

						{
							label: <span>Cancelled</span>,
							key: "4",
							// children: "Tab 3",
						},
					]}
				></Tabs>
				<Listing
					{...{
						setEditModal,
						setActiveOrder,
						setDeleteModal,
						orderList,
						productList,
						activeKey,
						selectedRowKeys,
						setSelectedRowKeys,
						// campaignList,
						userList,
						loading,
						statusOption,
						confirmOrder,
						filterBy,
						orderBy,
						searchQuery,
					}}
				/>
			</div>
		</div>
	);
};

export default OrdersContainer;
