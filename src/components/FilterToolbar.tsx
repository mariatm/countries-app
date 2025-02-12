import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { grey } from '@mui/material/colors';

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Popover, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router";
import { Filter, FilterAlt, FilterList } from "@mui/icons-material";


const PageWrapper = ({minPopulation, maxPopulation}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

	return (
				<div style={{ display: 'flex', backgroundColor: grey["A200"], width: '100%', justifyContent: 'right', padding: "0.5rem" }}>
					<IconButton aria-label="filter" onClick={handleClick} >
						<FilterList  color={grey["A700"]}/> <Typography variant="button" color={grey["A700"]}>Filter</Typography>
					</IconButton>
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
						<Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
					</Popover>
				</div>
	);
};

export default PageWrapper;