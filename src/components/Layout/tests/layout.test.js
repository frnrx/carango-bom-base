import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Layout from '..';

describe('Header component', () => {
  it('should render the layout and children components', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Layout>
          <div>children</div>
        </Layout>
      </Router>,
    );

    const headerComponent = screen.getByRole('heading', /Carango Bom/i);
    const navigationComponent = screen.getByRole('navigation');
    const childrenComponent = screen.getByText(/children/i);

    expect(headerComponent).toBeInTheDocument();
    expect(navigationComponent).toBeInTheDocument();
    expect(childrenComponent).toBeInTheDocument();
  });
});
