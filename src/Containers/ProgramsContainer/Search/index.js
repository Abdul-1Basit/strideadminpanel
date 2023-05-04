import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../Components/Wrapper";
import { Row, Col } from "antd";
const ProductCategorySearch = (props) => {
	const [arr, setArr] = React.useState([]);
	const navigate = useNavigate();
	function onChange(value) {
		props.setFilterItem(value);
		//  props.setChangedFilterItem(true)
	}

	function onSearch(value) {}
	return (
		// <Wrapper
		// 	type="rowSpaced"
		// 	// marginTop={32}
		// 	marginBottom={24}
		// 	marginLeft={30}
		// 	marginRight={30}
		// 	width={"100%"}
		// 	backColor="transparent"
		// >
		<Row
			style={{
				marginBottom: 24,
				marginLeft: 10,
				marginRight: 10,
				// width: "100%",
				backgroundColor: "transparent",
			}}
		>
			<Col xs={24} sm={24} md={4} lg={8} xl={3}>
				<span className="tableTitle">List of Programs</span>
			</Col>
			<Col xs={24} sm={24} md={18} lg={16} xl={1} />
			<Col xs={24} sm={24} md={18} lg={16} xl={20} className="rowing">
				<div
					style={{
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,
						// width: "100%",
						// maxWidth: 194,
						width: 170,
						border: "1px solid #E6E6E6",
						backgroundColor: "#F7F7F7",
						flexDirection: "row",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						// marginRight: 30,
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
						marginLeft: 10,
					}}
				>
					<input
						style={{
							background: "transparent",
							outline: "none",
							border: "none",
							paddingLeft: 10,
							width: 130,
						}}
						placeholder="Search a program"
						className="searchNewInput"
						value={props.searchProgramQuery}
						onChange={(e) => {
							props.setSearchProgramQuery(e.target.value);
						}}
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<select
					name="cars"
					id="cars"
					className="newSelect"
					style={{ marginRight: 5, marginLeft: 5 }}
					onChange={(e) => {
						props.setOrderBy(e.target.value);
					}}
					value={props.orderBy}
				>
					<option value="" disabled selected={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>
				<select
					name="caasrs"
					id="as"
					className="newSelect"
					style={{ marginRight: 5, marginLeft: 5 }}
					onChange={(e) => {
						props.setFilterBy(e.target.value);
					}}
					value={props.filterBy}
				>
					<option value="" disabled selected>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>
				<div
					className="newAddButton"
					onClick={() => {
						navigate("/programs/add");
					}}
					style={{
						width: window.screen.width <= 1200 ? 150 : 188,
						marginLeft: 5,
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
