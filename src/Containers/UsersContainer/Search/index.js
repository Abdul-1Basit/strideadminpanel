import React from "react";
import Wrapper from "../../../Components/Wrapper";
import { BsSearch } from "react-icons/bs";
import "./index.css";
const UserSearch = (props) => {
	return (
		<div className="usersTableTopDiv">
			<Wrapper type="rowStart" backColor="transparent">
				<span className="tableTitle">List of Users</span>
			</Wrapper>
			<div className="searchDropDownWithButton">
				<div
					style={{
						borderTopLeftRadius: 6,
						borderBottomLeftRadius: 6,
						marginLeft: 200,
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
			</div>
		</div>
	);
};
export default UserSearch;
