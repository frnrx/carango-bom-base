import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import VehicleRegistry from '..';

import useBrands from '../hooks/useBrands';
import useVehicleRegistry from '../hooks/useVehicleRegistry';
import brandsParser from '../brandsParser';
import mockedBrands from '../hooks/tests/mockedBrands';

jest.mock('../hooks/useBrands');
jest.mock('../hooks/useVehicleRegistry');

const mockedVehicleId = 123;
let mockedLocationPathname = '/cadastro-veiculo';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: mockedLocationPathname,
  }),
  useParams: () => ({
    vehicleId: mockedVehicleId,
  }),
}));

describe('Create/update vehicle form', () => {
  let modelInput;
  let yearInput;
  let valueInput;
  let cancelLink;

  beforeEach(() => {
    useBrands.mockReturnValue({ brands: brandsParser(mockedBrands) });
    useVehicleRegistry.mockReturnValue({ registerVehicle: jest.fn(), updateVehicle: jest.fn() });
    render(
      <MemoryRouter>
        <VehicleRegistry />
      </MemoryRouter>,
    );

    modelInput = screen.getByRole('textbox', { name: 'Modelo' });
    yearInput = screen.getByRole('spinbutton', { name: 'Ano' });
    valueInput = screen.getByRole('spinbutton', { name: 'Preço' });
    cancelLink = screen.getByRole('link', { name: 'Cancelar' });
  });

  describe('render', () => {
    it('should render the form correctly', () => {
      const allButtons = screen.getAllByRole('button');
      const brandButton = allButtons[0];
      expect(brandButton).toBeInTheDocument();
      expect(modelInput).toBeInTheDocument();
      expect(yearInput).toBeInTheDocument();
      expect(valueInput).toBeInTheDocument();
      expect(cancelLink).toBeInTheDocument();
    });

    it('should render the registry button and heading when the registry route is used', () => {
      const registryHeading = screen.getByText('Cadastro de veículos');
      const registryButton = screen.getByRole('button', { name: 'Cadastrar' });
      expect(registryButton).toBeInTheDocument();
      expect(registryHeading).toBeInTheDocument();
    });

    it('should render the update button and heading when the update route is used', () => {
      cleanup();
      mockedLocationPathname = '/alteracao-veiculo';
      render(
        <MemoryRouter>
          <VehicleRegistry />
        </MemoryRouter>
      );
      const updateHeading = screen.getByText('Alteração de veículo');
      const updateButton = screen.getByRole('button', { name: 'Alterar' })
      expect(updateButton).toBeInTheDocument();
      expect(updateHeading).toBeInTheDocument();
    });

    it('should render the select options correctly based on the useBrands return', () => {
      const allButtons = screen.getAllByRole('button');
      const brandButton = allButtons[0];
      fireEvent.mouseDown(brandButton);
      const renderedOptions = screen.getAllByRole('option');
      expect(renderedOptions).toHaveLength(mockedBrands.length);
    });
  });

  describe('form functioning', () => {
    it('should send the data correctly to the update service when a user presses submit', () => {
      cleanup();
      const mockedUpdateService = jest.fn();
      mockedLocationPathname = `/alteracao-veiculo/${mockedVehicleId}`;
      useBrands.mockReturnValue({ brands: brandsParser(mockedBrands) });
      useVehicleRegistry.mockReturnValue({
        registerVehicle: jest.fn(),
        updateVehicle: mockedUpdateService,
      });
      const { getByRole, getAllByRole } = render(
        <MemoryRouter>
          <VehicleRegistry />
        </MemoryRouter>,
      );
      modelInput = getByRole('textbox', { name: 'Modelo' });
      yearInput = getByRole('spinbutton', { name: 'Ano' });
      valueInput = getByRole('spinbutton', { name: 'Preço' });
      const updateButton = getByRole('button', { name: 'Alterar' });
  
      const allButtons = getAllByRole('button');
      const brandButton = allButtons[0];
      fireEvent.mouseDown(brandButton);
      const options = getAllByRole('option');
      fireEvent.mouseDown(options[1]);
      options[1].click();
  
      fireEvent.change(modelInput, { target: { value: 'Fake car mock' } });
      fireEvent.focusOut(modelInput);
  
      fireEvent.change(yearInput, { target: { value: '2000' } });
      fireEvent.focusOut(yearInput);

      fireEvent.change(valueInput, { target: { value: '100000' } });
      fireEvent.focusOut(valueInput);

      const expectedForm = {
        vehicleId: mockedVehicleId,
        brand: { id: 32, nome: 'FIAT' },
        model: 'Fake car mock',
        year: '2000',
        value: '100000',
      };

      fireEvent.click(updateButton);
  
      expect(mockedUpdateService).toHaveBeenCalledWith(
        expectedForm.vehicleId,
        expectedForm.brand,
        expectedForm.model,
        expectedForm.year,
        expectedForm.value,
      );
    });

    it('should send the data correctly to the registry service when a user presses submit', () => {
      cleanup();
      const mockedRegisterVehicle = jest.fn();
      mockedLocationPathname = '/cadastro-veiculo';
      useBrands.mockReturnValue({ brands: brandsParser(mockedBrands) });
      useVehicleRegistry.mockReturnValue({
        registerVehicle: mockedRegisterVehicle,
        updateVehicle: jest.fn(),
      });
      const { getByRole, getAllByRole } = render(
        <MemoryRouter>
          <VehicleRegistry />
        </MemoryRouter>,
      );
      modelInput = getByRole('textbox', { name: 'Modelo' });
      yearInput = getByRole('spinbutton', { name: 'Ano' });
      valueInput = getByRole('spinbutton', { name: 'Preço' });
      const registryButton = getByRole('button', { name: 'Cadastrar' });
  
      const allButtons = getAllByRole('button');
      const brandButton = allButtons[0];
      fireEvent.mouseDown(brandButton);
      const options = getAllByRole('option');
      fireEvent.mouseDown(options[1]);
      options[1].click();
  
      fireEvent.change(modelInput, { target: { value: 'Fake car mock' } });
      fireEvent.focusOut(modelInput);
  
      fireEvent.change(yearInput, { target: { value: '2000' } });
      fireEvent.focusOut(yearInput);

      fireEvent.change(valueInput, { target: { value: '100000' } });
      fireEvent.focusOut(valueInput);

      const expectedForm = {
        brand: { id: 32, nome: 'FIAT' },
        model: 'Fake car mock',
        year: '2000',
        value: '100000',
      };

      fireEvent.click(registryButton);
  
      expect(mockedRegisterVehicle).toHaveBeenCalledWith(
        expectedForm.brand,
        expectedForm.model,
        expectedForm.year,
        expectedForm.value,
      );
    });

    it('should disable the registry button and render error when the modelInput is invalid', () => {
      fireEvent.change(modelInput, { target: { value: 'Fak' } });
      fireEvent.focusOut(modelInput);
  
      fireEvent.change(yearInput, { target: { value: '2000' } });
      fireEvent.focusOut(yearInput);

      fireEvent.change(valueInput, { target: { value: '100000' } });
      fireEvent.focusOut(valueInput);
  
      const registryButton = screen.getByRole('button', { name: 'Cadastrar' });
      const errorText = screen.getByText('Nome de modelo deve ter mais que 3 caracteres.');
      
      expect(registryButton).toBeDisabled();
      expect(errorText).toBeInTheDocument();
    });

    it('should disable the registry button and render error when the year is invalid', () => {
      fireEvent.change(modelInput, { target: { value: 'Fake car mock' } });
      fireEvent.focusOut(modelInput);
  
      fireEvent.change(yearInput, { target: { value: '2222' } });
      fireEvent.focusOut(yearInput);

      fireEvent.change(valueInput, { target: { value: '100000' } });
      fireEvent.focusOut(valueInput);
  
      const registryButton = screen.getByRole('button', { name: 'Cadastrar' });
      const errorText = screen.getByText('Ano deve ser válido.');
      
      expect(registryButton).toBeDisabled();
      expect(errorText).toBeInTheDocument();
    });

    it('should disable the registry button and render error when the value is invalid', () => {
      fireEvent.change(modelInput, { target: { value: 'Fake car mock' } });
      fireEvent.focusOut(modelInput);
  
      fireEvent.change(yearInput, { target: { value: '2012' } });
      fireEvent.focusOut(yearInput);

      fireEvent.change(valueInput, { target: { value: '4' } });
      fireEvent.focusOut(valueInput);
  
      const registryButton = screen.getByRole('button', { name: 'Cadastrar' });
      const errorText = screen.getByText('Valor deve ser maior que R$ 5000.');
      
      expect(registryButton).toBeDisabled();
      expect(errorText).toBeInTheDocument();
    });
  });
});
