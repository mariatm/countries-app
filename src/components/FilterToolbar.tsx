import { useEffect, useState } from "react";
import { grey } from '@mui/material/colors';

import { useMediaQuery, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Popover from "@mui/material/Popover"
import Slider from "@mui/material/Slider"

import { FilterList } from "@mui/icons-material";

interface FilterToolbarProps {
  minPopulation: number;
  maxPopulation: number;
	population: number;
  setMinPopulation: (value: number) => void;
  setMaxPopulation: (value: number) => void;
	step: number;
}

const style: React.CSSProperties = { 
		display: 'flex', 
		backgroundColor: grey["A200"], 
		width: '100%', 
		justifyContent: 'right', 
		padding: "0.5rem 1rem", 
		boxSizing: 'border-box', 
		position: 'fixed', 
		zIndex: 1000 
}

function getMillions(value: number) {
	if(value > 1000000) return value / 1000000;
	else return value
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({ minPopulation, maxPopulation, setMinPopulation, setMaxPopulation, population }) => {
	const theme = useTheme();
  const isSM = !useMediaQuery(theme.breakpoints.up('sm'));

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [value, setValue] = useState<number[]>([minPopulation, maxPopulation]);

	useEffect(() => {
		setValue([minPopulation, maxPopulation]);
	}, [minPopulation, maxPopulation])

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

	const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
		setMinPopulation((newValue as number[])[0]);
		setMaxPopulation((newValue as number[])[1]);
  };

	function valuetext(value: number) {
		if(value > 10**6) return `${Math.ceil(getMillions(value))}M`;
		else return value;
	}

	const marks = [
		{
			value: 0,
			label: '0',
		},
		{
			value: population/2,
			label: valuetext(population/2),
		},
		{
			value: population,
			label: valuetext(population),
		},
	];

	return (
		<div style={{...style, top: isSM ? 56 : 64 }}>		
			<Button aria-label="filter" onClick={handleClick} startIcon={<FilterList />}>						
				Filter
			</Button>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Typography variant="body1" sx={{ p: 2 }}>
					Filter by Population: 
				</Typography>

				<div style={{display: "flex"}}>
					<Box sx={{ width: 200, padding: "1rem 5rem" }}>
						<Slider
							getAriaLabel={() => 'Temperature range'}
							value={value}
							onChange={handleChange}
							valueLabelDisplay="auto"
							valueLabelFormat={valuetext}
							min={0}
							max={population}
							step={population/10}
							marks={marks}
						/>
					</Box>
				</div>
			</Popover>
		</div>
	);
};

export default FilterToolbar;
