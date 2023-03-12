import React from "react";
import { Dropdown, Modal, notification, Menu, Spin } from "antd";
import ViewProfile from "../../ProfileContainer/ViewProfile";
import EditProfile from "../../ProfileContainer/EditProfile";
import { HiMenuAlt3 } from "react-icons/hi";
import Wrapper from "../../../Components/Wrapper";
import { LoadingOutlined } from "@ant-design/icons";
import SearchInput from "../../../Components/SearchInput";
import profileImage from "./../../../Assets/uzer.jpg";
import bellIcon from "../../../Assets/bellIcon.jpg";
import usflag from "../../../Assets/usaFlag.png";
import { MdLogout } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { UserContext } from "../../UserContext/Context";
import { useNavigate } from "react-router-dom";
import { listOfNavs } from "../Constants";
const { SubMenu } = Menu;

const SearchContainer = (props) => {
	const [userData] = React.useContext(UserContext);
	const [viewProfileModal, setViewProfileModal] = React.useState(false);
	const [editProfileModal, setEditProfileModal] = React.useState(false);
	const navigate = useNavigate();

	const openEditProfile = () => {
		setViewProfileModal(false);
		setEditProfileModal(true);
	};
	const logOut = () => {
		const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
		notification.success({
			message: `Please wait....!`,

			description: `Logging out`,
			placement: "topRight",
			style: {},
			duration: 1.5,
			onClose: function () {
				localStorage.removeItem("token");
				navigate("/Signin");
			},

			icon: <Spin indicator={antIcon} />,
		});
	};

	const menuWhole = (
		<Menu>
			<Menu.Item key="1">
				<SubMenu style={{ textAlign: "left" }} title="Language">
					<Menu.Item>
						{" "}
						<img src={usflag} alt="flag" style={{ marginRight: 8 }} /> English
					</Menu.Item>
				</SubMenu>
			</Menu.Item>
			<Menu.Divider />

			<Menu.Item key="2">
				<div
					onClick={() => {
						logOut();
					}}
					className="menuItemDiv"
				>
					Logout
					<MdLogout size={18} />
				</div>
			</Menu.Item>
		</Menu>
	);
	return (
		<div
			style={{
				width: "100%",
				borderTopLeftRadius: 72,
				backgroundColor: "#f8f7f3",
			}}
		>
			<div className="profileModalDiv">
				<Modal
					visible={viewProfileModal}
					title=""
					onCancel={() => setViewProfileModal(false)}
					closable={false}
					className="ModalStyle"
					footer={null}
				>
					<ViewProfile {...{ setViewProfileModal, openEditProfile }} />
				</Modal>
				<Modal
					visible={editProfileModal}
					title=""
					onCancel={() => setEditProfileModal(false)}
					closable={false}
					className="ModalStyle"
					footer={null}
				>
					<EditProfile setEditProfileModal={setEditProfileModal} />
				</Modal>
			</div>

			<div className="searchContainer" style={{ paddingRight: 30 }}>
				<div
					style={{
						width: "100%",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
						display: "flex",
					}}
				>
					{/* <Dropdown overlay={menuWhole}>
						<HiMenuAlt3 style={{ marginLeft: 5 }} size={25} />
					</Dropdown> */}
					{listOfNavs.one[userData.activeIndex].itemName === "Dashboard" ? (
						<span className="sContainerTitle">Hey Ruben!</span>
					) : (
						<span className="sContainerTitle">
							{userData.activeIndex !== -1
								? listOfNavs.one[userData.activeIndex].itemName
								: ""}
						</span>
					)}
					<span className="sContainerSubTitle">
						{userData.activeIndex !== -1
							? listOfNavs.one[userData.activeIndex].content
							: ""}
						{/* {listOfNavs.one[userData.activeIndex].content} */}
					</span>
					{/* <SearchInput value={"Search"} /> */}
				</div>
				<div className="rowing">
					{/* <img src={bellIcon} className="bellIcon" alt="Bell Icon" /> */}
					<BsFillBellFill size={25} color="#222222" />
					<RiMessage2Fill
						size={25}
						color="#222222"
						style={{ marginRight: 43, marginLeft: 30 }}
					/>
					<div
						onClick={() => setViewProfileModal(true)}
						// className="userInfoDiv"
						style={{
							flexDirection: "row",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div className="colAlignStart">
							<span className="searchUserLabel">Ruben</span>
						</div>{" "}
						<img src={profileImage} alt="profileLogo" className="profilImage" />
					</div>
				</div>
			</div>
		</div>
	);
};
export default SearchContainer;
