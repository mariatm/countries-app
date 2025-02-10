import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAllCountries = createAsyncThunk(
  'countries/getAll',
  async () => {
    console.log('fasfasd')
    const response = await fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json());

    return response;
  },
)

const initialState = {
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
        state.status = 'succeeded';
        console.log(action.payload);
        state.countries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
})

//export const { getAllCountries } = countriesSlice.actions;
export const countries = (state) => state.countries;
export const getCountriesStatus = (state) => state.status;
export const getCountriesError = (state) => state.error;

export default countriesSlice.reducer;