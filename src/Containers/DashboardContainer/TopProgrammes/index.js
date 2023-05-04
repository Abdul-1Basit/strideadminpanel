import "./index.css";
export default function TopProgrammes(props) {
	return (
		<div className="topProgramCard">
			<span className="topProgramHeading">Top 5 Programs</span>
			<div className="rowing marg16">
				<span className="smallTopProgramHeading">Names</span>
				<span className="smallTopProgramHeading">Participants</span>
			</div>
			{props.list &&
				props.list.map((item, index) => (
					<div className="rowing mb12" key={index}>
						<span className="topProgramText">{item.name}</span>
						<span className="topProgramText">{item.participants}</span>
					</div>
				))}
		</div>
	);
}
