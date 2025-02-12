import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { countriesByRegion } from "../../countriesSlice";
import { Country, Regions } from "../interfaces";
import Page from "./Page";

const RegionView = () => {
	const navigate = useNavigate();

	const { region } = useParams();
	const countries: Regions = useSelector(countriesByRegion);

	const [selectedCountries, setSelectedCountries] = useState<Country[] | undefined>(undefined)

	useEffect(() => {
		if (!region || !Object.keys(countries).includes(region)) {
			navigate('/404');
		}else{
			setSelectedCountries(countries[region])
		}
	}, [region]);

	if(!selectedCountries || !region || !Object.keys(countries).includes(region)) return null;
	return (
		<Page countries={selectedCountries} region={region} />
	);
};

export default RegionView;