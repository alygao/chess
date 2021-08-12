import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import GeneralPageLayout from './components/GeneralPageLayout'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={GeneralPageLayout} />
      </Router>
    </div >
  );
}

export default App;
