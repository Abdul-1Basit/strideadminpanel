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
// import { AiOutlineOrderedList } from "react-icons/ai";
import {
	FaClipboardList,
	FaBloggerB, //FaUsers
} from "react-icons/fa";
// import { ImDrawer } from "react-icons/im";
import { GoProject } from "react-icons/go";
import { GrYoga } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { GiJumpingRope } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";

export const listOfNavs = {
	one: [
		{
			itemName: "Dashboard",
			itemLogo: <MdSpaceDashboard size={25} />,
			navLink: "/dashboard",
			backgroundColor: "#1e293b",
		},

		{
			itemName: "Products",
			itemLogo: <FaClipboardList size={25} />,
			navLink: "/products",
			backgroundColor: "#1e293b",
		},
		{
			itemName: "Workouts",
			itemLogo: <GiJumpingRope size={23} />,
			navLink: "/workouts",
			backgroundColor: "#1e293b",
		},
		{
			itemName: "Exercises",
			itemLogo: <GrYoga size={23} />,
			navLink: "/exercises",
			backgroundColor: "#1e293b",
		},
		{
			itemName: "Employees",
			itemLogo: <FiUsers size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
		},
		{
			itemName: "Orders",
			itemLogo: <MdProductionQuantityLimits size={23} />,
			navLink: "/orders",
			backgroundColor: "#1e293b",
		},
		{
			itemName: "Blogs",
			itemLogo: <FaBloggerB size={23} />,
			navLink: "/blogs",
			backgroundColor: "#1e293b",
		},
		{
			itemName: "Programs",
			itemLogo: <GoProject size={23} />,
			navLink: "/programs",
			backgroundColor: "#1e293b",
		},
	],
};
