import React from "react";
// import { endpoints } from "../../../Helpers/dbConfig";
import { Input } from "antd";
import Wrapper from "../../../Components/Wrapper";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const ProductCategorySearch = (props) => {
	const navigate = useNavigate();
	// const [arr, setArr] = React.useState(null);

	// React.useEffect(() => {
	// 	if (!arr) {
	// 		getProductCategories();
	// 	}
	// }, [arr]);

	// const { Option } = Select;

	// function onChange(value) {
	// 	props.setFilterItem(value);
	// }

	// function onSearch(value) {}
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
				<span className="tableTitle">List of Blogs</span>
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
						placeholder="Search a blog"
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
					className="newSelect"
					onChange={(e) => props.setOrderBy(e.target.value)}
					value={props.orderBy}
				>
					<option value="" disabled={true} selected={true}>
						Sort By
					</option>
					<option value="dateCreated">Created</option>
					<option value="name">Name</option>
				</select>
				<div style={{ width: 24 }} />
				<select
					className="newSelect"
					onChange={(e) => props.setFilterBy(e.target.value)}
					value={props.filterBy}
				>
					<option value="" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="name">Name</option>
					<option value="description">Description</option>
					<option value="dateCreated">Created</option>
				</select>
				<div style={{ width: 24 }} />
				<div
					className="newAddButton"
					onClick={() => {
						navigate("/blogs/add");
					}}
				>
					<MdOutlineAdd color={"#fff"} size={20} />
					<span className="addbtnText">Add Blog</span>
				</div>
			</div>
		</Wrapper>
	);
};
export default ProductCategorySearch;
