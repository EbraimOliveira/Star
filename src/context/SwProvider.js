import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';

function SwProvider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [name, setName] = useState('');
  const [population, setPopulation] = useState(0);

  const requestAPI = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setDataAPI(results);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handlePopulation = ({ target }) => {
    setPopulation(target.value);
  };

  const myContext = useMemo(() => ({
    dataAPI,
    handleName,
    name,
    handlePopulation,
    population,
  }), [name, dataAPI, population]);

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

// Como fazer uma atualização de estado de forma assincrona:
// é preciso passar outra callBack porque o Hook (useEffect) não pode ser diretamente async.
// useEffect(() => {
//   const atualizacaoAssincrona = async () => {
//     setState((prevState) => prevState + 1)
//   }
//   atualizacaoAssincrona()
// }, [])

// Gera looping infinito pq o código será execultado sempre q o estado atualizar, e o estado será atualizado sempre q chamar a função:
// useEffect(() => {
//   const atualizacaoAssincrona = async () => {
//     setState((prevState) => prevState + 1)
//   }
//   atualizacaoAssincrona()
// }, [state])
