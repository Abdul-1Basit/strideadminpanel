import React from "react";
import { endpoints } from "../../../Helpers/dbConfig";
import { Select, Input } from "antd";
import Typography from "../../../Components/Typography";
import { apiGetRequest } from "../../../Helpers/axiosRequests";
import { searchAddButton } from "../../CommonStyles";
import Wrapper from "../../../Components/Wrapper";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
const { Search } = Input;
const ProductCategorySearch = (props) => {
	const [arr, setArr] = React.useState(null);
	// const getProductCategories = async () => {
	// 	try {
	// 		const res = await apiGetRequest(endpoints.getListOfUsers);
	// 		if (res.status === 200) {
	// 			setArr(res.data.data.data);
	// 			console.log("userlist", res.data.data.data);
	// 			return;
	// 		}
	// 		throw new Error("Failed to get USERS list!");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// React.useEffect(() => {
	// 	if (!arr) {
	// 		getProductCategories();
	// 	}
	// }, [arr]);

	const { Option } = Select;

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
				<span className="tableTitle">List of Requests</span>
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
						placeholder="Search a user"
						className="searchNewInput"
					/>
					<button className="searchIconbtn">
						<BsSearch size={23} color="#fff" />
					</button>
				</div>
				<div style={{ width: 45 }} />
				<select name="cars" id="cars" className="newSelect">
					<option value="volvo" disabled={true}>
						Sort By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
				</select>{" "}
				<div style={{ width: 24 }} />
				<select name="cars" id="cars" className="newSelect">
					<option value="volvo" disabled={true} selected={true}>
						Filter By
					</option>
					<option value="id">Id</option>
					<option value="name">Name</option>
					<option value="Phone">Phone #</option>
					<option value="address">Address</option>
				</select>
				<div style={{ width: 24 }} />
				{/* <div
					className="newAddButton"
					onClick={() => {
						props.setAddModal(true);
					}}
				>
					<MdOutlineAdd color={"#fff"} size={20} />
					<span className="addbtnText">Add New</span>
				</div> */}
			</div>
		</Wrapper>
	);
};
export default ProductCategorySearch;
