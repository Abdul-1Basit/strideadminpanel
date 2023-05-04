import React from "react";
import Typography from "../../../Components/Typography";
import { Select, Row, Col } from "antd";
import { endpoints } from "../../../Helpers/dbConfig";
import { apiGetRequest } from "../../../Helpers/axiosRequests";
import Wrapper from "../../../Components/Wrapper";
import { useNavigate } from "react-router-dom";

import { MdOutlineAdd } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
const ProductCategorySearch = (props) => {
	const [arr, setArr] = React.useState([]);
	const navigate = useNavigate();

	const { Option } = Select;

	function onChange(value) {
		props.setFilterItem(value);
		//  props.setChangedFilterItem(true)
	}

	function onSearch(value) {}
	return (
		<Row
			style={{
				marginBottom: 24,
				marginLeft: 30,
				marginRight: 30,
				// width: "100%",
				backgroundColor: "transparent",
			}}
		>
			<Col xs={24} sm={24} md={4} lg={8} xl={3}>
				<span className="tableTitle">List of Workouts</span>
			</Col>
			<Col xs={24} sm={24} md={18} lg={16} xl={1} />
			<Col xs={24} sm={24} md={18} lg={16} xl={20} className="rowing">
				<div
					style={{
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,

						width: 170,
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
							width: 110,
						}}
						placeholder="Search a user"
						className="searchNewInput"
						value={props.searchUserQuery}
						onChange={(e) => {
							props.setSearchUserQuery(e.target.value);
						}}
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<div
					style={{
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,
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
						placeholder="Search a Workout"
						value={props.searchProgramQuery}
						onChange={(e) => {
							props.setSearchProgramQuery(e.target.value);
						}}
						className="searchNewInput"
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<select
					name="cars"
					id="cars"
					className="newSelect"
					value={props.orderBy}
					onChange={(e) => {
						props.setOrderBy(e.target.value);
					}}
				>
					<option value="volvo" disabled={true} selected={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>
				<select
					name="cars"
					id="cars"
					className="newSelect"
					value={props.filterBy}
					onChange={(e) => {
						props.setFilterBy(e.target.value);
					}}
				>
					<option value="volvo" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>
				<div
					className="newAddButton"
					onClick={() => {
						navigate("/workout/add");
					}}
				>
					<MdOutlineAdd
						color={"#fff"}
						size={20}
						style={{ marginLeft: 20, marginRight: 10 }}
					/>
					<span className="addbtnText" style={{ width: 125 }}>
						Add New
					</span>
				</div>
			</Col>
		</Row>
	);
};

export default ProductCategorySearch;
