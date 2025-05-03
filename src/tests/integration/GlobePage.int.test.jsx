import React from 'react';
import { render, screen } from '@testing-library/react';
import GlobePage from '../../components/Globe';

jest.mock('react-globe.gl', () => {
  const React = require('react');
  return React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
      controls: () => ({
        autoRotate: false,
        autoRotateSpeed: 0,
        update: () => {}
      }),
      pointOfView: () => {}
    }));
    return <div data-testid="mock-globe" ref={ref} />;
  });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      type: "Topology",
      objects: {
        countries: {
          type: "GeometryCollection",
          geometries: [
            { properties: { name: "Mockland" } },
            { properties: { name: "Testonia" } }
          ]
        }
      }
    })
  })
);

describe('GlobePage Component', () => {
  test('renders heading, paragraph, and mocked globe', async () => {
    render(<GlobePage />);
    expect(screen.getByText(/Explore the World in 3D/i)).toBeInTheDocument();
    expect(screen.getByText(/Hover over a country/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-globe')).toBeInTheDocument();
    expect(screen.getByText(/Powered by react-globe\.gl/i)).toBeInTheDocument();
  });
});
