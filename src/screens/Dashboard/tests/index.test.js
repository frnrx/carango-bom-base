import React from 'react';
import { render, screen } from '@testing-library/react';

import Dashboard from '..';
import useDashboard from '../hooks/useDashboard';

jest.mock('../hooks/useDashboard');

const mockedDashboardInfo = [
  {
    brand: 'Fake brand 1',
    vehicleNumber: 6,
    totalValue: 80000,
  },
  {
    brand: 'Fake brand 2',
    vehicleNumber: 3,
    totalValue: 55000,
  },
  {
    brand: 'Fake brand 3',
    vehicleNumber: 8,
    totalValue: 550000,
  },
  {
    brand: 'Fake brand 4',
    vehicleNumber: 1,
    totalValue: 5001,
  },
];

describe('<Dashboard />', () => {
  describe('rendering', () => {
    it('should render the VehiclesList component correctly', () => {
      useDashboard.mockReturnValue({
        dashboardInfo: mockedDashboardInfo,
        isLoading: false,
      });
      render(<Dashboard />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getAllByTestId('dashboard-card')).toHaveLength(4);
    });

    it('should render circularProgress component when the dashboardInfo is loading', () => {
      useDashboard.mockReturnValue({
        dashboardInfo: mockedDashboardInfo,
        isLoading: true,
      });
      render(<Dashboard />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
