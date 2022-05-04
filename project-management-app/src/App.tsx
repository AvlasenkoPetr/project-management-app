import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCustomSelector } from './customHooks/customHooks';

const App: React.FC = () => {
  const select = useCustomSelector((state) => state.testReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>{select.id}</div>} />
        <Route path="/main/*" element={<div>MAin</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
