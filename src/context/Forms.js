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
    filterByNumericValues,
    optionsList,
  } = useContext(SwContext);

  const comparisonOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

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
          {optionsList
            .map((option) => <option key={ option } value={ option }>{option}</option>)}
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador:
        <select
          data-testid="comparison-filter"
          onChange={ comparisonFilter }
        >
          {comparisonOptions
            .map((option) => <option key={ option } value={ option }>{option}</option>)}

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
      {filterByNumericValues.length > 0
        && (filterByNumericValues.map((filter, index) => (
          <div key={ filter.column + index }>
            <p>
              {`${filter.column}`}
            </p>
            <p>
              {`${filter.comparison}`}
            </p>
            <p>
              {`${filter.value}`}
            </p>
          </div>
        )))}
    </form>
  );
}

export default Forms;
