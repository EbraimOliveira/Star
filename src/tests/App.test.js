import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from "../../cypress/mocks/testData";

beforeEach(() => {
  global.fetch = jest.fn(async () =>
    Promise.resolve({
      json: async () => Promise.resolve(mockData),
    })
  );
});

describe('Testar tudo', () => {

  it('Possui os inputs de filtros', () => {
    render(<App />);
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
  });

  it('Quantidade de options nos inputs', () => {
    render(<App />)
    expect(screen.getAllByRole('option').length).toBe(8);
  })

  it('Renderiza a tabela', () => {
    render(<App />);
    expect(screen.getByTestId('table-test')).toBeInTheDocument();
  });


  it('Possui um botão de filtrar e um para remover todas as filtragens', () => {
    render(<App />);
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  })

  it('Retorna corretamente ao aplicar os filtros', async () => {
    render(<App />);
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const numberInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.type(numberInput, '7200');
    userEvent.click(filterButton);

    const planetFiltered = await screen.findByText('frozen')

    expect(planetFiltered).toBeInTheDocument();
  });
});