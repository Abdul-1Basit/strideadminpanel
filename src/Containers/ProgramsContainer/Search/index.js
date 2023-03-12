import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../../Components/Wrapper";
const ProductCategorySearch = (props) => {
	const [arr, setArr] = React.useState([]);
	const navigate = useNavigate();
	function onChange(value) {
		props.setFilterItem(value);
		//  props.setChangedFilterItem(true)
	}

	function onSearch(value) {}
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
				{/* <Typography
				alignment="left"
				title="List of Employees"
				fontFamily="Gilroy-Bold"
				color="#0F172A"
				type="Heading"
			/> */}
				<span className="tableTitle">List of Programs</span>
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
						marginRight: 30,
					}}
				>
					<input
						style={{
							background: "transparent",
							outline: "none",
							border: "none",
							paddingLeft: 10,
						}}
						placeholder="Search a user"
						className="searchNewInput"
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
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
						marginRight: 30,
					}}
				>
					<input
						style={{
							background: "transparent",
							outline: "none",
							border: "none",
							paddingLeft: 10,
						}}
						placeholder="Search a program"
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
					style={{ marginRight: 30 }}
				>
					<option value="volvo" disabled={true} selected={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>{" "}
				{/* <div style={{ width: 24 }} /> */}
				<select
					name="cars"
					id="cars"
					className="newSelect"
					style={{ marginRight: 30 }}
				>
					<option value="volvo" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
					<option value="Phone">Phone #</option>
					<option value="address">Address</option>
				</select>
				{/* <div style={{ width: 24 }} /> */}
				<div
					className="newAddButton"
					onClick={() => {
						navigate("/programs/add");
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
			</div>
		</Wrapper>
	);
};

export default ProductCategorySearch;
