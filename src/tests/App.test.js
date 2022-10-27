import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testar tudo', () => {

  it('Possui um input para filtro Name', () => {
    render(<App />);
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  });

  it('Quantidade de options nos inputs', () => {
    render(<App />)
    expect(screen.getAllByRole('option').length).toBe(8);
  })

  it('Renderiza a tabela', () => {
    render(<App />);
    expect(screen.getByTestId('table-test')).toBeInTheDocument();
  });

  it('', () => {

  })

});