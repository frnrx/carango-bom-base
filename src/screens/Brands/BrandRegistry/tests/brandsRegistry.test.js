import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import BrandsRegistry from '..';

describe('BrandsRegistry component', () => {
  it('should match the snapshot', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <BrandsRegistry />
      </Router>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
