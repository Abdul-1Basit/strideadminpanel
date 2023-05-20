import React from "react";
import Wrapper from "../../../Components/Wrapper";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
const ProductCategorySearch = (props) => {
	return (
		<Wrapper
			type="rowSpaced"
			// marginTop={32}
			marginBottom={24}
			marginLeft={30}
			marginRight={30}
			width={"100%"}
			backColor="transparent"
		>
			<Wrapper type="rowStart" backColor="transparent">
				<span className="tableTitle">List of Workout Categories</span>
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
						placeholder="Search a exercise"
						className="searchNewInput"
						// ,orderBy, setOrderBy,searchQuery, setSearchQuery
						value={props.searchQuery}
						onChange={(e) => {
							props.setSearchQuery(e.target.value);
						}}
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<div style={{ width: 45 }} />
				<select
					className="newSelect"
					value={props.orderBy}
					onChange={(e) => {
						props.setOrderBy(e.target.value);
					}}
				>
					<option value="" disabled={true} selected={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>
				<div style={{ width: 24 }} />
				<select
					className="newSelect"
					value={props.filterBy}
					onChange={(e) => {
						props.setFilterBy(e.target.value);
					}}
				>
					<option value="" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
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
export default ProductCategorySearch;
