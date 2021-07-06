import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { AuthenticationContext } from '../../../../contexts/authentication';
import useUsers from '../hooks/useUsers';
import UsersList from '..';
import mockedUsers from './mockedUsers';

jest.mock('../hooks/useUsers');

describe('<UsersList />', () => {
  beforeEach(() => {
    const mockedState = { isLoggedIn: true };
    const mockedDeleteUser = jest.fn();
    useUsers.mockReturnValue({
      users: mockedUsers,
      isLoading: false,
      deleteUser: mockedDeleteUser,
    });

    render(
      <AuthenticationContext.Provider value={mockedState}>
        <MemoryRouter>
          <UsersList />
        </MemoryRouter>
      </AuthenticationContext.Provider>,
    );
  });

  describe('rendering', () => {
    it('should render the UsersList component correctly', () => {
      expect(screen.getByRole('button', { name: /Excluir/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Criar novo usuário/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Lista de usuários/i })).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(5);
    });
  });

  describe('button enabling', () => {
    it('should enable the buttons after a row is clicked', () => {
      expect(screen.getByRole('button', { name: 'Excluir' })).toBeDisabled();

      const firstUserRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstUserRow);

      expect(screen.getByRole('button', { name: 'Excluir' })).toBeEnabled();
    });
  });
});
