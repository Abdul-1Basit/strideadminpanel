import React from "react";
import CustomButton from "../../../Components/CustomButton";

// import { useReactToPrint } from "react-to-print";
import { Breadcrumb } from "antd";
//import {handlePrint}
import PrintOrder from "./PrintOrder";
import Typography from "../../../Components/Typography";
import { useNavigate } from "react-router-dom";
const PrintScreen = (props) => {
	let navigate = useNavigate();
	const componentRef = React.useRef();
	const handlePrint = null;
	//   useReactToPrint({
	//   content: () => componentRef.current,
	// });
	return (
		<div style={{ display: "flex", padding: 40, flexDirection: "column" }}>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "left",
					paddingBottom: 20,
				}}
			>
				<Breadcrumb>
					<Breadcrumb.Item
						onClick={() => {
							navigate("/orders");
						}}
					>
						<Typography
							alignment="left"
							title={"Orders"}
							fontFamily="Gilroy-normal"
							color="#0F172A"
							type="Heading"
						/>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Typography
							alignment="left"
							title={"Invoice"}
							fontFamily="Gilroy-Bold"
							color="#0F172A"
							type="Heading"
						/>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<PrintOrder ref={componentRef} orderId={props.invId} />
				<br />
				<CustomButton
					large={true}
					type={"button"}
					onClick={() => {
						handlePrint();
					}}
					title="Print Invoice"
				/>
			</div>
		</div>
	);
};
export default PrintScreen;
