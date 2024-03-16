import React from 'react';

import './App.css';
import Loading from './components/Loading';
import Main from './page/Main';

const App: React.FC = () => {
  return (
    <div className="App">
      <Loading />
      <Main />
    </div>
  );
};

export default App;
