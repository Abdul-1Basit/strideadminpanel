import React from "react";
import { notification } from "antd";
import ProductCategorySearch from "./Search";

import ProductCategoryListing from "./Listing";
import EditCampaign from "./Edit";
import { getAllExercises } from "../../Helpers/firebase";

const ReqConsultationContainer = (props) => {
	const [activeCategory, setActiveCategory] = React.useState();

	const [editModal, setEditModal] = React.useState(false);
	const [filterItem, setFilterItem] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const [campaignListing, setCampaignListing] = React.useState([
		{
			id: "AX-125",
			name: "Bernard Walsh",
			email: "Carmine5@yahoo.com",
			subject: "Mountain program",
			description:
				"Assumenda enim dolor et ratione. Sit voluptatem accusantium num Assumenda enim dolor et ratione. Sit voluptatem accusantium num",
			reply: "",
		},
	]);

	React.useEffect(() => {
		// getWorkouts();
	}, []);
	const getWorkouts = async () => {
		setLoading(true);
		let result = await getAllExercises();
		setCampaignListing(result);
		console.log("result", result);
		setLoading(false);
	};
	const editThisProgram = (id) => {
		let activeItm = campaignListing.find((itm) => itm.id === id);
		setActiveCategory(activeItm);
		setEditModal(true);
	};
	return (
		<div
			style={{
				height: "100%",
				paddingTop: 52,
				paddingLeft: 40,
				paddingRight: 40,
			}}
		>
			{editModal && (
				<EditCampaign
					{...{
						setEditModal,
						activeCategory,
						setActiveCategory,
					}}
				/>
			)}

			{!editModal && (
				<div>
					<div
						style={{
							width: "100%",
							background: "#FFFFFF",
							boxShadow: " 0px 0px 16px rgba(0, 0, 0, 0.16)",
							borderRadius: 20,
							paddingTop: 20,
						}}
					>
						<ProductCategorySearch
							{...{
								filterItem,
								setFilterItem,
							}}
						/>

						<ProductCategoryListing
							{...{
								setActiveCategory,
								loading,
								campaignListing,
								editThisProgram,
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReqConsultationContainer;
