import React from "react";
// import SpinnerComponent from "../../../../Components/SpinnerComponent";
import "../index.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { InputNumber } from "antd";
// import { primaryColor } from "../../../../Constants";
// import { RiDeleteBackFill } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
export default function DayEdit(props) {
	// const [addingUser, setAddingUser] = React.useState(false);
	const [warmupCounter, setWarmupCounter] = React.useState(1);
	const [warmupOpen, setWarmupOpen] = React.useState(false);
	const [warmup, setWarmup] = React.useState(
		props.days[props.activeItemIndex].warmup ?? []
	);
	const [workoutCounter, setWorkoutCounter] = React.useState(1);
	const [workoutOpen, setWorkoutOpen] = React.useState(false);
	const [workout, setWorkout] = React.useState(
		props.days[props.activeItemIndex].workout ?? []
	);

	const [cooldownCounter, setCoolDownCounter] = React.useState(1);
	const [cooldownOpen, setCoolDownOpen] = React.useState(false);
	const [cooldown, setCoolDown] = React.useState(
		props.days[props.activeItemIndex].cooldown ?? []
	);
	return (
		<div className="containerForAdd">
			<div className="rowing">
				<div />
				{/* {addingUser ? (
					<SpinnerComponent size={"small"} />
				) : ( */}
				<div className="rowing">
					<span className="draftBtn" onClick={() => props.setActiveScreen(0)}>
						Cancel
					</span>
					<span
						className="savebtn"
						onClick={() => {
							// console.log("warm values", warmup);
							// console.log("workouts", workout);
							// console.log("cooldonw", cooldown);
							let oldDaya = [...props.days];
							oldDaya[props.activeItemIndex].warmup = warmup;
							oldDaya[props.activeItemIndex].workout = workout;
							oldDaya[props.activeItemIndex].cooldown = cooldown;
							props.setDays(oldDaya);
							props.setActiveScreen(0);
						}}
					>
						Save
					</span>
				</div>
				{/* )} */}
			</div>
			<div className="cardAdditionBlog">
				<div className="firstIteration">
					<div className="rowing">
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "row",
							}}
						>
							<div>
								<span className="tableTitle">Warmup</span>
							</div>
							<div>
								<span
									className="addBlogInputLabel"
									style={{ color: "black", marginLeft: 25, marginRight: 25 }}
								>
									No. of Exercises
								</span>
							</div>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv">
									<InputNumber
										min={1}
										max={30}
										// defaultValue={daysNumber}
										onChange={setWarmupCounter}
									/>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...warmup];
											for (let i = 0; i < warmupCounter; i++) {
												tempDays.push({
													id: warmup.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weight: 0,
													time: 0,
													rest: 0,
												});
												console.log("loop executing");
											}
											setWarmup(tempDays);
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="rowing">
							<span className="addfromCategories">Add from categories</span>
							<span
								onClick={() => setWarmupOpen(!warmupOpen)}
								style={{ cursor: "pointer" }}
							>
								{warmupOpen ? (
									<IoIosArrowUp color={"#F94F00"} size={25} />
								) : (
									<IoIosArrowDown color={"#F94F00"} size={25} />
								)}
							</span>
						</div>
					</div>
					<div className="barVertical" />
					{warmupOpen && (
						<>
							<div>
								{warmup.length > 0 &&
									warmup.map((item, index) => (
										<ExerciseItem item={item} index={index} />
									))}
							</div>
							<br />
							<span className="additionForNewWarmup" onClick={() => {}}>
								<GrAdd
									color={"#F94F00"}
									size={30}
									style={{ color: "#f9f4f00" }}
								/>
							</span>
						</>
					)}
				</div>
				<div className="firstIteration">
					<div className="rowing">
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "row",
							}}
						>
							<div>
								<span className="tableTitle">Workout</span>
							</div>
							<div>
								<span
									className="addBlogInputLabel"
									style={{ color: "black", marginLeft: 25, marginRight: 25 }}
								>
									No. of Exercises
								</span>
							</div>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv">
									<InputNumber
										min={1}
										max={30}
										// defaultValue={daysNumber}
										onChange={setWorkoutCounter}
										className=""
									/>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...workout];
											for (let i = 0; i < workoutCounter; i++) {
												tempDays.push({
													id: warmup.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setWorkout(tempDays);
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="rowing">
							<span className="addfromCategories">Add from categories</span>
							<span
								onClick={() => setWorkoutOpen(!workoutOpen)}
								style={{ cursor: "pointer" }}
							>
								{workoutOpen ? (
									<IoIosArrowUp color={"#F94F00"} size={25} />
								) : (
									<IoIosArrowDown color={"#F94F00"} size={25} />
								)}
							</span>
						</div>
					</div>
					<div className="barVertical" />
					{workoutOpen && (
						<>
							<div>
								{workout.length > 0 &&
									workout.map((item, index) => (
										<ExerciseItem item={item} index={index} />
									))}
							</div>
							<br />
							<span className="additionForNewWarmup" onClick={() => {}}>
								<GrAdd
									color={"#F94F00"}
									size={30}
									style={{ color: "#f9f4f00" }}
								/>
							</span>
						</>
					)}
				</div>
				<div className="firstIteration">
					<div className="rowing">
						<div
							style={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "row",
							}}
						>
							<div>
								<span className="tableTitle">Cooldown</span>
							</div>
							<div>
								<span
									className="addBlogInputLabel inputText"
									style={{ color: "black", marginLeft: 25, marginRight: 25 }}
								>
									No. of Exercises
								</span>
							</div>
							<div className="rowing ">
								<div className="daysAdditionBtnDiv">
									<InputNumber
										min={1}
										max={30}
										// defaultValue={daysNumber}
										onChange={setCoolDownCounter}
									/>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...cooldown];
											for (let i = 0; i < cooldownCounter; i++) {
												tempDays.push({
													id: cooldown.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setCoolDown(tempDays);
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="rowing">
							<span className="addfromCategories">Add from categories</span>
							<span
								onClick={() => setCoolDownOpen(!cooldownOpen)}
								style={{ cursor: "pointer" }}
							>
								{cooldownOpen ? (
									<IoIosArrowUp color={"#F94F00"} size={25} />
								) : (
									<IoIosArrowDown color={"#F94F00"} size={25} />
								)}
							</span>
						</div>
					</div>
					<div className="barVertical" />
					{cooldownOpen && (
						<>
							<div>
								{cooldown.length > 0 &&
									cooldown.map((item, index) => (
										<ExerciseItem item={item} index={index} />
									))}
							</div>
							<br />
							<span className="additionForNewWarmup" onClick={() => {}}>
								<GrAdd
									color={"#F94F00"}
									size={30}
									style={{ color: "#f9f4f00" }}
								/>
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
const ExerciseItem = ({ item, index }) => {
	return (
		<div style={{ marginBottom: 0 }}>
			<div className="rowing">
				<div className="rowing">
					<span className="exerciseLabel">EXERCISE # {index + 1}</span>
					<span className="deleteWarmup">
						<AiFillDelete color="#D30E0E" size={22} />
					</span>

					<span className="seeAll">set to all</span>
				</div>
				<div />
			</div>
			<div className="rowStart marginVertical50">
				<div className="flexStart">
					<span className="addBlogInputLabel">EXERCISE NAME</span>
					<div style={{ marginTop: 10 }}>
						<input
							className="addBlogInput inputText"
							type={"text"}
							onChange={(e) => {
								item.name = e.target.value;
							}}
							// value={item.name}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="addBlogInputLabel">Reps</span>
					<div style={{ marginTop: 10 }}>
						<InputNumber
							min={1}
							maxLength={20}
							onChange={(val) => {
								item.reps = val;
							}}
							className="inputNumberProgram inputText"
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="addBlogInputLabel">Sets</span>
					<div style={{ marginTop: 10 }}>
						<InputNumber
							min={1}
							maxLength={20}
							onChange={(val) => {
								item.sets = val;
							}}
							className="inputNumberProgram inputText"
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="addBlogInputLabel">Weights</span>
					<div style={{ marginTop: 10 }} className="colCenteral">
						<InputNumber
							min={1}
							maxLength={1000}
							onChange={(val) => {
								item.weight = val;
							}}
							className="inputNumberProgram inputText"
						/>
						<span>(lb)</span>
					</div>
				</div>
				<div className="flexStart">
					<span className="addBlogInputLabel">Time</span>
					<div style={{ marginTop: 10 }} className="colCenteral">
						<InputNumber
							min={1}
							maxLength={100000}
							onChange={(val) => {
								item.time = val;
							}}
							className="inputNumberProgram inputText"
						/>
						<span>(sec)</span>
					</div>
				</div>
				<div className="flexStart">
					<span className="addBlogInputLabel">Rest</span>
					<div style={{ marginTop: 10 }} className="colCenteral">
						<InputNumber
							min={1}
							maxLength={100000}
							onChange={(val) => {
								item.rest = val;
							}}
							className="inputNumberProgram inputText"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
