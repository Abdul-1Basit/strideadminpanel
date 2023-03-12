import React from "react";
export const UserContext = React.createContext();
const UserProvider = (props) => {
	const [userData, setUserData] = React.useState({
		id: 3,
		firstName: "",
		lastName: "",
		fullName: "",
		phone: "",
		email: "",
		designation: "",
		role: "",
		avatar: "",
		isActive: 1,
		activeIndex: -1,
		changedQuery: false,
	});
	React.useEffect(() => {
		// console.log(userData)
	}, [userData]);
	return (
		<UserContext.Provider value={[userData, setUserData]}>
			{props.children}
		</UserContext.Provider>
	);
};
export default UserProvider;
