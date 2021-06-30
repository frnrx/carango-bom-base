import React from 'react';
import { render, screen } from '@testing-library/react';

import AuthenticationProvider from '../authentication';
import { SnackBarContext } from '../snackbar';

describe('authentication provider', () => {
  it('should the provider children correctly', async () => {
    const mockedValue = {
      addAlert: jest.fn(),
    };
    render(
      <SnackBarContext.Provider value={mockedValue}>
        <AuthenticationProvider>
          <p>auth provider children</p>
        </AuthenticationProvider>
      </SnackBarContext.Provider>
    );

    const providerChildren = screen.getByText('auth provider children');

    expect(providerChildren).toBeInTheDocument();
  });
});
