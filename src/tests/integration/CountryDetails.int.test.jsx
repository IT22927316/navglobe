import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CountryDetails from '../../pages/CountryDetails';

test('renders loading state of CountryDetails page', () => {
  render(
    <MemoryRouter initialEntries={['/country/US']}>
      <Routes>
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Loading country details/i)).toBeInTheDocument();
});
