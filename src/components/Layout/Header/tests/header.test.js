import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '..';

describe('Header component', () => {
  it('should render a h1 with the name of the app', () => {
    render(<Header />);

    const headerComponent = screen.getByRole('heading', /Carango Bom/i);

    expect(headerComponent).toBeInTheDocument();
  });
});
