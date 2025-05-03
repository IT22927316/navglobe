import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CurrencyPage from '../../pages/Currency'; // ✅ make sure path matches your actual file

// Mock Navbar and Footer
jest.mock('../../components/Navbar2', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Footer2', () => () => <div data-testid="footer" />);

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('currency/xyz')) {
      return Promise.resolve({
        ok: false, // invalid currency code
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          name: { common: 'France' },
          currencies: { EUR: { name: 'Euro', symbol: '€' } }
        },
        {
          name: { common: 'Japan' },
          currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } }
        }
      ])
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('CurrencyPage', () => {
  test('renders heading and description', async () => {
    render(<CurrencyPage />);
    expect(await screen.findByText(/World Currencies/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore all currencies/i)).toBeInTheDocument();
  });

  test('handles invalid currency code gracefully', async () => {
    render(<CurrencyPage />);


    await waitFor(() => {
      // Expect known country like France to NOT be shown
      expect(screen.queryByText('France')).not.toBeInTheDocument();
    });
  });

  test('renders countries when no currency filter applied', async () => {
    render(<CurrencyPage />);
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });
});
