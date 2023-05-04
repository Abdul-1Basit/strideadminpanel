import React from "react";
import "../index.css";
// import { InputNumber } from "antd";
import Select from "react-select";
import { IoIosArrowUp, IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { WeightSelection, TimeSelection } from "./AddOns";
import { getAllExercises } from "../../../../Helpers/firebase";
import { Input, notification } from "antd";
// import {IosIosArrowUp}
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
const { TextArea } = Input;
export default function DayEdit(props) {
	const [refreshMe, setRefereshMe] = React.useState(false);
	const [warmupCounter, setWarmupCounter] = React.useState(1);
	const [warmupOpen, setWarmupOpen] = React.useState(true);
	const [warmup, setWarmup] = React.useState(props.data.warmup ?? []);
	const [workoutCounter, setWorkoutCounter] = React.useState(1);
	const [workoutOpen, setWorkoutOpen] = React.useState(true);
	const [workout, setWorkout] = React.useState(props.data.workout ?? []);
	const [listOfCategories, setListOfCategories] = React.useState([]);
	const [cooldownCounter, setCoolDownCounter] = React.useState(1);
	const [cooldownOpen, setCoolDownOpen] = React.useState(true);
	const [cooldown, setCoolDown] = React.useState(props.data.cooldown ?? []);
	const [api, contextHolder] = notification.useNotification();
	const [notes, setNotes] = React.useState(props.data.notes ?? "");
	const deleteMeFromWarmup = (index) => {
		let newArr = [...warmup];
		newArr = newArr.filter((itm, idex) => idex !== index);
		setWarmup(newArr);
		setRefereshMe(true);
	};

	const deleteMeFromWorkout = (index) => {
		let newArr = [...workout];
		newArr = newArr.filter((itm, idex) => idex !== index);
		setWorkout(newArr);
		setRefereshMe(true);
	};

	const deleteMeFromCoolDown = (index) => {
		let newArr = [...cooldown];
		newArr = newArr.filter((itm, idex) => idex !== index);
		setCoolDown(newArr);
		setRefereshMe(true);
	};
	const setToAllWarmup = (index) => {
		let item = warmup[index]; //.find((itm, idex) => idex === index);
		let newArr = [...warmup];
		newArr.forEach((innerItem, innnerIndex) => {
			// innerItem.name = item.name;
			innerItem.reps = item.reps;
			innerItem.sets = item.sets;
			innerItem.weight = item.weight;
			innerItem.time = item.time;
			innerItem.rest = item.rest;
		});
		// console.log("loop executing");

		setWarmup(newArr);
		setRefereshMe(true);
	};
	const setToAllWorkout = (index) => {
		let item = workout[index]; //.find((itm, idex) => idex === index);
		let newArr = [...workout];
		newArr.forEach((innerItem, innnerIndex) => {
			// innerItem.name = item.name;
			innerItem.reps = item.reps;
			innerItem.sets = item.sets;
			innerItem.weight = item.weight;
			innerItem.time = item.time;
			innerItem.rest = item.rest;
			console.log("current active val", item);
		});
		console.log("executingsetto All workout function");

		setWorkout(newArr);
	};
	const setToAllCoolDown = (index) => {
		let item = cooldown[index]; //.find((itm, idex) => idex === index);
		let newArr = [...cooldown];
		newArr.forEach((innerItem, innnerIndex) => {
			// innerItem.name = item.name;
			innerItem.reps = item.reps;
			innerItem.sets = item.sets;
			innerItem.weight = item.weight;
			innerItem.time = item.time;
			innerItem.rest = item.rest;
		});
		// console.log("loop executing");

		setCoolDown(newArr);
	};

	React.useEffect(() => {
		if (refreshMe) {
			setRefereshMe(false);
		}
		if (listOfCategories.length === 0) fetchExercises();
	}, [refreshMe]);
	const fetchExercises = async () => {
		const listOfExes = await getAllExercises();
		let listOfExercisez = [];
		// listOfExes.forEach((item) => {
		// 	if (categoryList.findIndex((lIndex) => lIndex === item.category) < 0) {
		// 		categoryList.push(item.category);
		// 	}
		// });
		// categoryList.forEach((itemOne) => {
		listOfExes.forEach((itemTwo) => {
			// if (itemOne === itemTwo.category) {
			listOfExercisez.push(itemTwo.name);
			// }
		});
		// prevCatogries.push({
		// 	categoryName: itemOne,
		// 	listOfExercises: listOfExercisez,
		// });
		// listOfExercisez = [];
		// });
		setListOfCategories(listOfExercisez);
		console.log("list ofexercises", listOfExercisez);
	};
	return (
		<div
			className="containerForAdd"
			style={{
				width: "100%",
			}}
		>
			{contextHolder}
			<div className="rowing">
				<div />
				<div className="rowing">
					<span
						className="savebtn"
						style={{
							border: props.prompted ? "1px solid #FE5000" : "none",
						}}
						onClick={() => {
							// console.log("warm values", warmup);
							// console.log("workouts", workout);
							// console.log("cooldonw", cooldown);
							let oldDaya = { ...props.data };
							oldDaya.warmup = warmup;
							oldDaya.workout = workout;
							oldDaya.cooldown = cooldown;
							oldDaya.notes = notes;
							props.setData(oldDaya);
						}}
					>
						Save
					</span>
				</div>
			</div>
			<div
				className="cardAdditionBlog"
				style={{ border: props.prompted ? "1px solid #FE5000" : "none" }}
			>
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
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"text"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										// defaultValue={daysNumber}
										style={{ width: 50 }}
										value={warmupCounter}
										onChange={(e) => {
											if (parseInt(e.target.value) > -1)
												setWarmupCounter(parseInt(e.target.value));
											if (!e.target.value) {
												setWarmupCounter(0);
											}
										}}
									/>
									<div className="colCenter">
										<IoIosArrowUp
											onClick={() => {
												setWarmupCounter((prev) => prev + 1);
											}}
											style={{ cursor: "pointer" }}
										/>
										<IoIosArrowDown
											onClick={() => {
												if (warmupCounter !== 0)
													setWarmupCounter((prev) => prev - 1);
											}}
											style={{ cursor: "pointer" }}
										/>
									</div>
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
													weightunit: "lbs",
													timeUnit: "Sec",
													restUnit: "Sec",
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setWarmup(tempDays);
											setWarmupOpen(true);
											notification.success({
												message:
													warmupCounter > 1
														? `You have added ${warmupCounter} days to the warmup`
														: `You have added ${warmupCounter} day to the warmup`,
												description: ``, //`${values.name}  has been successfully updated`,
												placement: "topRight",
												duration: 3,
												onClose: function () {
													setWarmupCounter(0);
												},
											});
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div
							onClick={() => setWarmupOpen(!warmupOpen)}
							style={{ cursor: "pointer", fontWeight: "bold" }}
						>
							{warmupOpen ? (
								<SlArrowUp color="#F94F00" size={30} />
							) : (
								<SlArrowDown color="#F94F00" size={30} fontWeight={"bold"} />
							)}
						</div>
					</div>
					<div className="barVertical" />
					{warmupOpen && (
						<>
							<div>
								{warmup.length > 0 &&
									warmup.map((item, index) => (
										<ExerciseItem
											listOfCategories={listOfCategories}
											item={item}
											index={index}
											deleteMe={deleteMeFromWarmup}
											setToAll={setToAllWarmup}
											setterFunc={setWarmup}
											activeParentItem={warmup}
										/>
									))}
							</div>
							<span
								className="additionForNewWarmup"
								onClick={() => {
									let tempDays = [...warmup];
									for (let i = 0; i < 1; i++) {
										tempDays.push({
											id: warmup.length + i,
											name: "",
											reps: 0,
											sets: 0,
											weightunit: "lbs",
											timeUnit: "Sec",
											restUnit: "Sec",
											weight: 0,
											time: 0,
											rest: 0,
										});
										// console.log("loop executing");
									}
									setWarmup(tempDays);
								}}
							>
								<IoMdAdd
									color={"#F94F00"}
									size={40}
									style={{ color: "#F94F00", fontSize: 40 }}
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
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"text"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										// defaultValue={daysNumber}
										// onChange={setWorkoutCounter}
										style={{ width: 50 }}
										value={workoutCounter}
										onChange={(e) => {
											if (parseInt(e.target.value) > -1)
												setWorkoutCounter(parseInt(e.target.value));
											// console.log("worokout counter value", e.target.value);
										}}
										// className=""
									/>
									<div className="colCenter">
										<IoIosArrowUp
											onClick={() => {
												setWorkoutCounter((prev) => prev + 1);
											}}
											style={{ cursor: "pointer" }}
										/>
										<IoIosArrowDown
											onClick={() => {
												if (workoutCounter !== 0)
													setWorkoutCounter((prev) => prev - 1);
											}}
											style={{ cursor: "pointer" }}
										/>
									</div>
									<button
										className="dayssAdditionBtn"
										onClick={() => {
											let tempDays = [...workout];
											for (let i = 0; i < workoutCounter; i++) {
												tempDays.push({
													id: workout.length + i,
													name: "",
													reps: 0,
													sets: 0,
													weightunit: "lbs",
													timeUnit: "Sec",
													restUnit: "Sec",
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setWorkout(tempDays);
											setWorkoutOpen(true);
											notification.success({
												message:
													workoutCounter > 1
														? `You have added ${workoutCounter} days to the workout`
														: `You have added ${workoutCounter} day to the workout`,
												description: ``, //`${values.name}  has been successfully updated`,
												placement: "topRight",
												duration: 3,
												onClose: function () {
													setWorkoutCounter(0);
												},
											});
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div
							onClick={() => setWorkoutOpen(!workoutOpen)}
							style={{ cursor: "pointer", fontWeight: "bold" }}
						>
							{workoutOpen ? (
								<SlArrowUp color="#F94F00" size={30} />
							) : (
								<SlArrowDown color="#F94F00" size={30} fontWeight={"bold"} />
							)}
						</div>
					</div>
					<div className="barVertical" />
					{workoutOpen && (
						<>
							<div>
								{workout.length > 0 &&
									workout.map((item, index) => (
										<ExerciseItem
											listOfCategories={listOfCategories}
											item={item}
											index={index}
											deleteMe={deleteMeFromWorkout}
											setToAll={setToAllWorkout}
											setterFunc={setWorkout}
											activeParentItem={workout}
										/>
									))}
							</div>
							<span
								className="additionForNewWarmup"
								onClick={() => {
									let tempDays = [...workout];
									for (let i = 0; i < 1; i++) {
										tempDays.push({
											id: workout.length + i,
											name: "",
											reps: 0,
											sets: 0,
											weightunit: "lbs",
											timeUnit: "Sec",
											restUnit: "Sec",
											weight: 0,
											time: 0,
											rest: 0,
										});
									}
									setWorkout(tempDays);
								}}
							>
								<IoMdAdd
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
								<div className="daysAdditionBtnDiv" style={{ width: 150 }}>
									<input
										type={"text"}
										// defaultValue={daysNumber}
										className="inputfont nmbrBtn"
										placeholder="0"
										// defaultValue={daysNumber}
										// onChange={setWorkoutCounter}
										style={{ width: 50 }}
										value={cooldownCounter}
										onChange={(e) => {
											if (parseInt(e.target.value) > -1)
												setCoolDownCounter(parseInt(e.target.value));
											// console.log("worokout counter value", e.target.value);
										}}
										// className=""
									/>
									<div className="colCenter">
										<IoIosArrowUp
											onClick={() => {
												setCoolDownCounter((prev) => prev + 1);
											}}
											style={{ cursor: "pointer" }}
										/>
										<IoIosArrowDown
											onClick={() => {
												if (cooldownCounter !== 0)
													setCoolDownCounter((prev) => prev - 1);
											}}
											style={{ cursor: "pointer" }}
										/>
									</div>
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
													weightunit: "lbs",
													timeUnit: "Sec",
													restUnit: "Sec",
													weight: 0,
													time: 0,
													rest: 0,
												});
												// console.log("loop executing");
											}
											setCoolDownOpen(true);
											setCoolDown(tempDays);
											notification.success({
												message:
													cooldownCounter > 1
														? `You have added ${cooldownCounter} days to the cooldown`
														: `You have added ${cooldownCounter} day to the cooldown`,
												description: ``, //`${values.name}  has been successfully updated`,
												placement: "topRight",
												duration: 3,
												onClose: function () {
													setCoolDownCounter(0);
												},
											});
										}}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div
							onClick={() => setCoolDownOpen(!cooldownOpen)}
							style={{ cursor: "pointer", fontWeight: "bold" }}
						>
							{cooldownOpen ? (
								<SlArrowUp color="#F94F00" size={30} />
							) : (
								<SlArrowDown color="#F94F00" size={30} fontWeight={"bold"} />
							)}
						</div>
					</div>
					<div className="barVertical" />
					{cooldownOpen && (
						<>
							<div>
								{cooldown.length > 0 &&
									cooldown.map((item, index) => (
										<ExerciseItem
											listOfCategories={listOfCategories}
											item={item}
											index={index}
											deleteMe={deleteMeFromCoolDown}
											setToAll={setToAllCoolDown}
											setterFunc={setCoolDown}
											activeParentItem={cooldown}
										/>
									))}
							</div>
							<span
								className="additionForNewWarmup"
								onClick={() => {
									let tempDays = [...cooldown];
									for (let i = 0; i < 1; i++) {
										tempDays.push({
											id: cooldown.length + i,
											name: "",
											reps: 0,
											sets: 0,
											weightunit: "lbs",
											timeUnit: "Sec",
											restUnit: "Sec",
											weight: 0,
											time: 0,
											rest: 0,
										});
										// console.log("loop executing");
									}
									setCoolDown(tempDays);
								}}
							>
								<IoMdAdd
									color={"#F94F00"}
									size={30}
									style={{ color: "#f9f4f00" }}
								/>
							</span>
						</>
					)}
				</div>
				<div>
					<span className="addBlogInputLabel">NOTES</span>
					<div style={{ marginTop: 10 }}>
						<TextArea
							rows={4}
							placeholder="Enter notes..."
							maxLength={500}
							showCount
							className="addBlogInput overViewDescription"
							name="overviewDescription"
							onChange={(e) => setNotes(e.target.value)}
							// onBlur={handleBlur}
							value={notes}
							style={{
								width: "100%",
								display: "flex",
								height: 400,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
const ExerciseItem = ({
	listOfCategories,
	item,
	index,
	deleteMe,
	setToAll,
	setterFunc,
	activeParentItem,
}) => {
	const [activeIndex, setActiveIndex] = React.useState(-1);

	return (
		<div style={{ marginBottom: 0 }}>
			<div className="rowing">
				<div className="rowing">
					<span className="exerciseLabel">Exercise # {index + 1}</span>
					<span className="deleteWarmup" onClick={() => deleteMe(index)}>
						<AiFillDelete color="#D30E0E" size={22} />
					</span>

					{index === 0 && (
						<span
							className="seeAll"
							onClick={() => setToAll(index)}
							onMouseEnter={() => {
								setActiveIndex(0);
							}}
							onMouseLeave={() => {
								setActiveIndex(-1);
							}}
						>
							set to all
						</span>
					)}
				</div>
				<div />
			</div>
			<div className="rowStart marginVertical50">
				<div className="flexStart">
					<span className="customInputStyling">Exercise Name</span>
					<div style={{ marginTop: 10 }}>
						<Select
							defaultInputValue={activeParentItem[index].name}
							defaultValue={activeParentItem[index].name}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].name = e.value;
								setterFunc(prevValues);
							}}
							styles={{
								control: (baseStyles, state) => ({
									...baseStyles,
									// padding: "18px 24px",
									width: 314,
									height: 58,
									background: "#F4F4F4",
									borderRadius: 8,
									fontFamily: "Montserrat",
									fontStyle: "normal",
									fontWeight: "500",
									fontSize: 18,
									paddingLeft: 24,
									// lineHeight: 22,
								}),
							}}
							options={listOfCategories.map((itm) => {
								return {
									value: itm,
									label: itm,
								};
							})}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Reps</span>
					<div
						className="daysAdditionBtnDiv centerMe"
						style={{
							width: 115,
							marginTop: 10,
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							className="inputfont nmbrBtn"
							defaultValue={activeParentItem[index].reps}
							style={{ width: 90, paddingLeft: 0 }}
							placeholder={"3 - 5"}
							value={activeParentItem[index].reps}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].reps = e.target.value;
								setterFunc(prevValues);
							}}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Sets</span>
					<div
						className="daysAdditionBtnDiv centerMe"
						style={{
							width: 115,
							marginTop: 10,
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							className="inputfont nmbrBtn"
							defaultValue={activeParentItem[index].sets}
							style={{ width: 90, paddingLeft: 0 }}
							placeholder={"3 - 5"}
							value={activeParentItem[index].sets}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].sets = e.target.value;
								setterFunc(prevValues);
							}}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Weight</span>
					<div
						className="daysAdditionBtnDiv rowing"
						style={{
							width: 120,
							marginTop: 10,
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							className="inputfont nmbrBtn"
							defaultValue={activeParentItem[index].weight}
							style={{ width: 55, paddingLeft: 0 }}
							placeholder={"3 - 5"}
							value={activeParentItem[index].weight}
							onChange={(e) => {
								let prevValues = [...activeParentItem];
								prevValues[index].weight = e.target.value;
								setterFunc(prevValues);
							}}
						/>
						<WeightSelection
							activeParentItem={activeParentItem}
							index={index}
							setterFunc={setterFunc}
						/>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Time</span>
					<div style={{ marginTop: 0 }} className="colCenteral">
						<div
							className="daysAdditionBtnDiv rowing"
							style={{
								width: 120,
								marginTop: 10,
								backgroundColor:
									activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
							}}
						>
							<input
								type={"text"}
								className="inputfont nmbrBtn"
								defaultValue={activeParentItem[index].time}
								style={{ width: 55, paddingLeft: 0 }}
								placeholder={"0"}
								value={activeParentItem[index].time}
								onChange={(e) => {
									let newVal = activeParentItem[index].time;
									if (parseInt(e.target.value) > -1) newVal = e.target.value;
									if (!e.target.value) newVal = 0;
									let prevValues = [...activeParentItem];
									prevValues[index].time = newVal;
									setterFunc(prevValues);
								}}
							/>
							<TimeSelection
								activeParentItem={activeParentItem}
								index={index}
								setterFunc={setterFunc}
							/>
						</div>
					</div>
				</div>
				<div className="flexStart">
					<span className="customInputStyling">Rest</span>
					<div
						className="daysAdditionBtnDiv rowing"
						style={{
							width: 120,
							marginTop: 10,
							backgroundColor:
								activeIndex === 0 ? "rgba(249, 79, 0, 0.2" : "#f4f4f4",
						}}
					>
						<input
							type={"text"}
							// defaultValue={daysNumber}
							className="inputfont nmbrBtn"
							placeholder={0}
							defaultValue={activeParentItem[index].rest}
							// value={item.rest}
							style={{ width: 55, paddingLeft: 0 }}
							// placeholder={"0"}
							value={activeParentItem[index].rest}
							onChange={(e) => {
								let newVal = activeParentItem[index].rest;
								if (parseInt(e.target.value) > -1) newVal = e.target.value;
								if (!e.target.value) newVal = 0;
								let prevValues = [...activeParentItem];
								prevValues[index].rest = newVal;
								setterFunc(prevValues);
							}}
						/>
						<TimeSelection
							activeParentItem={activeParentItem}
							index={index}
							setterFunc={setterFunc}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
// const AddModal = (props) => {
// 	const [listOfExercise, setListOfExercise] = React.useState([]);
// 	const [searchQuery, setSearchQuery] = React.useState("");
// 	const [listOfCategories, setListOfCategories] = React.useState([]);
// 	React.useEffect(() => {
// 		fetchExercises();
// 	}, []);
// 	const fetchExercises = async () => {
// 		const listOfExes = await getAllExercises();
// 		let categoryList = [];
// 		let listOfExercisez = [];
// 		let prevCatogries = [];

// 		listOfExes.forEach((item) => {
// 			if (categoryList.findIndex((lIndex) => lIndex === item.category) < 0) {
// 				categoryList.push(item.category);
// 			}
// 		});
// 		categoryList.forEach((itemOne) => {
// 			listOfExes.forEach((itemTwo) => {
// 				if (itemOne === itemTwo.category) {
// 					listOfExercisez.push(itemTwo.name);
// 				}
// 			});
// 			prevCatogries.push({
// 				categoryName: itemOne,
// 				listOfExercises: listOfExercisez,
// 			});
// 			listOfExercisez = [];
// 		});
// 		setListOfCategories(prevCatogries);
// 	};
// 	const deleteMe = (index) => {
// 		let newList = [...listOfExercise];
// 		newList = listOfExercise.filter((itm, ind) => ind !== index);
// 		setListOfExercise(newList);
// 	};

// 	const checkForListOfExercise = (item) => {
// 		let newList = [...listOfExercise];
// 		// let checkIndex=
// 		if (newList.findIndex((innrItem) => innrItem === item) < 0) {
// 			newList.push(item);
// 		} else {
// 			newList = newList.filter((innrItem) => innrItem !== item);
// 		}
// 		setListOfExercise(newList);
// 	};

// 	return (
// 		<Modal
// 			open={props.visible}
// 			// className="addProgramsModal"
// 			style={{
// 				position: "absolute",
// 				right: 0,
// 				top: 0,
// 				// padding: 40,
// 				borderRadius: 0,
// 			}}
// 			closable={false}
// 			footer={null}
// 			title={null}
// 		>
// 			<div //className="addProgramsModal"
// 				style={{ padding: 40, minHeight: "100vh", height: "100%" }}
// 			>
// 				<div className="flexEnd" style={{ paddingBottom: 32 }}>
// 					<span
// 						className="modlCloseBtn"
// 						onClick={() => props.setVisible(false)}
// 					>
// 						<RxCross2 size={30} style={{ alignSelf: "center" }} />
// 					</span>
// 				</div>
// 				<span className="addMdlHeading">Select Exercises for Warm up</span>
// 				<div className="modlBody">
// 					<div style={{ width: 247 }}>
// 						{listOfExercise.map((item, index) => {
// 							return (
// 								<div className="tagCustom" key={index}>
// 									<span>{item}</span>
// 									<RxCross1 size={14} onClick={() => deleteMe(index)} />
// 								</div>
// 							);
// 						})}
// 					</div>
// 					<div className="inputSearchCustom">
// 						<input
// 							className="inputField"
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 							placeholder="Search"
// 						/>
// 						<BiSearch color="#D6D6D6" size={25} />
// 					</div>
// 					{listOfCategories.map((itm, ind) => (
// 						<CustomCollapsible
// 							item={itm}
// 							key={ind}
// 							checkForListOfExercise={checkForListOfExercise}
// 							listOfExercise={listOfExercise}
// 						/>
// 					))}
// 					<input
// 						className="customAddBtn"
// 						value="Add"
// 						onClick={() => {
// 							if (listOfExercise.length !== 0) {
// 								props.addFollowing(listOfExercise);
// 							} else {
// 								alert("Please select one exercise atleast");
// 							}
// 						}}
// 					/>
// 				</div>
// 			</div>
// 		</Modal>
// 	);
// };

// const CustomCollapsible = (props) => {
// 	const [open, setOpen] = React.useState(false);
// 	return (
// 		<div>
// 			<span className="checkBoxHeading" onClick={() => setOpen(!open)}>
// 				{open ? (
// 					<SlArrowUp color="#F94F00" style={{ marginRight: 10 }} />
// 				) : (
// 					<SlArrowDown color="#F94F00" style={{ marginRight: 10 }} />
// 				)}
// 				{props.item.categoryName}
// 			</span>
// 			{open && (
// 				<div>
// 					{props.item.listOfExercises.map((innerItem, innerIndex) => {
// 						return (
// 							<span
// 								className="checkboxItem rowing"
// 								key={innerIndex}
// 								onClick={() => {
// 									props.checkForListOfExercise(innerItem);
// 								}}
// 							>
// 								{innerItem}
// 								{props.listOfExercise.findIndex((itm) => itm === innerItem) <
// 								0 ? (
// 									<div className="emptyCheckBox" />
// 								) : (
// 									<div className="checkBoxContainer">
// 										<BsCheckLg size={14} color="#fff" />
// 									</div>
// 								)}
// 							</span>
// 						);
// 					})}
// 				</div>
// 			)}
// 		</div>
// 	);
// };
