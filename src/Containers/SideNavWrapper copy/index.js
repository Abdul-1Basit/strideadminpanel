import React from "react";
import Typography from "../../Components/Typography";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/Context";
// import { apiGetRequest } from "../../Helpers/axiosRequests";
// import { endpoints } from "../../Helpers/dbConfig";
import { listOfNavs } from "./Constants";
import SearchContainer from "./SearchContainers/SearchContainer";
// import WithoutSearchContainer from "./SearchContainers/WithoutSearchContainer";
import "./styles.css";
const { Sider } = Layout;

const SideNavWrapper = (props) => {
	const [userData, setUserData] = React.useContext(UserContext);
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = React.useState(false);

	const onCollapse = (collap) => {
		setCollapsed(collap);
	};

	// const getUserData = async () => {
	// 	try {
	// 		const res = await apiGetRequest(
	// 			endpoints.getUserInfo + parseInt(localStorage.getItem("id"))
	// 		);
	// 		const employee = res.data.data;
	// 		setUserData({
	// 			...userData,
	// 			id: employee.id,
	// 			firstName: employee.firstName,
	// 			lastName: employee.lastName,
	// 			phone: employee.phone,
	// 			email: employee.email,
	// 			designation: employee.designation,
	// 			roleId: employee.role,
	// 			storeId: employee.storeId,
	// 			avatar: employee.avatar,
	// 			isActive: employee.isActive,
	// 			isAdmin: employee.isAdmin ?? userData.isAdmin,
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// React.useEffect(() => {
	// 	if (userData.firstName === "") {
	// 		getUserData();
	// 	}
	// }, [userData.firstName]);

	const navigateToDashboard = () => {
		setUserData({ ...userData, topSearchQuery: "", activeIndex: 0 });
		navigate("/dashboard");
	};

	return (
		<Layout className="layoutStyle">
			<Sider
				className="sideNav"
				breakpoint="lg"
				//	onBreakpoint={() => setCollapsed(true)}
				collapsible
				collapsed={collapsed}
				width={220}
				onCollapse={onCollapse}
				style={{ width: "100%", backgroundColor: "#002140" }}
			>
				<div
					className="logo"
					style={{
						marginTop: 36,
						marginLeft: 8,
						marginBottom: 11,
						cursor: "pointer",
					}}
				>
					{collapsed ? (
						<div
							className="logo"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginTop: 36,
								marginBottom: 11,
							}}
						>
							<img
								src={"/logo192.png"}
								alt="Classy Small Logo"
								onClick={() => navigateToDashboard()}
								style={{
									width: "100%",
									maxWidth: 25,
									height: "auto",
									maxHeight: 24,
									minHeight: 15,
									marginBottom: 15.37,
								}}
							/>
						</div>
					) : (
						<div
							className="logo"
							style={{ marginTop: 36, marginLeft: 17, marginBottom: 11 }}
						>
							<img
								src={"/StrideGym.png"}
								onClick={() => navigateToDashboard()}
								alt="Classy Logo"
								style={{
									width: "100%",
									maxWidth: 140,
									height: "auto",
									maxHeight: 24,
									minHeight: 15,
									paddingLeft: 0,
									paddingRight: 5,
									marginBottom: 15.37,
								}}
							/>{" "}
						</div>
					)}{" "}
				</div>
				<Menu
					theme="dark"
					defaultSelectedKeys={["-1"]}
					activeKey={"-1"}
					onChange={(e) => {
						console.log("");
					}}
					style={{ backgroundColor: "#002140" }}
					mode="inline"
				>
					{listOfNavs.one.map((item, index) => {
						return (
							<Menu.Item
								key={index}
								icon={item.itemLogo}
								style={{
									color: userData.activeIndex === index ? "#002140" : "#fff",

									paddingTop: 34,
									paddingBottom: 34,
									backgroundColor:
										userData.activeIndex === index ? "#fff" : "#002140",
								}}
								onClick={(e) => {
									setUserData({
										...userData,
										//	topSearchQuery: "",
										activeIndex: index,
									})(
										item.navLink === "./Home"
											? console.log("")
											: navigate(item.navLink)
									);
								}}
							>
								<Typography
									alignment="left"
									type="navMenuItem"
									color={userData.activeIndex === index ? "#002140" : "#fff"}
									fontFamily="Gilroy-Medium"
									title={item.itemName}
								/>
							</Menu.Item>
						);
					})}
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<SearchContainer user={props.user} />

				{props.children}
			</Layout>
		</Layout>
	);
};

export default SideNavWrapper;
