import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Sidebar from '..';

import Authentication from '../../../contexts/authentication';

describe('Sidebar component', () => {
  it('should match the snapshot when the user is logged in', () => {
    const history = createMemoryHistory();

    const mockedState = {
      isLoggedIn: true,
    };

    const { container } = render(
      <Authentication.Provider value={mockedState}>
        <Router history={history}>
          <Sidebar />
        </Router>
      </Authentication.Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match the snapshot when the user is logged out', () => {
    const history = createMemoryHistory();

    const mockedState = {
      isLoggedIn: false,
    };

    const { container } = render(
      <Authentication.Provider value={mockedState}>
        <Router history={history}>
          <Sidebar />
        </Router>
      </Authentication.Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
