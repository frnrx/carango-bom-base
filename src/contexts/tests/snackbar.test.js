import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Button from '@material-ui/core/Button';

import SnackBarProvider, { SnackBarContext } from '../snackbar';

describe('snackbar context actions', () => {
  it('should render an alert', async () => {
    render(
      <SnackBarProvider>
        <SnackBarContext.Consumer>
          {({ addAlert }) => (
            <Button onClick={() => addAlert({ content: 'This is an alert' })}>
              activate alert
            </Button>
          )}
        </SnackBarContext.Consumer>
      </SnackBarProvider>,
    );

    const alertButton = screen.getByRole('button', { name: /activate alert/i });

    fireEvent.click(alertButton);

    const alert = screen.getByText('This is an alert');

    expect(alert).toBeInTheDocument();
  });

  it('should remove the alert after the time duration', async () => {
    render(
      <SnackBarProvider>
        <SnackBarContext.Consumer>
          {({ addAlert }) => (
            <Button
              onClick={() =>
                addAlert({
                  content: 'This is an alert',
                  customSeverity: 'error',
                  customDuration: 300,
                })
              }
            >
              activate alert
            </Button>
          )}
        </SnackBarContext.Consumer>
      </SnackBarProvider>,
    );

    const alertButton = screen.getByRole('button', { name: /activate alert/i });

    fireEvent.click(alertButton);

    const alert = screen.getByText('This is an alert');

    await waitForElementToBeRemoved(alert);
  });
});
