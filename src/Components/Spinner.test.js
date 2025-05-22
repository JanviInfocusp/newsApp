import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  test('renders without crashing', () => {
    render(<Spinner />);
  });

  test('displays the loading image', () => {
    render(<Spinner />);
    const loadingImage = screen.getByAltText('loading');
    expect(loadingImage).toBeInTheDocument();
  });
});
