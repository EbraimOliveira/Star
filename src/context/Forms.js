import React, { useContext } from 'react';
import SwContext from './SwContext';

function Forms() {
  const { name, handleName, population, handlePopulation } = useContext(SwContext);

  return (
    <form>
      <label htmlFor="name-filter">
        Name:
        <input
          value={ name }
          data-testid="name-filter"
          onChange={ handleName }
        />
      </label>

      <label htmlFor="column-filter">
        Coluna:
        <select
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador:
        <select
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        data-testid="value-filter"
        value={ population }
        type="number"
        onChange={ handlePopulation }
      />
      <button
        data-testid="button-filter"
        type="button"
      >
        FILTRAR
      </button>
    </form>
  );
}

export default Forms;
