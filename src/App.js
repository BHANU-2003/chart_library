import React from 'react';
import { Route,BrowserRouter, Routes } from 'react-router-dom';
import ChartComponent from './components/chartt';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChartComponent />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
