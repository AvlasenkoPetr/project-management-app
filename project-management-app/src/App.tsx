import React from 'react';
import { useCustomSelector } from './customHooks/customHooks';

const App: React.FC = () => {
  const select = useCustomSelector((state) => state.testReducer);

  return <div>{select.id}</div>;
};

export default App;
