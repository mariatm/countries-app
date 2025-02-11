import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAllCountries = createAsyncThunk(
  'countries/getAll',
  async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json());

    return response;
  },
)

/*
export const getCountriesByRegion = createAsyncThunk(
  'countries/getByRegion',
  async ({region}) => {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((response) => response.json());

    return {region, countries: response};
  },
)
*/
const initialState = {
  countriesByRegion: {},
  countries: [],
  status: 'idle',
  error: null,
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        const countriesByRegion = action.payload.reduce((acc, country) => {
          const { region } = country;
          if (!acc[region]) {
            acc[region] = [];
          }
          acc[region].push(country);
          return acc;
        }, {});
        
        state.countries = action.payload;
        state.countriesByRegion = countriesByRegion;
        state.status = 'succeeded';
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      /*
      .addCase(getCountriesByRegion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCountriesByRegion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        state.countriesByRegion[action.payload.region] = action.payload.countries;
      })
      .addCase(getCountriesByRegion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      */
  },
})

//export const { getAllCountries } = countriesSlice.actions;
export const countries = (state) => state.countries;
export const countriesByRegion = (state) => state.countriesByRegion;
export const getCountriesStatus = (state) => state.status;
export const getCountriesError = (state) => state.error;

export default countriesSlice.reducer;