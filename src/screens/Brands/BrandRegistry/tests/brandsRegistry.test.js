import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import BrandsRegistry from '..';
import useBrandRegistry from '../hooks/useBrandRegistry';
import useBrandUpdate from '../hooks/useBrandUpdate';

jest.mock('../hooks/useBrandRegistry');
jest.mock('../hooks/useBrandUpdate');

const mockedBrandId = 12;
let mockedLocationPathname = '/cadastro-marca';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: mockedLocationPathname,
  }),
  useParams: () => ({
    brandId: mockedBrandId,
  }),
}));

describe('Create/update brand form', () => {
  let brandInput;
  let cancelLink;

  beforeEach(() => {
    useBrandRegistry.mockReturnValue({ register: jest.fn() });
    useBrandUpdate.mockReturnValue({ update: jest.fn() });
    render(
      <MemoryRouter>
        <BrandsRegistry />
      </MemoryRouter>,
    );

    brandInput = screen.getByRole('textbox', { name: 'Marca' });
    cancelLink = screen.getByRole('link', { name: 'Cancelar' });
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <BrandsRegistry />
      </MemoryRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('render', () => {
    it('should render form default components correctly', () => {
      expect(brandInput).toBeInTheDocument();
      expect(cancelLink).toBeInTheDocument();
    });

    it('should render the registry button and heading when the registry route is used', () => {
      const registryHeading = screen.getByText('Cadastro de marcas');
      const registryButton = screen.getByRole('button', { name: 'Cadastrar' });
      expect(registryButton).toBeInTheDocument();
      expect(registryHeading).toBeInTheDocument();
    });

    it('should render the update button and heading when the update route is used', () => {
      cleanup();
      mockedLocationPathname = '/alteracao-marca';
      render(
        <MemoryRouter>
          <BrandsRegistry />
        </MemoryRouter>
      );
      const updateHeading = screen.getByText('Alteração de marca');
      const updateButton = screen.getByRole('button', { name: 'Alterar' })
      expect(updateButton).toBeInTheDocument();
      expect(updateHeading).toBeInTheDocument();
    });

    it('should render the loading component when the register is loading (registry mode)', () => {
      cleanup();
      mockedLocationPathname = '/cadastro-marca';
      useBrandRegistry.mockReturnValue({ register: jest.fn(), isLoading: true });
      useBrandUpdate.mockReturnValue({ update: jest.fn() });
      const { getByRole } = render(
        <MemoryRouter>
          <BrandsRegistry />
        </MemoryRouter>,
      );
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render the loading component when the update is loading (update mode)', () => {
      cleanup();
      mockedLocationPathname = '/alteracao-marca';
      useBrandRegistry.mockReturnValue({ register: jest.fn() });
      useBrandUpdate.mockReturnValue({ update: jest.fn(), isUpdateLoading: true });
      const { getByRole } = render(
        <MemoryRouter>
          <BrandsRegistry />
        </MemoryRouter>,
      );
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render the loading component when the get is loading (update mode)', () => {
      cleanup();
      mockedLocationPathname = '/alteracao-marca';
      useBrandRegistry.mockReturnValue({ register: jest.fn() });
      useBrandUpdate.mockReturnValue({ update: jest.fn(), isGetLoading: true });
      const { getByRole } = render(
        <MemoryRouter>
          <BrandsRegistry />
        </MemoryRouter>,
      );
      expect(getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('form and validation functioning', () => {
    it('should send the data correctly to the update service when a user presses submit', () => {
      cleanup();
      const mockedUpdateService = jest.fn();
      mockedLocationPathname = `/alteracao-marca/${mockedBrandId}`;
      useBrandRegistry.mockReturnValue({ register: jest.fn() });
      useBrandUpdate.mockReturnValue({ update: mockedUpdateService });
      const { getByRole } = render(
        <MemoryRouter>
          <BrandsRegistry />
        </MemoryRouter>,
      );
      brandInput = getByRole('textbox', { name: 'Marca' });
  
      fireEvent.change(brandInput, { target: { value: 'Fake car brand' } });
      fireEvent.focusOut(brandInput);

      const expectedForm = {
        vehicleId: mockedBrandId,
        brand: 'Fake car brand',
      };

      const updateButton = getByRole('button', { name: 'Alterar' });
      fireEvent.click(updateButton);
  
      expect(mockedUpdateService).toHaveBeenCalledWith(expectedForm.brand);
    });

    it('should send the data correctly to the registry service when a user presses submit', () => {
      cleanup();
      const mockedRegisterVehicle = jest.fn();
      mockedLocationPathname = '/cadastro-marca';
      useBrandRegistry.mockReturnValue({ register: mockedRegisterVehicle });
      useBrandUpdate.mockReturnValue({ update: jest.fn() });
      const { getByRole } = render(
        <MemoryRouter>
          <BrandsRegistry />
        </MemoryRouter>,
      );
      brandInput = getByRole('textbox', { name: 'Marca' });
  
      const mockedBrandName = 'Fake brand name';
      fireEvent.change(brandInput, { target: { value: mockedBrandName } });
      fireEvent.focusOut(brandInput);

      const updateButton = getByRole('button', { name: 'Cadastrar' });
      fireEvent.click(updateButton);
  
      expect(mockedRegisterVehicle).toHaveBeenCalledWith(mockedBrandName);
    });
  });
});
