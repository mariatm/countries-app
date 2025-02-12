import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Route, Routes } from 'react-router'

import GlobalView from './pages/GlobalView'
import RegionView from './pages/RegionView'
import countriesReducer from  "./countriesSlice"
import PageWrapper from './layout/PageWrapper'
import NotFoundPage from './pages/NotFoundPage'
import ErrorPage from './pages/ErrorPage'
import './App.css'

const App = () => {
  return (
    <Provider store={configureStore({ reducer: countriesReducer })}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageWrapper><GlobalView /></PageWrapper>} />

          <Route path="/region/:region" element={<PageWrapper><RegionView /></PageWrapper>} />

          <Route path="/error" element={<ErrorPage />} />

          <Route path="/404" element={<PageWrapper><NotFoundPage /></PageWrapper>} />

          <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
