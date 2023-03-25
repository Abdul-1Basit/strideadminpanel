import React from "react";
import Typography from "../../../Components/Typography";
import Wrapper from "../../../Components/Wrapper";
import Union from "../../../Assets/Union.png";
import { Rate } from "antd";
import "./index.css";
const Clone = (props) => {
	// const [taxableSwitch, setTaxableSwitch] = React.useState(false);
	// const [productCategories, setProductCategories] = React.useState([]);
	let {
		productName,
		description,
		images,
		isActive,
		unitPrice,
		ratings,
		noOfItems,
		reviews,
	} = props.activeCategory;
	const [titleImage, setTitleImage] = React.useState(images.split(",")[0]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "justify-between",
				width: "100%",
				paddingTop: 0,
			}}
		>
			<div className="rowStart">
				<div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<img
							src={titleImage}
							alt={"titlepic"}
							style={{
								width: 212,
								height: 244,
								objectFit: "cover",
								borderRadius: 16,
								marginBottom: 10,
							}}
						/>
					</div>

					<br />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						paddingLeft: 15,
						marginTop: 0,
					}}
				>
					{/**Name Input */}
					<div className="rowing" style={{ paddingBottom: 10 }}>
						<span className="productLable">{productName}</span>
						<img
							src={Union}
							alt="Close icon"
							onClick={() => props.setCloneModal(false)}
							style={{ width: 14, height: 14, cursor: "pointer" }}
							className="closeIcon"
						/>
					</div>
					<div className="rowingStart" style={{ paddingBottom: 19 }}>
						<Rate value={ratings} disabled />
						<span className="ratings">{ratings}.0</span>
						<span className="reviews">({reviews})</span>
					</div>
					<div style={{ paddingBottom: 16 }}>
						<span className="totalItems">{noOfItems} Items in Stock</span>
					</div>
					<div>
						<span className="price">$&nbsp;{unitPrice}</span>
					</div>
				</div>
			</div>
			{/**Description */}
			<span className="descriptionSpan">{description}</span>
		</div>
	);
};
export default Clone;
