import 'whatwg-fetch';
import React from "react"; 
import { render, screen } from "@testing-library/react";
import GlobePage from "../../components/Globe";

// Mock Globe component to avoid .mjs error
jest.mock('react-globe.gl', () => {
  const React = require('react');
  return React.forwardRef((props, ref) => {
    const {
      globeImageUrl,
      backgroundColor,
      polygonsData,
      polygonAltitude,
      polygonCapColor,
      polygonSideColor,
      polygonStrokeColor,
      onPolygonHover,
      polygonLabel,
      ...rest
    } = props;

    React.useImperativeHandle(ref, () => ({
      controls: () => ({
        autoRotate: false,
        autoRotateSpeed: 0,
        update: () => {},
      }),
      pointOfView: () => {},
    }));

    return <div data-testid="mock-globe" ref={ref} {...rest} />;
  });
});


describe("GlobePage", () => {
  test("renders heading and description", () => {
    render(<GlobePage />);
    expect(screen.getByText(/Explore the World in 3D/i)).toBeInTheDocument();
    expect(screen.getByText(/Hover over a country/i)).toBeInTheDocument();
  });

  test("renders mocked globe", () => {
    render(<GlobePage />);
    const mockGlobe = screen.getByTestId("mock-globe");
    expect(mockGlobe).toBeInTheDocument();
  });

  test("renders footer note", () => {
    render(<GlobePage />);
    expect(screen.getByText(/Powered by react-globe.gl/i)).toBeInTheDocument();
  });
});