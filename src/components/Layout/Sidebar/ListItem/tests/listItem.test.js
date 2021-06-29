import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ListItem from '..';

describe('ListItem screen', () => {
  describe('list item rendering', () => {
    it('should render a button when it receives a action prop', () => {
      const history = createMemoryHistory();
      const mockedListItem = {
        text: 'mocked button',
        action: jest.fn(),
      };

      render(
        <Router history={history}>
          <ListItem text={mockedListItem.text} action={mockedListItem.action} />
        </Router>
      );
      const renderedButton = screen.getByRole('button', { name: mockedListItem.text });

      expect(renderedButton).toBeInTheDocument();
    });

    it('should render a link when it receives a path prop', () => {
      const history = createMemoryHistory();
      const mockedListItem = {
        text: 'mocked button',
        path: '/fake-path',
      };

      render(
        <Router history={history}>
          <ListItem text={mockedListItem.text} path={mockedListItem.path} />
        </Router>
      );
      const renderedLink = screen.getByRole('link');

      expect(renderedLink).toBeInTheDocument();
      expect(renderedLink).toHaveAttribute('href', '/fake-path');
    });
  });
});
