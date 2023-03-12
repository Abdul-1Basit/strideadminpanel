import React from "react";
import Typography from "../../../Components/Typography";
import { Select } from "antd";
import { endpoints } from "../../../Helpers/dbConfig";
import { apiGetRequest } from "../../../Helpers/axiosRequests";
import Wrapper from "../../../Components/Wrapper";
const ProductCategorySearch = (props) => {
	const [arr, setArr] = React.useState([]);

	const { Option } = Select;

	function onChange(value) {
		props.setFilterItem(value);
		//  props.setChangedFilterItem(true)
	}

	function onSearch(value) {}
	return (
		<Wrapper
			type="rowSpaced"
			marginTop={32}
			marginBottom={24}
			width={"100%"}
			backColor="transparent"
		>
			<Wrapper type="rowStart" backColor="transparent">
				<Typography
					alignment="left"
					title="Workouts"
					fontFamily="Gilroy-Bold"
					color="#0F172A"
					type="Heading"
				/>
			</Wrapper>
			<div className="searchDropDownWithButton">
				<input
					//					className="searchSelectStyle"
					onChange={(e) => onChange(e.target.value)}
					placeholder="Search Workouts"
					className="inputStyle"
					type={"text"}
					style={{ maxWidth: 250, height: 42, marginRight: 10 }}
				/>

				<input
					type={"button"}
					value={" + Add New"}
					onClick={() => {
						props.setAddModal(true);
					}}
					className="searchButtonStyle"
				/>
			</div>
		</Wrapper>
	);
};

export default ProductCategorySearch;
