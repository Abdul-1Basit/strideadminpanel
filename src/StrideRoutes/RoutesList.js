import Draws from "../Pages/Draws";
import Products from "../Pages/Products";
import Dashboard from "../Pages/Dashboard";
import Orders from "../Pages/Orders";
import Users from "../Pages/Users";
import Prizes from "../Pages/Prizes";
import Images from "../Pages/Images";
import Campaigns from "../Pages/CampaignsCategories";
import Employee from "../Pages/Employee";
import Winners from "../Pages/Winners";
const ProtectedRoutes = [
	{
		navLink: "/products",
		NavName: <Products />,
	},
	{
		navLink: "/images",
		NavName: <Images />,
	},
	{
		navLink: "/employees",
		NavName: <Employee />,
	},
	{
		navLink: "/draws",
		NavName: <Draws />,
	},

	{
		navLink: "/prizes",
		NavName: <Prizes />,
	},
	{
		navLink: "/orders",
		NavName: <Orders />,
	},
	{
		navLink: "/campaigns",
		NavName: <Campaigns />,
	},
	{
		navLink: "/users",
		NavName: <Users />,
	},
	{
		navLink: "/dashboard",
		NavName: <Dashboard />,
	},
	{
		navLink: "/winners",
		NavName: <Winners />,
	},
];
const UnprotectedRoutes = [
	{
		navLink: "",
		navName: "",
	},
];
export { ProtectedRoutes, UnprotectedRoutes };
