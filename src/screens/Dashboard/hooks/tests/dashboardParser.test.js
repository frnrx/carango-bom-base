import dashboardParser from '../dashboardParser';

const mockedDashboardServiceGetReturn = [
  {
    nomeMarca: 'FORD',
    qtdeVeiculos: 6,
    valorTotalVeiculos: 80000,
  },
  {
    nomeMarca: 'FIAT',
    qtdeVeiculos: 3,
    valorTotalVeiculos: 55000,
  },
];

describe('dashboardParser', () => {
  it('should parse the dashboard get service return correctly', () => {
    const expectedReturn = [
      {
        brand: 'FORD',
        vehicleNumber: 6,
        totalValue: 80000,
      },
      {
        brand: 'FIAT',
        vehicleNumber: 3,
        totalValue: 55000,
      },
    ];
    expect(dashboardParser(mockedDashboardServiceGetReturn)).toEqual(expectedReturn);
  });

  it('should set vehicleNumber and totalValue to zero if the service doesnt return them', () => {
    const mockedEmptyDashboardServiceGetReturn = [{ nomeMarca: 'FORD' }];

    const expectedReturn = [
      {
        brand: 'FORD',
        vehicleNumber: 0,
        totalValue: 0,
      },
    ];
    expect(dashboardParser(mockedEmptyDashboardServiceGetReturn)).toEqual(expectedReturn);
  });
});
