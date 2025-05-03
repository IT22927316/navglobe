import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

jest.mock('../../components/Hero', () => () => <div data-testid="hero" />);
jest.mock('../../components/Features', () => () => <div data-testid="features" />);
jest.mock('../../components/Contact', () => () => <div data-testid="contact" />);
jest.mock('../../components/Footer2', () => () => <div data-testid="footer" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Globe', () => () => <div data-testid="globe" />);
jest.mock('../../components/Newsletter', () => () => <div data-testid="newsletter" />);

describe('Home Page', () => {
  test('renders all main components', () => {
    render(<Home />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('globe')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
