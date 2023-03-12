// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getToken } from "../Helpers/tokenManagement";

export default function AuthenticateRoute(props) {
	//const authorized = getToken();
	return props.children;
	// authorized ?
	//     props.children
	//     : <Navigate to="/Signin" replace />
}
