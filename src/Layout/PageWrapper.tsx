import { ReactNode, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"

import MenuIcon from "@mui/icons-material/Menu"
import { useMediaQuery, useTheme } from "@mui/material"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

import PageLoader from "../components/Loader"
import { getAllCountries, getCountriesStatus } from "../countriesSlice"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

const PageWrapper = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
  
	if(countriesStatus === "failed") {
		navigate("/error");

		return;
	}	

	if(countriesStatus !== "succeeded") {
		return <PageLoader />
	}	

	return (
		<main>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpenSidebar(!openSidebar)}
						edge="start"
						sx={[{ mr: 2 }, openSidebar && { display: 'none' }]}
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
		</main>
	);
};

export default PageWrapper;