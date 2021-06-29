import React from 'react';
import { render, screen } from '@testing-library/react';

import BrandsList from '..';

describe('BrandsList component', () => {
  describe('rendering', () => {
    it('should match the snapshot', () => {
      const { container } = render(<BrandsList />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render the buttons correctly', () => {
      render(<BrandsList />);
      const deleteButton = screen.getByRole('button', { name: 'Excluir' });
      const changeButton = screen.getByRole('button', { name: 'Alterar' });

      expect(deleteButton).toBeInTheDocument();
      expect(changeButton).toBeInTheDocument();
    });
  });
});
