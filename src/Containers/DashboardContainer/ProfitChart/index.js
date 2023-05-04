import React from "react";
import ReactApexChart from "react-apexcharts";
import { primaryColor } from "../../../Constants";
import { FiBarChart2 } from "react-icons/fi";
import "./index.css";
import { IoMdArrowDropup, IoMdArrowUp } from "react-icons/io";
function ProfitChart() {
	const state = {
		series: [
			{
				name: "Sales",
				data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
				hidden: true,
			},
		],
		options: {
			legend: {
				show: false,
			},
			chart: {
				height: 350,
				type: "line",
				zoom: {
					enabled: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				colors: ["#F94F00"],
			},
			title: {
				text: "",
				align: "center",
			},
			grid: {
				show: false,

				row: {
					colors: ["transparent"], // takes an array which will be repeated on columns
					opacity: 0.5,
				},
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
				],
			},
			yaxis: {
				show: false,
			},
		},
	};

	return (
		<div className="cardProft">
			<div className="rowing">
				<select
					name="caasrs"
					id="as"
					className="chartSelect"
					style={{ marginRight: 5, marginLeft: 5 }}
					onChange={(e) => {
						// props.setFilterBy(e.target.value);
					}}
					// value={props.filterBy}
				>
					<option value="" disabled selected>
						Sort By
					</option>
					<option value="7">Last 7 Days</option>
					<option value="30">Last Month</option>
					<option value="6">Last 6 Months</option>
					<option value="12">Last Year</option>
				</select>
				<span className="chartIndicator centerAligner">
					<FiBarChart2 color="#F94F00" size={30} />
				</span>
			</div>
			<div className="rowStart">
				<div className="colStart">
					<span className="profitText">$12.5K</span>
					<div className="rowing">
						<span className="earningText">Earning</span>
						<span className="percentageText rowing">
							<IoMdArrowDropup color="#05CD99" />
							+2.45%
						</span>
					</div>
				</div>
				<div id="chart">
					<ReactApexChart
						options={state.options}
						series={state.series}
						type="line"
						height={200}
						width={400}
					/>
				</div>
			</div>
		</div>
	);
}

export default ProfitChart;
