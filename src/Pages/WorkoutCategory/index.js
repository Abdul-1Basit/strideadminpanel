import React from "react";
import SideNavWrapper from "../../Containers/SideNavWrapper";
import WorkoutCategoryContainer from "../../Containers/WorkoutCategoryContainer";
const WorkoutCategory = (props) => {
	return (
		<SideNavWrapper>
			<WorkoutCategoryContainer />
		</SideNavWrapper>
	);
};
export default WorkoutCategory;
