import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';

function SwProvider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [numberData, setNumberData] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [myFilteredItens, setMyFilteredItens] = useState([]);
  const [optionsList, setOptionsList] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const changeNumber = ({ target }) => {
    setNumberData(target.value);
  };

  const columnFilter = ({ target }) => {
    setColumn(target.value);
  };

  const comparisonFilter = ({ target }) => {
    setComparison(target.value);
  };

  const requestAPI = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setDataAPI(results);
      setMyFilteredItens(results);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const saveFilterInfos = () => {
    setFilterByNumericValues((prevState) => [...prevState, {
      column,
      comparison,
      value: numberData,
    }]);
  };

  const applyFilters = ({ column: newColumn, value, comparison: newComparison }, acc) => {
    switch (newComparison) {
      case 'maior que':
        return acc.filter((planet) => Number(planet[newColumn]) > Number(value));
      case 'menor que':
        return acc.filter((planet) => Number(planet[newColumn]) < Number(value));
      default:
        return acc.filter((planet) => Number(planet[newColumn]) === Number(value));
    }
  };

  useEffect(() => {
    setMyFilteredItens(
      filterByNumericValues
        .reduce((acc, filter) => applyFilters(filter, acc), [...dataAPI]),
    );
    // setOptionsList(optionsList.filter((option) => option !== column));
  }, [filterByNumericValues]);

  const myContext = useMemo(() => ({
    dataAPI,
    handleName,
    name,
    changeNumber,
    numberData,
    columnFilter,
    column,
    comparisonFilter,
    comparison,
    saveFilterInfos,
    filterByNumericValues,
    optionsList,
    myFilteredItens,
  }), [name,
    dataAPI,
    numberData,
    column,
    comparison,
    filterByNumericValues,
    optionsList,
    myFilteredItens,
  ]);

  return (
    <SwContext.Provider value={myContext}>
      {children}
    </SwContext.Provider>
  );
}

SwProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default SwProvider;

//  pesquisar :
// WebGLTransformFeedback
// FileSystemDirectoryHandle
// Dados pessoais LGPD
