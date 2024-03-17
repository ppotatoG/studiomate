import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Loading from './components/Loading';
import Main from './page/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Loading />
        <Routes>
          <Route path="/main" Component={Main} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
