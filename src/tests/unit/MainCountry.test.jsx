import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainCountry from '../../pages/Countries';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          cca3: "LKA",
          name: { common: "Sri Lanka" },
          capital: ["Sri Jayawardenepura Kotte"],
          region: "Asia",
          population: 21919000,
          languages: { sin: "Sinhala", tam: "Tamil" },
          flags: { png: "https://flagcdn.com/w320/lk.png" }
        }
      ])
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders MainCountry component and displays countries', async () => {
  render(
    <BrowserRouter>
      <MainCountry />
    </BrowserRouter>
  );

  const countryCard = await waitFor(() => screen.getByText(/Sri Lanka/i));
  expect(countryCard).toBeInTheDocument();
});
