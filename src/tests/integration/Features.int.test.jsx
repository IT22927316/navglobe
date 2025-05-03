import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from '../../components/Features';

describe('Features Section', () => {
  test('renders all 4 BentoCards with correct titles', () => {
    render(<Features />);

    // We use getAllByText and just check the first match for safety
    expect(screen.getAllByText('Countries')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Regions')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Languages')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Currencies')[0]).toBeInTheDocument();
  });

  test('renders section heading and paragraph', () => {
    render(<Features />);
    expect(screen.getByText(/Explore the World of Data With Us/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hover over a country to view its name/i).length).toBeGreaterThan(0);
  });
});
