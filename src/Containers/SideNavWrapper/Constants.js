import {
	MdSpaceDashboard,
	// MdShoppingCart,
	// MdList,
	// MdDashboardCustomize,
	// MdSupervisorAccount,
} from "react-icons/md";
// import {
// 	BsFillGiftFill, //, BsImages
// } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import {
	FaClipboardList,
	FaBoxOpen,
	FaBloggerB,
	FaDumbbell, //FaUsers
} from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
// import { ImDrawer } from "react-icons/im";
import { GoProject } from "react-icons/go";
import { GrYoga } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { GiWeightLiftingUp, GiPerson } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbUnlink } from "react-icons/tb";
export const listOfNavs = {
	one: [
		{
			itemName: "Dashboard",
			itemLogo: <AiFillHome size={25} />,
			navLink: "/dashboard",
			backgroundColor: "#1e293b",
			content: "happy to have you back",
		},
		{
			itemName: "Users",
			itemLogo: <FaBoxOpen size={25} />,
			navLink: "/users",
			backgroundColor: "#1e293b",
			content: "",
		},

		{
			itemName: "Products",
			itemLogo: <FaBoxOpen size={25} />,
			navLink: "/products",
			backgroundColor: "#1e293b",
			content: "manage your products here",
		},

		{
			itemName: "Programs",
			itemLogo: <GiPerson size={23} />,
			navLink: "/programs",
			backgroundColor: "#1e293b",
			content: "",
		},
		{
			itemName: "Workouts",
			itemLogo: <GiWeightLiftingUp size={23} />,
			navLink: "/workouts",
			backgroundColor: "#1e293b",
			content: "",
		},
		{
			itemName: "Exercises",
			itemLogo: <FaDumbbell size={23} />,
			navLink: "/exercises",
			backgroundColor: "#1e293b",
			content: "",
		},
		{
			itemName: "Affiliates",
			itemLogo: <TbUnlink size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
			content: "",
		},
		{
			itemName: "Messages",
			itemLogo: <RiMessage2Fill size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
			content: "",
		},
		{
			itemName: "Employees",
			itemLogo: <FiUsers size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
			content: "manage your staff here",
		},
		{
			itemName: "Orders",
			itemLogo: <MdProductionQuantityLimits size={23} />,
			navLink: "/orders",
			backgroundColor: "#1e293b",
			content: "you can order data here",
		},
		{
			itemName: "Blogs",
			itemLogo: <FaBloggerB size={23} />,
			navLink: "/blogs",
			backgroundColor: "#1e293b",
			content: "Manage your blogs here",
		},
	],
};
