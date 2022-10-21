import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwContext from './SwContext';

function SwProvider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);
  const [name, setName] = useState('');

  const requestAPI = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setDataAPI(results);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleName = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const myContext = useMemo(() => ({
    dataAPI,
    handleName,
    name,
  }), [name, dataAPI]);

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
