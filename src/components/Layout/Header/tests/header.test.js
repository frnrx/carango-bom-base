import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '..';

describe('Header component', () => {
  it('should render a h1 with the name of the app', () => {
    render(<Header />);

    const headerTitle = screen.getByText(/Carango Bom/i);

    expect(headerTitle).toBeInTheDocument();
  });
});
