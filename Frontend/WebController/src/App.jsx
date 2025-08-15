import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Principal from "./Pages/Principal"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Principal/>} /> 
      </Routes>
    </Router>
  )
}