import React from "react";
import OrdersContainer from "../../Containers/OrdersContainer";
import SideNavWrapper from "../../Containers/SideNavWrapper";

const Orders = (props) => {
	return (
		<SideNavWrapper>
			<OrdersContainer />
		</SideNavWrapper>
	);
};
export default Orders;
