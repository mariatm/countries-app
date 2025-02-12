import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Typography, useMediaQuery, useTheme } from "@mui/material";

import { countriesByRegion } from "../../countriesSlice";
import VerticalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChart from "../../components/VerticalBarChart";
import FilterToolbar from "../../components/FilterToolbar";

import PageContent from "../../layout/PageContent";
import { Regions, RegionsSum } from "../../utils/interfaces";
import { getMaxPopulation } from "../../utils";

function getPopulationByRegion(regions: Regions) {
	const populationByRegion : RegionsSum = {};
	
	Object.keys(regions).forEach((region: string) => {
		const population = Object.values(regions[region]).reduce((acc, country) => acc + country.population, 0);

		populationByRegion[region] = population;
	})
	
	return populationByRegion;
}

const getRegionNames = (regionsList : RegionsSum) => Object.keys(regionsList);

const getRegionPopulation = (regionsList : RegionsSum) => Object.values(regionsList);

const GlobalView = () => {
	const theme = useTheme();
  const isSM = !useMediaQuery(theme.breakpoints.up('sm'));

	const regions: Regions = useSelector(countriesByRegion);
		
	const [filteredRegions, setFilteredRegions] = useState(getPopulationByRegion(regions));

	const [minPopulation, setMinPopulation] = useState(getRegionPopulation(filteredRegions)[getRegionPopulation(filteredRegions).length-1]);
	const [maxPopulation, setMaxPopulation] = useState(5000000000);

	useEffect(() => {
		setFilteredRegions(filterRegions());
	}, [minPopulation, maxPopulation]);

	const filterRegions = () => {
		const regionsPopulation = getPopulationByRegion(regions);
		const auxRegions: RegionsSum = {};
		
		Object.keys(regionsPopulation)
			.map((country) => {
				if (regionsPopulation[country] >= minPopulation && regionsPopulation[country] <= maxPopulation){
					auxRegions[country] = regionsPopulation[country];
			}});
			
		return auxRegions;
	}

	const mostPopulationInRegion = Math.max(...getRegionPopulation(getPopulationByRegion(regions)))

	return (
		<>
			<FilterToolbar 
				minPopulation={minPopulation}
				setMinPopulation={setMinPopulation}
				maxPopulation={maxPopulation}
				setMaxPopulation={setMaxPopulation}
				population={getMaxPopulation(mostPopulationInRegion)}
				step={mostPopulationInRegion/10}
			/>

			<PageContent>
				<Typography variant='h2' gutterBottom>World's population</Typography>

				{isSM ? (
					<VerticalBarChart population={getRegionPopulation(filteredRegions)} names={getRegionNames(filteredRegions)} />
				) : (
					<HorizontalBarChart population={getRegionPopulation(filteredRegions)} names={getRegionNames(filteredRegions)} />
				)}
			</PageContent>
		</>
	);
};

export default GlobalView;