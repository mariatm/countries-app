import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import { getAllCountries, getCountriesStatus } from "../countriesSlice";
import Sidebar from "./Sidebar";
import { Link } from "react-router";


const PageWrapper = ({ children }) => {
	const dispatch = useDispatch();
	const [openSidebar, setOpenSidebar] = useState(false);
	const countriesStatus = useSelector(getCountriesStatus);

	useEffect(() => {
		async function fetchData() {
			await dispatch(getAllCountries());
		}

			fetchData();
  }, [dispatch]);
  
	if(countriesStatus === "idle" || countriesStatus === "loading") {
		return <h1>Loading...</h1>
	}	
	return (
		<>
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpenSidebar(!openSidebar)}
						edge="start"
						sx={[
							{
								mr: 2,
							},
							openSidebar && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6">
              Countries App
            </Typography>
          </Link>
				</Toolbar>
			</AppBar>

			<Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

			{children}
		</>
	);
};

export default PageWrapper;