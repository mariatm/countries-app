import { useEffect } from "react";
import { getAllCountries, getCountriesStatus } from "../../countriesSlice";
import { useDispatch, useSelector } from "react-redux";
import View from "./View";

const Home = () => {
	const dispatch = useDispatch();
	const countriesStatus = useSelector(getCountriesStatus);
	//console.log(allCountries, countriesStatus);

	useEffect(() => {
		async function fetchData() {
			await dispatch(getAllCountries());
		}

			fetchData();
		
  }, [dispatch]);

	if(countriesStatus === "loading") {
		return <h1>Loading...</h1>
	}	
	return (
		<View />
	);
};

export default Home;