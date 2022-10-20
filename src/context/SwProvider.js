import React, { useState, useMemo, useEffect } from "react";
import SwContext from "./SwContext";

function SwProvider({ children }) {
  const [dataAPI, setDataAPI] = useState([]);

  const requestAPI = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      setDataAPI(results);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    requestAPI()
  }, [])

  const myContext = useMemo(() => ({
    dataAPI,
  }), [dataAPI])

  return (
    <SwContext.Provider value={myContext}>
      {children}
    </SwContext.Provider>
  )
}

export default SwProvider;




//  pesquisar :
// WebGLTransformFeedback 


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
