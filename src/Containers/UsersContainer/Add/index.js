import React from "react";
import Typography from "../../../Components/Typography";
import union from "./../../../Assets/Union.png";

import SingleUserEntry from "./Single";
import Wrapper from "../../../Components/Wrapper";
const AddUser = (props) => {
	return (
		<div
			style={{
				border: 0,
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#fff",
				paddingRight: 12,
				paddingLeft: 12,
				height: "100%",
				width: "100%",
			}}
		>
			<Wrapper type="rowSpaced" marginTop={24} marginBottom={49}>
				<Typography
					alignment="left"
					title="Add user"
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>

				<img
					src={union}
					alt="Close icon"
					onClick={() => props.setAddModal(false)}
					style={{ width: 20, height: 20 }}
				/>
			</Wrapper>
			<SingleUserEntry
				setAddModal={props.setAddModal}
				successMessage={props.successMessage}
			/>
		</div>
	);
};

export default AddUser;
