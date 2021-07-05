import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import FormButton from '..';

describe('FormButton component', () => {
  it('should render a button if isLink is false', () => {
    render(
      <MemoryRouter>
        <FormButton>
          FormButton
        </FormButton>
      </MemoryRouter>
    );

    const renderedFormButton = screen.getByRole('button', "FormButton");

    expect(renderedFormButton).toBeInTheDocument();
  });

  it('should render a link if isLink is true', () => {
    render(
      <MemoryRouter>
        <FormButton to="/anywhere" isLink>
        FormButtonLink
        </FormButton>
      </MemoryRouter>
    );

    const renderedFormButtonLink = screen.getByRole('link', "FormButtonLink");

    expect(renderedFormButtonLink).toBeInTheDocument();
  });
});
