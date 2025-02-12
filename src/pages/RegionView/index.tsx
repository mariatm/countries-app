import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

import { countriesByRegion } from "../../countriesSlice";

import VerticalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChart from "../../components/VerticalBarChart";
import FilterToolbar from "../../components/FilterToolbar";
import PageContent from "../../layout/PageContent";

const RegionView = () => {
	const navigate = useNavigate();
	const theme = useTheme();
  const isSM = !useMediaQuery(theme.breakpoints.up('sm'));

	const { region } = useParams();
	const countries = useSelector(countriesByRegion);

	useEffect(() => {
		if(!Object.keys(countries).includes(region)) {
			navigate('/404')
		}
	}), [];


	const countriesPopulation = countries[region]?.map(a => a.population);
	const countriesNames = countries[region]?.map(a => a.name.common);
	
	return (
		<>
			<FilterToolbar />

			<PageContent>
				<Typography variant='h2' gutterBottom>{region}'s population</Typography>

				{isSM || countries[region]?.length >= 10 ? (
					<VerticalBarChart population={countriesPopulation} names={countriesNames} />
				) : (
					<HorizontalBarChart population={countriesPopulation} names={countriesNames} />
				)}
			</PageContent>
		</>
	);
};

export default RegionView;