import React from "react";
import Typography from "../../../Components/Typography";
import Chart from "react-apexcharts";

const CustomerFeedback = (props) => {
	const series = [100, 17];
	const options = {
		chart: {
			type: "donut",
		},
		colors: ["#d1d1d1", "#E5E5E5", "#10b981", "#e2e8f0"],
		title: {
			text: "83%",
			align: "center",
			offsetX: 5,
			offsetY: 150,
			style: {
				fontSize: "26px",
				fontWeight: "bold",
				color: "#0F172A",
				fontFamily: "Gilroy-Regular",
			},
		},
		subtitle: {
			text: "Positive Feedback",
			align: "center",
			offsetY: 180,
			style: {
				fontSize: "12px",
				fontWeight: "normal",
				fontFamily: "Gilroy-Regular",
				color: "#64748B",
			},
		},
		dataLabels: {
			enabled: false,
			show: false,
		},
		plotOptions: {
			pie: {
				startAngle: -135,
				endAngle: 135,
				width: 2,
				customScale: 0.8,
				expandOnClick: false,
				donut: {
					size: "91%",
					background: "transparent",
					borderEndRadius: 20,
				},
			},
		},

		stroke: { width: 0 },

		xaxis: {
			label: {
				show: false,
			},
		},
		yaxis: {
			label: {
				show: false,
			},
		},

		tooltip: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 205,
						height: 300,
					},
				},
			},
		],
	};
	return (
		<div
			style={{
				opacity: 0,
				paddingTop: 24,
				flexDirection: "column",
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				marginBottom: 8,
			}}
		>
			<Typography type="Heading" color="#0F172A" title="Customer Feedback" />
			<br />
			<div className="customerFeedback">
				<Chart
					series={series}
					options={options}
					type="donut"
					width="320"
					height={300}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						type="cardHeading"
						color="#64748B"
						fontFamily="Gilroy-Medium"
						title="Total Customers"
					/>
					<Typography
						type="navMenuItem"
						color="#0F172A"
						fontFamily="Gilroy-Bold"
						title="$4,598.0"
					/>
				</div>
			</div>
		</div>
	);
};
export default CustomerFeedback;
