import React, { useContext } from 'react';
import SwContext from '../context/SwContext';

function Table() {
  const { dataAPI,
    name,
    comparison,
    column,
    numberData,
    filters,
  } = useContext(SwContext);

  const number = Number(numberData);

  const applyFilters = (data) => {
    if (filters.length > 0) {
      switch (comparison) {
      case 'maior que':
        return data.filter((planet) => planet[column] > number);
      case 'menor que':
        return data.filter((planet) => planet[column] < number);
      case 'igual a':
        return data.filter((planet) => planet[column] === numberData);
      default:
        return true;
      }
    }
    return data;
  };

  return (
    <table>
      <caption>Planets</caption>
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {dataAPI.length > 0
          && (applyFilters(dataAPI).filter((planet) => planet.name
            .toUpperCase().includes(name.toUpperCase()))
            .map((planet) => (
              <tr
                key={ planet.name }
              >
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            )))}
      </tbody>
    </table>
  );
}

export default Table;
