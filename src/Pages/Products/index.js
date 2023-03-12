import React from "react";
import ProductsContainer from "../../Containers/ProductsContainer";
import SideNavWrapper from "../../Containers/SideNavWrapper";


const Dashboard =(props)=> {

    return (
    <SideNavWrapper>
<ProductsContainer/>
    </SideNavWrapper>
    );
  
}
export default Dashboard;