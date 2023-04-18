// import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "../Pages/Signin";
import ForgotPassword from "../Pages/ForgotPassword";
// import Draws from "../Pages/Draws";
import Products from "../Pages/Products";
import Dashboard from "../Pages/Dashboard";
// import Orders from "../Pages/Orders";
// import PrintOrder from "../Pages/PrintOrder";
// import ResetLink from "../Pages/ResetLink";
// import RestLinkUserContainer from "../Containers/RestLinkUserContainer";
// import ResetPassword from "../Pages/ResetPassword";
import Users from "../Pages/Users";
import AuthenticateRoute from "./AuthenticateRoute";
// import ResetPasswordUserContainer from "../Containers/ResetPasswordUserContainer";
// import Prizes from "../Pages/Prizes";
// import Images from "../Pages/Images";
// import Workouts from "../Pages/WorkoutsCategories";
import Employee from "../Pages/Employee";
// import { ProtectedRoutes } from "./RoutesList";
import Exercises from "../Pages/Exercises";
import Workouts from "../Pages/Workouts";
import Orders from "../Pages/Orders";
import Blogs from "../Pages/Blogs";
import Programs from "../Pages/Programs";
import AddBlog from "../Pages/Blogs/AddBog";
import EditBlog from "../Pages/Blogs/EditBlog";
import AddProgram from "../Pages/Programs/AddProgram";
import EditProgram from "../Pages/Programs/EditProgram";
import AddWorkout from "../Pages/Workouts/AddWorkout";
import EditWorkout from "../Pages/Workouts/EditWorkout";
import CloneProgram from "../Pages/Programs/CloneProgram";
import ViewProgram from "../Pages/Programs/CloneProgram copy";
import EditExercise from "../Pages/Exercises/EditExercise";
import Onboarding from "../Pages/Onboarding";
import ReqConsultation from "../Pages/ReqConsultation";
export default function StrideRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Signin />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/ForgotPassword" element={<ForgotPassword />} />
				{/* {ProtectedRoutes.map((Item, index) => {
					return (
						<Route
							key={index}
							path={Item.navLink}
							element={<AuthenticateRoute>{Item.NavName}</AuthenticateRoute>}
						/>
					);
				})} */}
				<Route
					path="/users"
					element={
						<AuthenticateRoute>
							<Users />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/products"
					element={
						<AuthenticateRoute>
							<Products />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/exercises"
					element={
						<AuthenticateRoute>
							<Exercises />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/exercises/edit/:id"
					element={
						<AuthenticateRoute>
							<EditExercise />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/onboardingsetting"
					element={
						<AuthenticateRoute>
							<Onboarding />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/reqconsultation"
					element={
						<AuthenticateRoute>
							<ReqConsultation />
						</AuthenticateRoute>
					}
				/>
				ReqConsultation
				<Route
					path="/workouts"
					element={
						<AuthenticateRoute>
							<Workouts />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/workout/add"
					element={
						<AuthenticateRoute>
							<AddWorkout />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/workouts/edit/:id"
					element={
						<AuthenticateRoute>
							<EditWorkout />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<AuthenticateRoute>
							<Dashboard />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/employees"
					element={
						<AuthenticateRoute>
							<Employee />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/orders"
					element={
						<AuthenticateRoute>
							<Orders />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/blogs"
					element={
						<AuthenticateRoute>
							<Blogs />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/blogs/add"
					element={
						<AuthenticateRoute>
							<AddBlog />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/blogs/edit/:id"
					element={
						<AuthenticateRoute>
							<EditBlog />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/programs"
					element={
						<AuthenticateRoute>
							<Programs />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/programs/add"
					element={
						<AuthenticateRoute>
							<AddProgram />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/programs/edit/:id"
					element={
						<AuthenticateRoute>
							<EditProgram />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/programs/clone/:id"
					element={
						<AuthenticateRoute>
							<CloneProgram />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/programs/view/:id"
					element={
						<AuthenticateRoute>
							<ViewProgram />
						</AuthenticateRoute>
					}
				/>
				{/* <Route
					path="/images"
					element={
						<AuthenticateRoute>
							<Images />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/employees"
					element={
						<AuthenticateRoute>
							<Employee />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/draws"
					element={
						<AuthenticateRoute>
							<Draws />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/prizes"
					element={
						<AuthenticateRoute>
							<Prizes />
						</AuthenticateRoute>
					}
				/>
				<Route path="/resetlink/:token/:id" element={<ResetLink />} />

				<Route
					path="/reset-link-user/:token/:id"
					element={<RestLinkUserContainer />}
				/>

				<Route path="/ResetPassword" element={<ResetPassword />} />
				<Route
					path="/reset-password-user"
					element={<ResetPasswordUserContainer />}
				/>

				<Route
					path="/orders"
					element={
						<AuthenticateRoute>
							<Orders />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/orders/invoice/:invId"
					element={
						<AuthenticateRoute>
							<PrintOrder />
						</AuthenticateRoute>
					}
				/>
				<Route
					path="/workouts"
					element={
						<AuthenticateRoute>
							<Workouts />
						</AuthenticateRoute>
					}
				/>

				<Route
					path="/users"
					element={
						<AuthenticateRoute>
							<Users />
						</AuthenticateRoute>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<AuthenticateRoute>
							<Dashboard />
						</AuthenticateRoute>
					}
				/> */}
			</Routes>
		</BrowserRouter>
	);
}
