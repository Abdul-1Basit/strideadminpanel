import React from "react";
import PrintScreen from "../../Containers/OrdersContainer/PrintScreen";
import SideNavWrapper from "../../Containers/SideNavWrapper";
//import WrapperWithoutSearch from "../../Containers/SideNavWrapper/WrapperWithoutSearch";
import { useParams } from "react-router-dom";

const PrintOrder =(props)=> {
    const invId=useParams();
console.log('from parent',invId)
    return (
    <SideNavWrapper printOrder={true}>
<PrintScreen invId={invId}/>
    </SideNavWrapper>
    );
  
}
export default PrintOrder;