import React from 'react';
import './App.css';
import SwProvider from './context/SwProvider';
import Table from './components/Table';

function App() {
  return (
    <SwProvider>
      <span>Hello, App!</span>
      <Table>
      </Table>
    </SwProvider>
  );
}

export default App;
