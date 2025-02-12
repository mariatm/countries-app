import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";

import PageLoader from "../components/Loader";
import { getAllCountries, getCountriesStatus } from "../countriesSlice";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const PageWrapper = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch();
  const theme = useTheme();
  const isSM = !useMediaQuery(theme.breakpoints.up('sm'));

	const [openSidebar, setOpenSidebar] = useState(false);
	const countriesStatus = useSelector(getCountriesStatus);

	useEffect(() => {
		async function fetchData() {
			await dispatch(getAllCountries());
		}

			fetchData();
  }, [dispatch]);
  
	if(countriesStatus !== "succeeded") {
		return <PageLoader />
	}	
	return (
		<>
			<AppBar position="fixed">
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

      <div style={{ marginTop: isSM ? 56 : 64, width: '100%' }}>
			  {children}
      </div>

      <Footer />
		</>
	);
};

export default PageWrapper;