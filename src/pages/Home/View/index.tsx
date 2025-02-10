import { Button } from "@mui/material";
import { countries } from "../../../countriesSlice";
import { useSelector } from "react-redux";

const View = () => {
	//declare variable of type array typescript
	const allCountries: any[] = useSelector(countries);
	//console.log(allCountries);

	return (
		<div>
			<h1>View</h1>

			<Button variant="contained" color="primary">
				Button
			</Button>

		</div>
	);
};

export default View;