import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Country, Regions } from './utils/interfaces';

export const getAllCountries = createAsyncThunk(
  'countries/getAll',
  async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json());

    return response;
  },
)

interface state {
  countriesByRegion: Regions,
  countries: Country[],
  status: string,
  error: string | null,
}

const initialState : state = {
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
        const countriesByRegion = action.payload
          .sort((a: Country, b: Country) => b.population - a.population)
          .reduce((acc: Regions, country: Country) => {
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
        state.error = action.error.message ?? 'Unknown error';
      });
  },
})


export const countries = (state: state) => state.countries;
export const countriesByRegion = (state: state) => state.countriesByRegion;
export const getCountriesStatus = (state: state) => state.status;
export const getCountriesError = (state: state) => state.error;

export default countriesSlice.reducer;