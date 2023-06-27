import React from "react";
import { Layout, Row, Col, message, Table } from "antd";
// import { primaryColor } from "../../Constants";
// import ShowbyDateContainer from "./ShowbyDateContainer";
// import AverageOrders from "./AverageOrders";
// import NewCustomers from "./NewCustomers";
// import SalesContainer from "./SalesContainer";
import NewOrdersToday from "./NewOrdersToday";
import { FiDollarSign } from "react-icons/fi";
import { RiMessageFill } from "react-icons/ri";
import CustomSmallCard from "../../Components/CustomSmallCard";
import TopProgrammes from "./TopProgrammes";
import TotalUsers from "./TotalUsers";
import ProfitChart from "./ProfitChart";
import "./index.css";
import { getAllOrders } from "../../Helpers/firebase";

const { Content } = Layout;

const DashboardContainer = (props) => {
	const [recentOrders, setRecentOrders] = React.useState([]);
	React.useLayoutEffect(() => {
		getOrders();
	}, []);
	const getOrders = async () => {
		const results = await getAllOrders();
		setRecentOrders(results);
	};
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
					<Row
						style={
							{
								// alignItems: "baseline",
								// justifyContent: "space-evenly",
							}
						}
						gutter={[20, 10]}
					>
						<Col xs={24} xm={24} md={24} lg={16} xl={16} xxl={16}>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-evenly",
									marginBottom: 24,
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
							<ProfitChart />
							<div className="ordersCardDashboard">
								<div className="rowing">
									<h3 className="recentTableHeading">Recent orders</h3>
									<span className="viewAll">view all</span>
								</div>
								<Table
									// rowSelection={rowSelection}
									columns={[
										{
											title: "Products",
											// dataIndex: "row",
											render: (rowData) => (
												<span className="bolderTableText">
													{rowData.itemIds.length}
												</span>
											),
										},
										{
											title: "Ordered By",
											dataIndex: "age",
											render: () => (
												<span className="bolderTableText">James Lord</span>
											),
										},
										{
											title: "Quantity",
											dataIndex: "address",
											render: (add) => (
												<span className="bolderTableText">{add}</span>
											),
										},

										{
											title: "Status",
											// dataIndex: "deliveryStatus",
											render: (rowData) => (
												<div
													className="capsule"
													style={{
														backgroundColor:
															rowData.deliveryStatus.toLowerCase() ===
															"fulfilled"
																? "#5DB135"
																: rowData.deliveryStatus === "Cancelled"
																? "#D30E0E"
																: "#E2BB2E",
													}}
												>
													<span
														className="tableContent"
														style={{ color: "#fff" }}
													>
														{rowData.deliveryStatus}
													</span>
												</div>
											),
										},
									]}
									dataSource={recentOrders}
								/>
							</div>
						</Col>
						<Col xs={24} xm={24} md={24} lg={8} xl={8} xxl={8}>
							<NewOrdersToday number={52} />
							<TotalUsers />
							<TopProgrammes
								list={[
									{
										name: "Uphill Straight to top",
										participants: 420,
									},

									{
										name: "Down the road cardio",
										participants: 300,
									},
									{
										name: "Lifting Body Weight",
										participants: 210,
									},

									{
										name: "Jaming the jack hammer",
										participants: 120,
									},

									{
										name: "Running late nightr",
										participants: 90,
									},
								]}
							/>
						</Col>
					</Row>
				</div>
			</Content>
		</div>
	);
};

export default DashboardContainer;
