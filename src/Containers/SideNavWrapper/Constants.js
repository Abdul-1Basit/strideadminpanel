import { AiFillHome } from "react-icons/ai";
import { FaBoxOpen, FaBloggerB, FaDumbbell } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { GiWeightLiftingUp, GiPerson } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbUnlink } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
export const listOfNavs = {
	one: [
		{
			itemName: "Dashboard",
			itemLogo: <AiFillHome size={25} />,
			navLink: "/dashboard",
			backgroundColor: "#1e293b",
			content: "happy to have you back",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Users",
			itemLogo: <FaBoxOpen size={25} />,
			navLink: "/users",
			backgroundColor: "#1e293b",
			content: "you can manage data related to app users",
			hasSubmenu: false,
			showSubmenu: false,
		},

		{
			itemName: "Products",
			itemLogo: <FaBoxOpen size={25} />,
			navLink: "/products",
			backgroundColor: "#1e293b",
			content: "manage your products here",
			hasSubmenu: false,
			showSubmenu: false,
		},

		{
			itemName: "Programs",
			itemLogo: <GiPerson size={23} />,
			navLink: "/programs",
			backgroundColor: "#1e293b",
			content: "Manage programs here",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Workouts",
			itemLogo: <GiWeightLiftingUp size={23} />,
			navLink: "/workouts",
			backgroundColor: "#1e293b",
			content: "Manage workout here",
			hasSubmenu: true,
			showSubmenu: false,
		},
		{
			itemName: "Workout Categories",
			itemLogo: <TfiMenuAlt size={23} />,
			navLink: "/workout-categories",
			backgroundColor: "#1e293b",
			content: "Manage workout categories here",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Exercises",
			itemLogo: <FaDumbbell size={23} />,
			navLink: "/exercises",
			backgroundColor: "#1e293b",
			content: "Manage exercises here",
			hasSubmenu: true,
			showSubmenu: false,
		},
		{
			itemName: "Exercise Categories",
			itemLogo: <TfiMenuAlt size={23} />,
			navLink: "/exercise-categories",
			backgroundColor: "#1e293b",
			content: "Manage exercise categories here",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Affiliates",
			itemLogo: <TbUnlink size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
			content: "",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Messages",
			itemLogo: <RiMessage2Fill size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
			content: "",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Employees",
			itemLogo: <FiUsers size={23} />,
			navLink: "/employees",
			backgroundColor: "#1e293b",
			content: "manage your staff here",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Orders",
			itemLogo: <MdProductionQuantityLimits size={23} />,
			navLink: "/orders",
			backgroundColor: "#1e293b",
			content: "you can order data here",
			hasSubmenu: false,
			showSubmenu: false,
		},
		{
			itemName: "Blogs",
			itemLogo: <FaBloggerB size={23} />,
			navLink: "/blogs",
			backgroundColor: "#1e293b",
			content: "Manage your blogs here",
			hasSubmenu: false,
			showSubmenu: false,
		},

		{
			itemName: "Onboarding Screen",
			itemLogo: <FaBloggerB size={23} />,
			navLink: "/onboardingsetting",
			backgroundColor: "#1e293b",
			content: "Update Onboarding screens",
			hasSubmenu: false,
			showSubmenu: false,
		},

		{
			itemName: "Request Consultation",
			itemLogo: <img src="/iconArrpw.png" style={{ width: 30, height: 30 }} />,
			navLink: "/reqconsultation",
			backgroundColor: "#1e293b",
			content: "Manage requests here",
			hasSubmenu: false,
			showSubmenu: false,
		},
	],
};
