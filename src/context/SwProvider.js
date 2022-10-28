import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';

const options = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function SwProvider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [name, setName] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [numberData, setNumberData] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [myFilteredItens, setMyFilteredItens] = useState([]);
  const [optionsList, setOptionsList] = useState(options);
  const [column, setColumn] = useState('');

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
    setOptionsList(optionsList.filter((option) => option !== column));
  };

  useEffect(() => {
    setColumn(optionsList[0]);
  }, [optionsList]);

  const applyFilters = ({ column: newColumn, value, comparison: newComparison }, acc) => {
    switch (newComparison) {
    case 'maior que':
      return acc.filter((planet) => +(planet[newColumn]) > +(value));
    case 'menor que':
      return acc.filter((planet) => +(planet[newColumn]) < +(value));
    default:
      return acc.filter((planet) => +(planet[newColumn]) === +(value));
    }
  };

  useEffect(() => {
    setMyFilteredItens(
      filterByNumericValues
        .reduce((acc, filter) => applyFilters(filter, acc), [...dataAPI]),
    );
  }, [filterByNumericValues]);

  const clearFilters = () => {
    setFilterByNumericValues([]);
    setOptionsList(options);
    setName('');
    setComparison('maior que');
    setNumberData(0);
    setColumn('population');
  };

  const clearCollumn = (col) => {
    setFilterByNumericValues(filterByNumericValues
      .filter((filter) => (filter.column !== col)));
    setOptionsList(optionsList.concat([col]));
  };

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
    clearFilters,
    clearCollumn,
  }), [name, dataAPI, numberData, column, comparison,
    filterByNumericValues, optionsList, myFilteredItens,
  ]);

  return (
    <SwContext.Provider value={ myContext }>
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
// integração SCPI / CPI SAP
// ux ui design
