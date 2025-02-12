import { useSelector } from "react-redux";

import { Typography, useMediaQuery, useTheme } from "@mui/material";

import { countriesByRegion } from "../../countriesSlice";
import VerticalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChart from "../../components/VerticalBarChart";

import FilterToolbar from "../../components/FilterToolbar";
import PageContent from "../../layout/PageContent";

const GlobalView = () => {
	const theme = useTheme();
  const isSM = !useMediaQuery(theme.breakpoints.up('sm'));

	const countries: { [key: string]: { population: number }[] } = useSelector(countriesByRegion);

	const getPopulationByRegion = () => {
		const populationByRegion : number[] = [];
		
		Object.keys(countries).forEach(region => {
			const population = countries[region].reduce((acc, country) => acc + country.population, 0);

			populationByRegion.push(population);
		})
		return populationByRegion;
	}

	const countriesPopulation = getPopulationByRegion();
	const countriesNames = Object.keys(countries);
	
	return (
		<>
			<FilterToolbar />

			<PageContent>
				<Typography variant='h2' gutterBottom>World's population</Typography>

				{isSM ? (
					<VerticalBarChart population={countriesPopulation} names={countriesNames} />
				) : (
					<HorizontalBarChart population={countriesPopulation} names={countriesNames} />
				)}
			</PageContent>
		</>
	);
};

export default GlobalView;