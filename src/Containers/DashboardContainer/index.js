import React from "react";
import { Layout, Row, Col, message, Table } from "antd";
import { primaryColor } from "../../Constants";
import ShowbyDateContainer from "./ShowbyDateContainer";
import AverageOrders from "./AverageOrders";
import NewCustomers from "./NewCustomers";
import SalesContainer from "./SalesContainer";
import { FiDollarSign } from "react-icons/fi";
import { RiMessageFill } from "react-icons/ri";
import CustomSmallCard from "../../Components/CustomSmallCard";
const { Content } = Layout;

const DashboardContainer = (props) => {
	// const [listOfRecentOrders, setListOfRecentOrders] = React.useState(null);
	// const [listOfDeliveredOrders, setListOfDeliveredOrders] =
	// 	React.useState(null);
	// const [listOfItemsStock, setListOfItemsStock] = React.useState(null);
	const [orderBy, setOrderBy] = React.useState(7);
	// const [listOfSales, setListOfSales] = React.useState(null);
	// const [listOfOrders, setListOfOrders] = React.useState(null);
	// const [listOfNewCustomers, setListOfCustomers] = React.useState(null);
	// const getStatistics = async () => {
	// 	let body = {
	// 		option: orderBy ?? 1,
	// 	};
	// 	try {
	// 		const response = await apiPostRequest(
	// 			endpoints.dashboardStatistics,
	// 			body
	// 		);
	// 		if (response.status === 200) {
	// 			let { data } = response.data;
	// 			setListOfRecentOrders(data.RecentOrder);
	// 			setListOfDeliveredOrders(data.DeliveredOrders);
	// 			setListOfItemsStock(data.ItemsOutOfStock);
	// 			setListOfSales(data.sales);
	// 			setListOfCustomers(data.employees);
	// 			setListOfOrders(data.orders);
	// 		}
	// 	} catch (error) {
	// 		message.error("Dashboard data is not updated.");
	// 		console.log(error);
	// 	}
	// };
	// React.useEffect(() => {
	// 	getStatistics();
	// }, [orderBy]);
	const data = [
		{
			productImage: "/macccc.jpg",
			productName: "Macbook Air",
			productID: "10-3786-23",
		},

		{
			productImage: "/macAir.jpg",
			productName: "Macbook",
			productID: "10-4686-23",
		},

		{
			productImage: "/lgLaptop.jpg",
			productName: "LG Laptop",
			productID: "10-3233-23",
		},

		{
			productImage: "/macPro.jpg",
			productName: "Macbook Pro",
			productID: "10-1313-23",
		},

		{
			productImage: "/macPro2.jpg",
			productName: "Macbook Pro",
			productID: "10-2562-23",
		},
	];
	return (
		<div
			style={{
				backgroundColor: "#F8F7F3",
				display: "flex",
				flexDirection: "column",
				width: "100%",
			}}
		>
			<Content style={{ margin: "0" }}>
				<div
					className="site-layout-background"
					style={{
						display: "flex",
						flexDirection: "column",
						paddingLeft: 40,
						paddingRight: 40,
						minHeight: "100vh",
						height: "100%",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly",
						}}
					>
						<CustomSmallCard
							textColor="#fff"
							primaryColor="#F94F00"
							secondaryColor="rgba(255, 255, 255, 0.16)"
							icon={
								<FiDollarSign
									style={{ width: 38.75, height: 35.23, color: "#fff" }}
								/>
							}
							heading="Earning this month"
							// headingCount="120"
							subHeading="$9,246.4"
							type=""
						/>
						<CustomSmallCard
							textColor="#fff"
							primaryColor="#222222"
							secondaryColor="rgba(255, 255, 255, 0.16)"
							icon={
								<RiMessageFill
									style={{ width: 38.75, height: 35.23, color: "#fff" }}
								/>
							}
							heading="New Messages"
							// headingCount="120"
							subHeading="15"
							type=""
						/>
					</div>
					{/* <ShowbyDateContainer {...{ setOrderBy }} /> */}
					<Row>
						<Col
							sm={24}
							xs={24}
							md={12}
							lg={8}
							xl={8}
							xxl={8}
							style={{ marginBottom: 30 }}
						>
							{/* <SalesContainer listOfSales={[]} /> */}
						</Col>
						{/*	<Col sm={24} xs={24} md={12} lg={8} xl={8} xxl={8}>
							<NewCustomers listOfNewCustomers={[]} />
						</Col>
						<Col sm={24} xs={24} md={12} lg={8} xl={8} xxl={8}>
							<AverageOrders
								listOfOrders={[]} //{...{ listOfOrders, orderBy }}
							/>
						</Col>*/}
						<br />
						<br />
					</Row>
					<Row
						style={
							{
								// alignItems: "baseline",
								// justifyContent: "space-evenly",
							}
						}
					>
						<Col xs={24} xm={24} md={24} lg={10} xl={10} xxl={10}>
							<div
								style={{
									display: "flex",
									// alignItems: "flex-start",
									// justifyContent: "flex-start",
									flexDirection: "column",
									borderRadius: 8,
									backgroundColor: "#fff",
									// padding: 25,
									paddingLeft: 31,
									paddingRight: 31,
									paddingTop: 0,
									paddingBottom: 30,
									display: "flex",
								}}
							>
								<div className="rowing">
									<h3 className="recentTableHeading">Recent orders</h3>
									<span className="viewAll">view all</span>
								</div>
								<Table
									// rowSelection={rowSelection}
									columns={[
										{
											title: "Product Name",
											dataIndex: "name",
										},
										{
											title: "Ordered By",
											dataIndex: "age",
										},
										{
											title: "Quantity",
											dataIndex: "address",
										},

										{
											title: "Status",
											dataIndex: "address",
										},
									]}
									dataSource={[]}
								/>
							</div>
						</Col>
						<Col xs={24} xm={24} md={24} lg={2} xl={2} xxl={2}></Col>
						{/* <Col xs={24} xm={24} md={24} lg={10} xl={10} xxl={10}>
							<div
								style={{
									display: "flex",
									alignItems: "flex-start",
									justifyContent: "flex-start",
									flexDirection: "column",
								}}
							>
								<h3 style={{ textAlign: "left" }}>New users</h3>
								<Table
									// rowSelection={rowSelection}
									columns={[
										{
											title: "Image",
											dataIndex: "address",
										},
										{
											title: "User name",
											dataIndex: "name",
										},
										{
											title: "Signup Date",
											dataIndex: "address",
										},
									]}
									dataSource={[]}
								/>
							</div>
						</Col> */}
					</Row>
				</div>
			</Content>
		</div>
	);
};

export default DashboardContainer;
