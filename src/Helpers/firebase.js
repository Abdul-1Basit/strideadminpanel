import moment from "moment";
import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

import {
	getStorage,
	uploadBytesResumable,
	getDownloadURL,
	ref,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
	apiKey: "AIzaSyAJXsLap4tS4O3Z2vSk1cektmNEeu3O9d0",
	authDomain: "stride-gym.firebaseapp.com",
	projectId: "stride-gym",
	storageBucket: "stride-gym.appspot.com",
	messagingSenderId: "124741781230",
	appId: "1:124741781230:web:8e0f6a25aa87e2e44ed5ff",
	measurementId: "G-TMLYWTFMQH",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;
		const q = query(collection(db, "users"), where("uid", "==", user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logInWithEmailAndPassword = async (email, password) => {
	let user = null;
	try {
		const resp = await signInWithEmailAndPassword(auth, email, password);
		// console.log("response is", resp);
		user = resp.user;
		return user;
	} catch (err) {
		console.error(err);
		// alert(err.message);
		return user;
	}
};
const registerWithEmailAndPassword = async (
	name,
	email,
	password,
	type = "admin"
) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			type,
		});
		return res.user;
	} catch (err) {
		console.error(err);
		//alert(err.message);
	}
};

//-----------Productss-----------------------
const addProduct = async (productDetails) => {
	let {
		description,
		images,
		isActive = true,
		productName,
		noOfItems,
		unitPrice,
	} = productDetails;
	let ratings = 0,
		reviews = 0;
	try {
		await addDoc(collection(db, "products"), {
			description,
			images,
			isActive,
			ratings,
			productName,
			noOfItems,
			unitPrice,
			reviews,
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};
const getAllProducts = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, "products"));
		let newData = [];
		querySnapshot.forEach((doc) => {
			let temp = doc.data();
			temp.id = doc.id;
			console.log("temp", temp);
			newData.push(temp);
		});
		return newData;
	} catch (err) {
		console.log("err", err);
	}
};
const updateProduct = async (product) => {
	let {
		description,
		images,
		isActive = true,
		ratings,
		productName,
		noOfItems,
		unitPrice,
		reviews,
	} = product;

	try {
		const prodRef = await doc(db, "products", product.id);
		await updateDoc(prodRef, {
			description,
			images,
			isActive,
			ratings,
			productName,
			noOfItems,
			unitPrice,
			reviews,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};
const deleteProduct = async (product) => {
	try {
		await deleteDoc(doc(db, "products", product.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------

//-----------Prize-----------------------
const addPrize = async (prize, imageUrls) => {
	let { name, description, image } = prize;

	try {
		await addDoc(collection(db, "prizes"), {
			name,
			description,
			image,
		});
		return true;
	} catch (err) {
		console.error(err);
		//alert(err.message);
		return false;
	}
};
const getAllPrizes = async () => {
	const querySnapshot = await getDocs(collection(db, "prizes"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		// console.log(doc.id, " => ", doc.data());
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updatePrize = async (prize) => {
	let { name, description, image } = prize;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "prizes", prize.id);
		await updateDoc(prodRef, {
			name: name,
			description: description,
			image,
			//measurements,
			//images,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};
const deletePrize = async (id) => {
	try {
		await deleteDoc(doc(db, "prizes", id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------

//----------------------------------------------------

//-----------Workouts-----------------------
const addWorkout = async (Workout) => {
	let { name, subtitle, basicDetailMedia, exercises, description } = Workout;
	try {
		await addDoc(collection(db, "workouts"), {
			name,
			subtitle,
			basicDetailMedia,
			exercises,
			description,
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};
const getAllWorkouts = async () => {
	const querySnapshot = await getDocs(collection(db, "workouts"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateWorkout = async (workout) => {
	let { name, subtitle, basicDetailMedia, exercises, description } = workout;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "workouts", workout.id);
		await updateDoc(prodRef, {
			name,
			subtitle,
			basicDetailMedia,
			exercises,
			description,
		});
		// console.log("campign", campaign);
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};
const deleteWorkout = async (workout) => {
	try {
		await deleteDoc(doc(db, "workouts", workout.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------
//-----------Exercises-----------------------
const addExercise = async (Exercise) => {
	let { name, category, status, instructions, targetArea, img, audio, video } =
		Exercise;
	console.log("values", Exercise);
	try {
		await addDoc(collection(db, "exercises"), {
			name,
			category,
			status,
			instructions,
			targetArea,
			img,
			audio,
			video,
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};
const getAllExercises = async () => {
	const querySnapshot = await getDocs(collection(db, "exercises"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateExercise = async (workout) => {
	let { name, category, status, instructions, targetArea, img, audio, video } =
		workout;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "exercises", workout.id);
		await updateDoc(prodRef, {
			name,
			category,
			status,
			instructions,
			targetArea,
			img,
			audio,
			video,
		});
		// console.log("campign", campaign);
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

const deleteExercise = async (workout) => {
	try {
		await deleteDoc(doc(db, "exercises", workout.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------

//-----------Users-----------------------
const addUser = async (user) => {
	let {
		dob,
		emailAddress,
		firstName,
		lastName,
		gender,
		password,
		phoneNumber,
		address,
		image,
		role = "user",
		joinedOn = moment(new Date()).format("MM-DD-YYYY"),
	} = user;
	//console.log("capmpig", campaign);
	try {
		await addDoc(collection(db, "strideuser"), {
			dob,
			emailAddress,
			firstName,
			lastName,
			gender,
			password,
			phoneNumber,
			address,
			image,
			role,
			joinedOn,
		});
		return true;
	} catch (err) {
		console.error(err);
		//alert(err.message);
		return false;
	}
};
const getAllUsers = async () => {
	const querySnapshot = await getDocs(collection(db, "strideuser"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateUser = async (user) => {
	let {
		dob,
		emailAddress,
		firstName,
		lastName,
		gender,
		password,
		phoneNumber,
		address,
		image,
		role = "user",
		joinedOn,
	} = user;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "strideuser", user.id);
		await updateDoc(prodRef, {
			dob,
			emailAddress,
			firstName,
			lastName,
			gender,
			password,
			phoneNumber,
			address,
			image,
			role,
			joinedOn,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

const deleteUser = async (user) => {
	try {
		await deleteDoc(doc(db, "strideuser", user.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------

//-----------Employeeee Management-----------------------
const addEmployee = async (employee) => {
	const res = await createUserWithEmailAndPassword(
		auth,
		employee.email,
		employee.password
	);
	//const user = res.user;

	let { fullName, image, email, password, address, role, phonenumber } =
		employee;

	//console.log("capmpig", campaign);
	try {
		await addDoc(collection(db, "strideEmployee"), {
			id: res.user.uid.toString(),
			image,
			fullName,
			email,
			password,
			address,
			role,
			phonenumber,
			type: "user",
		});
		return true;
	} catch (err) {
		console.error(err);
		//alert(err.message);
		return false;
	}
};
const getAllEmployees = async () => {
	const querySnapshot = await getDocs(collection(db, "strideEmployee"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateEmployee = async (employee) => {
	let { image, fullName, email, password, address, role, phonenumber } =
		employee;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "strideEmployee", employee.id);
		await updateDoc(prodRef, {
			image,
			fullName,
			email,
			password,
			address,
			role,
			phonenumber,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

const deleteEmployee = async (employee) => {
	try {
		await deleteDoc(doc(db, "strideEmployee", employee.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------
//-----------Order Management-----------------------
const addOrder = async (Order, productListNew) => {
	// delivery Stats ,Address, City, State, Zip Code, Order Created, Order Time, Subtotal, Delivery Fee, Grand Total,
	// itemIds[],
	// customerName,phoneNumber,type,

	const {
		deliveryStatus,
		address,
		city,
		state,
		zipCode,
		orderCreated,
		orderTime,
		subtotal,
		deliveryFee,
		grandTotal,
		itemIds = [],
		customerName,
		phoneNumber,
		type,
	} = Order;
	//console.log("capmpig", campaign);
	try {
		await addDoc(collection(db, "orders"), {
			deliveryStatus,
			address,
			city,
			state,
			zipCode,
			orderCreated,
			orderTime,
			subtotal,
			deliveryFee,
			grandTotal,
			itemIds,
			customerName,
			phoneNumber,
			type,
		});
		// for (let i = 0; i < productList; i++) {
		// 	let updatProd = productListNew.find((item) => item.id === productList[i]);
		// 	updatProd.sold += 1;
		// 	updatProd.totalItems -= 1;

		// 	await updateProduct(updatProd);
		// }
		// let prod = { ...product };
		// prod.sold = parseInt(prod.sold) + 1;
		// //let camp = { ...campaign };
		// campaign.totalItems = parseInt(campaign.totalItems) - 1;
		// // console.log("product is", prod);
		// // console.log("campaign is", camp);

		// let resp2 = null; // await updateCampaign(campaign);
		// let resp1 = null; //await updateProduct(prod);

		// return resp1 && resp2;
	} catch (err) {
		console.log("error", err);
		//alert(err.message);
		return false;
	}
};
const getAllOrders = async () => {
	const querySnapshot = await getDocs(collection(db, "orders"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateOrder = async (Order) => {
	const {
		userId,
		noOfItems,
		listofProductIds,
		orderDateTime,
		orderStatus,
		deliveryDateTime,
		cartTotal,
		discount,
		totalBill,
		assignedTo,
	} = Order;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "orders", Order.id);
		await updateDoc(prodRef, {
			userId,
			noOfItems,
			listofProductIds,
			orderDateTime,
			orderStatus,
			deliveryDateTime,
			cartTotal,
			discount,
			totalBill,
			assignedTo,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

const deleteOrder = async (Order) => {
	try {
		await deleteDoc(doc(db, "orders", Order.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------
//-----------Blog Management-----------------------
const addBlog = async (Order, productListNew) => {
	const {
		name,
		description,
		image,
		status = "Active",
		dateCreated = new Date(),
	} = Order;
	//console.log("capmpig", campaign);
	try {
		await addDoc(collection(db, "blogs"), {
			name,
			description,
			image,
			status,
			dateCreated,
		});
		return true;
	} catch (err) {
		console.log("error", err);
		return false;
	}
};
const getAllBlogs = async () => {
	const querySnapshot = await getDocs(collection(db, "blogs"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateBlog = async (blog) => {
	const { name, description, image, status, dateCreated } = blog;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "blogs", blog.id);
		await updateDoc(prodRef, {
			name,
			description,
			image,
			status,
			dateCreated,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

const deleteBlog = async (blog) => {
	try {
		await deleteDoc(doc(db, "blogs", blog.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------
//-----------Programs Management-----------------------
const addProgram = async (Program) => {
	const {
		name,
		subTitle,
		status,
		difficultyLevel,
		scheduleDescription,
		overviewDescription,
		days,
		overviewMediaOne,
		overviewMediaTwo,
		scheduleImage,
		basicDetailMedia,
	} = Program;
	//console.log("capmpig", campaign);
	try {
		await addDoc(collection(db, "programs"), {
			name,
			subTitle,
			status,
			difficultyLevel,
			scheduleDescription,
			overviewDescription,
			days,
			overviewMediaOne,
			overviewMediaTwo,
			scheduleImage,
			basicDetailMedia,
		});
		return true;
	} catch (err) {
		console.log("error", err);
		return false;
	}
};
const getAllPrograms = async () => {
	const querySnapshot = await getDocs(collection(db, "programs"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateProgram = async (program) => {
	const {
		name,
		subTitle,
		status,
		difficultyLevel,
		scheduleDescription,
		overviewDescription,
		days,
		overviewMediaOne,
		overviewMediaTwo,
		scheduleImage,
		basicDetailMedia,
	} = program;

	try {
		//console.log("roze", prize.id);
		const prodRef = await doc(db, "programs", program.id);
		await updateDoc(prodRef, {
			name,
			subTitle,
			status,
			difficultyLevel,
			scheduleDescription,
			overviewDescription,
			days,
			overviewMediaOne,
			overviewMediaTwo,
			scheduleImage,
			basicDetailMedia,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

const deleteProgram = async (program) => {
	try {
		await deleteDoc(doc(db, "programs", program.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------
//--------------------OnboardingManagement----------
const getOnboarding = async (workout) => {
	const querySnapshot = await getDocs(collection(db, "onboarding"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};
const updateOnboarding = async (onboarding) => {
	const {
		titleOne,
		descriptionOne,
		titleTwo,
		descriptionTwo,
		mediaOne,
		mediaTwo,
	} = onboarding;

	try {
		if (!onboarding.id) {
			await addDoc(collection(db, "onboarding"), {
				titleOne,
				descriptionOne,
				titleTwo,
				descriptionTwo,
				mediaOne,
				mediaTwo,
			});
			return true;
		}

		const prodRef = await doc(db, "onboarding", onboarding.id);
		await updateDoc(prodRef, {
			titleOne,
			descriptionOne,
			titleTwo,
			descriptionTwo,
			mediaOne,
			mediaTwo,
		});
		return true;
	} catch (err) {
		console.log("err", err);

		console.log("err", err.message);
		return false;
	}
};

// --------------------------------------------------
//-----------ImageManagement-----------------------
const addImageToCarousel = async (Image) => {
	try {
		let response = await uploadImage(Image);
		await addDoc(collection(db, "carouselImages"), {
			image: response,
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};

const getAllCarouselImages = async () => {
	const querySnapshot = await getDocs(collection(db, "carouselImages"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};

const deleteCarouselImage = async (carouseImage) => {
	try {
		await deleteDoc(doc(db, "carouselImages", carouseImage.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
const addImageToBanner = async (Image) => {
	try {
		let response = await uploadImage(Image);
		await addDoc(collection(db, "bannerImages"), {
			image: response,
		});
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};

const getAllBannerImages = async () => {
	const querySnapshot = await getDocs(collection(db, "bannerImages"));
	let newData = [];
	querySnapshot.forEach((doc) => {
		let temp = doc.data();
		temp.id = doc.id;
		newData.push(temp);
	});
	return newData;
};

const deleteBannerImage = async (carouseImage) => {
	try {
		await deleteDoc(doc(db, "bannerImages", carouseImage.id));
		return true;
	} catch (err) {
		console.log("err", err);
		return false;
	}
};
//----------------------------------------------------

//------------------imageupload----------------
const uploadImage = async (image) => {
	try {
		let storageRef = ref(storage, `/files/ ${v4() + image.name}`);

		// progress can be paused and resumed. It also exposes progress updates.
		// Receives the storage reference and the file to upload.
		let result = await uploadBytesResumable(storageRef, image);

		let returnurl = await getDownloadURL(result.ref);
		console.log("return url", returnurl);
		return returnurl;
	} catch (e) {
		console.log("error", e);
		return "";
	}
};
//-------------------------------------------
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};
const logout = () => {
	signOut(auth);
};
export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	storage,
	addProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getAllPrizes,
	addPrize,
	updatePrize,
	deletePrize,
	getAllExercises,
	addExercise,
	updateExercise,
	deleteExercise,
	getAllWorkouts,
	addWorkout,
	updateWorkout,
	deleteWorkout,
	uploadImage,
	getAllUsers,
	addUser,
	updateUser,
	deleteUser,
	addImageToCarousel,
	getAllCarouselImages,
	deleteCarouselImage,
	addImageToBanner,
	getAllBannerImages,
	deleteBannerImage,
	addEmployee,
	updateEmployee,
	getAllEmployees,
	deleteEmployee,
	addOrder,
	updateOrder,
	getAllOrders,
	deleteOrder,
	addBlog,
	updateBlog,
	getAllBlogs,
	deleteBlog,
	addProgram,
	getAllPrograms,
	updateProgram,
	deleteProgram,
	getOnboarding,
	updateOnboarding,
};
