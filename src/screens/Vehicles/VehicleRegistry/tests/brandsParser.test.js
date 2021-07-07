import brandsParser from '../brandsParser';

const mockedBrandsServiceGetAllReturn = [
  { id: 34, nome: 'FORD' },
  { id: 32, nome: 'FIAT' },
];

describe('brandsParser', () => {
  it('should parse the brands get all service return correctly', () => {
    const expectedReturn = [
      {
        label: 'FORD',
        value: { id: 34, name: 'FORD' },
      },
      {
        label: 'FIAT',
        value: { id: 32, name: 'FIAT' },
      },
    ];
    expect(brandsParser(mockedBrandsServiceGetAllReturn)).toEqual(expectedReturn);
  });
});
