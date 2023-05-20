import React from "react";
import "./index.css";
export default function CustomSmallCard(props) {
	return (
		<div
			className="customCrd"
			style={{
				backgroundColor: props.primaryColor,
				width: window.screen.width <= 1200 ? 265 : 330,
			}}
		>
			<div
				className="iconCircle"
				style={{ backgroundColor: props.secondaryColor }}
			>
				{props.icon}
			</div>
			<div className="cardContent">
				<span className="counting" style={{ color: props.textColor }}>
					{props.type === "productSecond" && props.headingCount + " "}
					<span
						className="cardHeading"
						style={{
							fontWeight: props.type === "productSecond" ? 400 : 500,
							color: props.textColor,
						}}
					>
						{props.heading}
					</span>
				</span>
				<span
					className={
						props.type === "productSecond"
							? "cardSmallSubHeading"
							: "cardSubHeading"
					}
					style={{ color: props.textColor }}
				>
					{props.subHeading}
				</span>
			</div>
		</div>
	);
}
