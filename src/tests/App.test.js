import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testar tudo', () => {

  it('Possui um input para filtro Name', () => {
    render(<App />);
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();
  });

  it('renderiza a tabela', () => {
    render(<App />);
    const table = screen.getByTestId('table-test');
    expect(table).toBeInTheDocument();
  });

  it('', () => {

  })

});