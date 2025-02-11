import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Route, Routes } from 'react-router'

import GlobalView from './pages/GlobalView'
import RegionView from './pages/RegionView'
import countriesReducer from  "./countriesSlice"
import './App.css'
import PageWrapper from './Layout/PageWrapper';

const App = () => {

  return (
    <Provider store={configureStore({ reducer: countriesReducer })}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageWrapper><GlobalView /></PageWrapper>} />

            <Route path="/region/:region" element={<PageWrapper><RegionView /></PageWrapper>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
