import vehicleParser from '../vehicleParser';

const mockedVehiclesServiceGetAllReturn = [
  { id: 134, modelo: 'KA 123456', ano: 2021, valor: 80000.0, marca: { id: 34, nome: 'FORD' } },
  { id: 154, modelo: 'teste', ano: 2000, valor: 10000.0, marca: { id: 34, nome: 'FIAT' } },
];

describe('vehicleParser', () => {
  it('should parse the vehicles get all service return correctly', () => {
    const expectedReturn = [
      {
        id: 134,
        model: 'KA 123456',
        year: 2021,
        value: 80000,
        brand: 'FORD',
      },
      {
        id: 154,
        model: 'teste',
        year: 2000,
        value: 10000,
        brand: 'FIAT',
      },
    ];
    expect(vehicleParser(mockedVehiclesServiceGetAllReturn)).toEqual(expectedReturn);
  });
});
