// import 'antd/dist/antd.css';
import React from "react";
import StrideRoutes from "./StrideRoutes";
import UserProvider from "./Containers/UserContext/Context";
import "./App.css";
export default function App() {
	return (
		<UserProvider>
			<StrideRoutes />
		</UserProvider>
	);
}
