import { useEffect, useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

import VerticalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChart from "../../components/VerticalBarChart";
import FilterToolbar from "../../components/FilterToolbar";
import PageContent from "../../layout/PageContent";
import { Country } from "../../utils/interfaces";
import { getMaxPopulation } from "../../utils";

const RegionPage = ({ region, countries }: { region: string, countries: Country[] }) => {
	const theme = useTheme();
  const isSM = !useMediaQuery(theme.breakpoints.up('sm'));

	const [minPopulation, setMinPopulation] = useState(0);
	const [maxPopulation, setMaxPopulation] = useState(getMaxPopulation(countries[0].population));
	const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

	useEffect(() => {
		setFilteredCountries(filterCountries());
	}, [minPopulation, maxPopulation, countries]);
	
	useEffect(() => {
		if(countries.length>0){
			setMaxPopulation(getMaxPopulation(countries[0].population))
			setMinPopulation(0);
		}
	}, [countries]);
console.log()
	const filterCountries = () => {
		const auxCountries: Country[] = [];
		
		countries
			.map((country: Country) => {
				if (country.population >= minPopulation && country.population <= maxPopulation){
					auxCountries.push(country);
			}});
		
		return auxCountries;
	}
	
	return (
		<>
			<FilterToolbar 
				minPopulation={minPopulation}
				setMinPopulation={setMinPopulation}
				maxPopulation={maxPopulation}
				setMaxPopulation={setMaxPopulation}
				population={getMaxPopulation(countries[0].population)}
				step={countries[0].population/10}
			/>

			<PageContent>
				<Typography variant='h2' gutterBottom>{region}'s population</Typography>

				{isSM || filteredCountries.length >= 10 ? (
					<VerticalBarChart 
						population={filteredCountries.map(a => a.population)} 
						names={filteredCountries.map(a => a.name.common)} 
					/>
				) : (
					<HorizontalBarChart 
						population={filteredCountries.map(a => a.population)} 
						names={filteredCountries.map(a => a.name.common)} 
					/>
				)}
			</PageContent>
		</>
	);
};

export default RegionPage;