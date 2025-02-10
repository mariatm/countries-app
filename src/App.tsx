import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import countriesReducer from  "./countriesSlice";
import { configureStore } from '@reduxjs/toolkit';

const App = () => {

  return (
    <Provider store={configureStore({ reducer: countriesReducer })}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/region/{region}" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
