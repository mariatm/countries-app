import {  useSelector } from "react-redux";
import { useParams } from "react-router";

import { countriesByRegion } from "../../countriesSlice";

const RegionView = () => {
	const { region } = useParams();
	const countries = useSelector(countriesByRegion)[region];
	
	return (
		<>
			<h1>View</h1>

			{countries.map(({ name }) => {
				return (
				<div key={name.common}>
					<h2>{name.common}</h2>
				</div>
			)})}
		</>
	);
};

export default RegionView;