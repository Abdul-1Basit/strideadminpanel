import React from "react";
import Typography from "../../../Components/Typography";
import union from "./../../../Assets/Union.png";

import SingleCategoryEntry from "./Single";
import Wrapper from "../../../Components/Wrapper";

const AddProductCategory = (props) => {
	return (
		<Wrapper type="colStart" backColor="#fff" pR={12} pL={12} w={"100%"}>
			<Wrapper type="rowSpaced" marginTop={24} marginBottom={49} w={"100%"}>
				<Typography
					alignment="left"
					title="Add Workout"
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>

				<img
					src={union}
					alt="Close icon"
					onClick={() => {
						props.setAddModal(false);
					}}
					style={{ width: 20, height: 20 }}
				/>
			</Wrapper>
			{/**Product Entry Type */}
			<Wrapper type="colCenteral" w={"100%"}>
				<SingleCategoryEntry {...{ props }} />
			</Wrapper>
		</Wrapper>
	);
};

export default AddProductCategory;
