import React, { useContext } from 'react';
import SwContext from './SwContext';

function Forms() {
  const { name, handleName } = useContext(SwContext);

  return (
    <form>
      <input
        value={ name }
        data-testid="name-filter"
        onChange={ handleName }
      />
    </form>
  );
}

export default Forms;
