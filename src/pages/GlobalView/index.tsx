import { useSelector } from "react-redux";
import { countries } from "../../countriesSlice";

const GlobalView = () => {
	const countriesList : [] = useSelector(countries) ;

	return (
		<>
			<h1>Global View</h1>

			{countriesList.map(({ name }) => {
				return (
				<div key={name.common}>
					<h2>{name.common}</h2>
				</div>
			)})}
		</>
	);
};

export default GlobalView;