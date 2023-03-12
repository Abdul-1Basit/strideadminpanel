import React from "react";
import Chart from "react-apexcharts";
import Typography from "../../../Components/Typography";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
const SalesContainer = (props) => {
	// const [listOfSales, setListOfSales] = React.useState(
	// 	props.listOfSales ?? null
	// );

	const [series, setSeries] = React.useState([]);
	const options = {
		chart: {
			type: "donut",
		},
		colors: series.length < 1 ? ["gray"] : ["#fa9046", "#fcb686"],
		title: {
			text: undefined,
			align: "center",
			offsetY: 85,
			offsetX: 5,
			style: {
				fontSize: "18px",
				fontWeight: "bold",
				color: "#0F172A",
				fontFamily: "Gilroy-Regular",
			},
		},
		subtitle: {
			text: undefined,
			align: "center",
			offsetY: 110,
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

		stroke: { width: 0 },
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 170,
						height: 160,
					},
				},
			},
		],
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
	};
	// const returnSales = () => {
	// 	if (!listOfSales) {
	// 		return "0";
	// 	} else {
	// 		const { sales } = listOfSales;
	// 		if (!sales[0].totalSales) {
	// 			return "0";
	// 		} else {
	// 			return "$" + parseFloat(sales[0].totalSales).toFixed(2);
	// 		}
	// 	}
	// };
	// const getChange = () => {
	// 	if (!listOfSales) {
	// 		return "0";
	// 	} else {
	// 		const { avgSales, previousSales } = listOfSales;

	// 		if (!avgSales[0].avgSales || isNaN(avgSales[0].avgSales)) {
	// 			return (
	// 				<>
	// 					{" "}
	// 					<BsArrowDownShort color="red" style={{ fontSize: 25 }} />
	// 					<Typography
	// 						alignment="left"
	// 						type="navMenuItem"
	// 						fontFamily="Gilroy-Medium"
	// 						color="red"
	// 						title={"100%"}
	// 					/>
	// 				</>
	// 			);
	// 		} else if (
	// 			!previousSales[0].previouseTotalSales ||
	// 			isNaN(previousSales[0].previouseTotalSales)
	// 		) {
	// 			return (
	// 				<>
	// 					<BsArrowUpShort color="#10B981" style={{ fontSize: 25 }} />
	// 					<Typography
	// 						alignment="left"
	// 						type="navMenuItem"
	// 						fontFamily="Gilroy-Medium"
	// 						color="#10B981"
	// 						title={"100%"}
	// 					/>
	// 				</>
	// 			);
	// 		}
	// 		let reslt =
	// 			parseFloat(avgSales[0].avgSales).toFixed(2) -
	// 			parseFloat(previousSales[0].previouseTotalSales).toFixed(2);
	// 		reslt =
	// 			reslt / parseFloat(previousSales[0].previouseTotalSales).toFixed(2);
	// 		reslt *= 100;
	// 		reslt = reslt.toFixed(2);
	// 		if (isNaN(reslt)) {
	// 			return (
	// 				<Typography
	// 					alignment="left"
	// 					type="navMenuItem"
	// 					fontFamily="Gilroy-Medium"
	// 					color="#10B981"
	// 					title={"0"}
	// 				/>
	// 			);
	// 		} else if (reslt >= 0) {
	// 			return (
	// 				<>
	// 					<BsArrowUpShort color="#10B981" style={{ fontSize: 25 }} />
	// 					<Typography
	// 						alignment="left"
	// 						type="navMenuItem"
	// 						fontFamily="Gilroy-Medium"
	// 						color="#10B981"
	// 						title={reslt + "%"}
	// 					/>
	// 				</>
	// 			);
	// 		} else {
	// 			return (
	// 				<>
	// 					<BsArrowDownShort color="red" style={{ fontSize: 25 }} />
	// 					<Typography
	// 						alignment="left"
	// 						type="navMenuItem"
	// 						fontFamily="Gilroy-Medium"
	// 						color="red"
	// 						title={reslt + "%"}
	// 					/>
	// 				</>
	// 			);
	// 		}
	// 	}
	// };
	// const setValueForSeries = () => {
	// 	if (!props.listOfSales) {
	// 		return;
	// 	}
	// 	let arr = [];
	// 	if (props.listOfSales.avgSales.length > 0) {
	// 		arr.push(props.listOfSales.avgSales[0].avgSales ?? 0);
	// 	}
	// 	if (
	// 		props.listOfSales.previousSales &&
	// 		props.listOfSales.previousSales.length > 0
	// 	) {
	// 		arr.push(props.listOfSales.previousSales[0].previouseTotalSales ?? 0);
	// 	}

	// 	setSeries(arr);
	// };
	// React.useEffect(() => {
	// 	setListOfSales(props.listOfSales);
	// 	setValueForSeries();
	// }, [props.listOfSales]);

	return (
		<div className="salesContainer">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					<Typography
						alignment="left"
						type="cardHeading"
						color="#0F172A"
						fontFamily="Gilroy-Bold"
						title="Sales"
					/>

					<Typography
						alignment="left"
						type="navMenuItem"
						color="#64748B"
						fontFamily="Gilroy-Medium"
						// title={returnSales()}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					{/* {getChange()} */}
				</div>
			</div>

			<div
				style={{
					flex: 1,
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "right",
				}}
			>
				<Chart
					series={[
						{
							name: "Series 1",
							data: [45, 52, 38, 45, 19, 23, 2],
						},
					]}
					options={options}
					type="donut"
					width="150"
					height="170"
				/>
			</div>
		</div>
	);
};
export default SalesContainer;
