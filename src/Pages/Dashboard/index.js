import React from "react";
import DashboardContainer from "../../Containers/DashboardContainer";
import SideNavWrapper from "../../Containers/SideNavWrapper";

const Dashboard = (props) => {
	return (
		<SideNavWrapper>
			<DashboardContainer />
		</SideNavWrapper>
	);
};
export default Dashboard;
