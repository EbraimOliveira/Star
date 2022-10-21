import React, { useContext } from 'react';
import SwContext from './SwContext';

function Forms() {
  const { name,
    handleName,
    numberData,
    changeNumber,
    columnFilter,
    comparisonFilter,
    saveFilterInfos,
    filters,
  } = useContext(SwContext);

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
          onChange={ columnFilter }
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
          onChange={ comparisonFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        data-testid="value-filter"
        value={ numberData }
        type="number"
        onChange={ changeNumber }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ saveFilterInfos }
      >
        FILTRAR
      </button>
      {filters.length > 0
        && (filters.map((filter, index) => (
          <div key={ filter.column + index }>
            <p>
              {`${filter.column}`}
            </p>
            <p>
              {`${filter.comparison}`}
            </p>
            <p>
              {`${filter.numberData}`}
            </p>
          </div>
        )))}
    </form>
  );
}

export default Forms;
