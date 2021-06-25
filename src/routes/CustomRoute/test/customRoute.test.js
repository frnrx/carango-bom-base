import React from 'react';
import { render } from '@testing-library/react';
import { Switch, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Authentication from '../../../contexts/authentication';

import CustomRoute from '..';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('CustomRoute component', () => {
  it('should navigate to login if is a private route and the user is not logged in', () => {
    const mockedState = {
      isLoggedIn: false,
      login: jest.fn(),
    };

    const history = createMemoryHistory();

    render(
      <Authentication.Provider value={mockedState}>
        <Router history={history}>
          <Switch>
            <CustomRoute exact path="/login">
              <div>login</div>
            </CustomRoute>
            <CustomRoute path="/component" isPrivate>
              <div>component</div>
            </CustomRoute>
            <CustomRoute path="/">
              <div>home</div>
            </CustomRoute>
          </Switch>
        </Router>
      </Authentication.Provider>,
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
      <Authentication.Provider value={mockedState}>
        <Router history={history}>
          <Switch>
            <CustomRoute exact path="/login">
              <div>login</div>
            </CustomRoute>
            <CustomRoute exact path="/component" isPrivate>
              <div>component</div>
            </CustomRoute>
            <CustomRoute path="/">
              <div>home</div>
            </CustomRoute>
          </Switch>
        </Router>
      </Authentication.Provider>,
    );

    history.push('/component');

    expect(getByText('component')).toBeInTheDocument();
  });
});
