import React from 'react';
import './App.css';
import SwProvider from './context/SwProvider';
import Table from './components/Table';
import Forms from './context/Forms';

function App() {
  return (
    <SwProvider>
      <Forms />
      <Table />
    </SwProvider>
  );
}

export default App;
