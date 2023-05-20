import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import Wrapper from "../../../Components/Wrapper";

const ProductSearch = (props) => {
	const [arr, setArr] = React.useState([
		"Manufacturer",
		"Product Number",
		"Sku-ID",
		"Price Ascending",
	]);

	function onChange(value) {
		props.setFilterItem(value);
		props.setChangedFilterItem(true);
	}

	return (
		<Wrapper
			type="rowSpaced"
			// marginTop={32}
			marginBottom={24}
			marginLeft={0}
			marginRight={0}
			width={"100%"}
			backColor="transparent"
		>
			<Wrapper type="rowStart" backColor="transparent">
				<span className="tableTitle">List of Products</span>
			</Wrapper>
			<div className="searchDropDownWithButton">
				<div
					style={{
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,
						width: 194,
						border: "1px solid #E6E6E6",
						backgroundColor: "#F7F7F7",
						flexDirection: "row",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<input
						style={{
							background: "transparent",
							outline: "none",
							border: "none",
							paddingLeft: 10,
						}}
						placeholder="Search a product"
						className="searchNewInput"
						value={props.searchQuery}
						onChange={(e) => props.setSearchQuery(e.target.value)}
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<div style={{ width: 45 }} />
				<select
					name="sortBy"
					id="cars"
					className="newSelect"
					onChange={(e) => {
						props.setOrderBy(e.target.value);
					}}
					value={props.orderBy}
				>
					<option value="default" disabled={true} selected={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="productName">Name</option>
				</select>
				<div style={{ width: 24 }} />
				<select
					name="FilterBy"
					id="cars"
					className="newSelect"
					onChange={(e) => {
						props.setFilterItem(e.target.value);
					}}
					value={props.filterItem}
				>
					<option value="default" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="productName">Name</option>
				</select>
				<div style={{ width: 24 }} />
				<div
					className="newAddButton"
					onClick={() => {
						props.setAddModal(true);
					}}
				>
					<MdOutlineAdd color={"#fff"} size={20} />
					<span className="addbtnText">Add New</span>
				</div>
			</div>
		</Wrapper>
	);
};
export default ProductSearch;
