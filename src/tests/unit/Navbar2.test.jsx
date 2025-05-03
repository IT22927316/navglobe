import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../components/Navbar2'; // adjust the path if needed

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar Component', () => {
  test('renders all desktop navigation links', () => {
    renderWithRouter(<Navbar />);
    const navItems = ['HOME', 'COUNTRIES', 'MAP', 'CURRENCY', 'LANGUAGES', 'ABOUT'];
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('renders mobile menu toggle button', () => {
    renderWithRouter(<Navbar />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });
});
