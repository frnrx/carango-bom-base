import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Sidebar from '..';

import { AuthenticationContext } from '../../../../contexts/authentication';

describe('Sidebar component', () => {
  it('should match the snapshot when the user is logged in', () => {
    const history = createMemoryHistory();

    const mockedState = {
      isLoggedIn: true,
    };

    const { container } = render(
      <AuthenticationContext.Provider value={mockedState}>
        <Router history={history}>
          <Sidebar />
        </Router>
      </AuthenticationContext.Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match the snapshot when the user is logged out', () => {
    const history = createMemoryHistory();

    const mockedState = {
      isLoggedIn: false,
    };

    const { container } = render(
      <AuthenticationContext.Provider value={mockedState}>
        <Router history={history}>
          <Sidebar />
        </Router>
      </AuthenticationContext.Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Sidebar state behavior', () => {
  it('should logout when the users click on Sair', async () => {
    cleanup();
    const history = createMemoryHistory();

    const mockedState = {
      isLoggedIn: true,
      logout: jest.fn(),
    };

    const { getByText } = render(
      <AuthenticationContext.Provider value={mockedState}>
        <Router history={history}>
          <Sidebar />
        </Router>
      </AuthenticationContext.Provider>,
    );

    const logoutButton = getByText('Sair');

    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(mockedState.logout).toHaveBeenCalled();
  });
});
