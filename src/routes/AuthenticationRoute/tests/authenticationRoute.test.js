import React from 'react';
import { render } from '@testing-library/react';
import { Switch, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { AuthenticationContext } from '../../../contexts/authentication';

import AuthenticationRoute from '..';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('AuthenticationRoute component', () => {
  it('should navigate to login if is a private route and the user is not logged in', () => {
    const mockedState = {
      isLoggedIn: false,
      login: jest.fn(),
    };

    const history = createMemoryHistory();

    render(
      <AuthenticationContext.Provider value={mockedState}>
        <Router history={history}>
          <Switch>
            <AuthenticationRoute exact path="/login">
              <div>login</div>
            </AuthenticationRoute>
            <AuthenticationRoute path="/component" isPrivate>
              <div>component</div>
            </AuthenticationRoute>
            <AuthenticationRoute path="/">
              <div>home</div>
            </AuthenticationRoute>
          </Switch>
        </Router>
      </AuthenticationContext.Provider>,
    );

    history.push('/component');

    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });

  it('should navigate to the correct path if is a private route and the user is logged in', () => {
    const mockedState = {
      isLoggedIn: true,
      login: jest.fn(),
    };

    const history = createMemoryHistory();

    const { getByText } = render(
      <AuthenticationContext.Provider value={mockedState}>
        <Router history={history}>
          <Switch>
            <AuthenticationRoute exact path="/login">
              <div>login</div>
            </AuthenticationRoute>
            <AuthenticationRoute exact path="/component" isPrivate>
              <div>component</div>
            </AuthenticationRoute>
            <AuthenticationRoute path="/">
              <div>home</div>
            </AuthenticationRoute>
          </Switch>
        </Router>
      </AuthenticationContext.Provider>,
    );

    history.push('/component');

    expect(getByText('component')).toBeInTheDocument();
  });
});
