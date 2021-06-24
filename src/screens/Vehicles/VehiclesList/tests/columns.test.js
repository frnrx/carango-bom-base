import columns from '../columns';

const findColumnByFieldName = (field) => columns.find((column) => column.field === field);

describe('Vehicle lists columns value formatters', () => {
  describe('Value formatter', () => {
    it('should format the vehicle value correctly', () => {
      const vehicleValueFormatter = findColumnByFieldName('value').valueFormatter;
      const mockedValue = 8000;
      const expectedReturn = 'R$ 8000';
      expect(vehicleValueFormatter({ value: mockedValue })).toBe(expectedReturn);
    });

    it('should return an empty string if the value is empty', () => {
      const vehicleValueFormatter = findColumnByFieldName('value').valueFormatter;
      const expectedReturn = '';
      expect(vehicleValueFormatter({})).toBe(expectedReturn);
    });
  });

  describe('Year formatter', () => {
    it('should format the vehicle year correctly', () => {
      const vehicleYearFormatter = findColumnByFieldName('year').valueFormatter;
      const mockedYear = 1998;
      const expectedReturn = '1998';
      expect(vehicleYearFormatter({ value: mockedYear })).toBe(expectedReturn);
    });

    it('should return an empty string if the year is empty', () => {
      const vehicleYearFormatter = findColumnByFieldName('year').valueFormatter;
      const expectedReturn = '';
      expect(vehicleYearFormatter({})).toBe(expectedReturn);
    });
  });
});
