import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import VehiclesList from '..';
import VehicleService from '../../services';
import mockedVehicles from './mockedVehicles';

jest.mock('../../services');

describe('<VehiclesList />', () => {
  it('should render the vehicles list correctly', async () => {
    VehicleService.getAll.mockImplementationOnce(() => Promise.resolve(mockedVehicles));
    render(<VehiclesList />);

    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(6));
  });
});
