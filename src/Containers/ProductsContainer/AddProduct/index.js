import React from "react";
import SingleProductEntry from "./Single";
import union from "./../../../Assets/Union.png";
import Wrapper from "../../../Components/Wrapper";
const AddProduct = (props) => {
	// const [selectedType, setSelectedType] = React.useState(0);

	return (
		<div style={{ width: "100%" }}>
			<Wrapper type="rowSpaced" marginTop={30} marginBottom={0} w={"100%"}>
				<span className="modalHeadingAdd">Add A New Product</span>
				<img
					src={union}
					alt="Close icon"
					onClick={() => props.setAddModal(false)}
					style={{ width: 14, height: 14, cursor: "pointer" }}
					className="closeIcon"
				/>
			</Wrapper>
			{/**Product Entry Type */}
			<Wrapper type="colCenteral" w={"100%"}>
				<SingleProductEntry
					// tableRef={props.tableRef}
					successMessage={props.successMessage}
					setAddModal={props.setAddModal}
					productsList={props.productsList}
				/>
			</Wrapper>
		</div>
	);
};

export default AddProduct;
