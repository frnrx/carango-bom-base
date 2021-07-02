import { renderHook } from '@testing-library/react-hooks';
import { getAllBrands } from '../../../../Brands/services';

import useBrands from '../useBrands';
import brandsParser from '../../brandsParser';
import mockedBrands from './mockedBrands';

jest.mock('../../../../Brands/services');

describe('useBrands', () => {
  describe('getAllBrands handling', () => {
    it('should handle the getAllBrands correctly after the hook first useEffect', async () => {
      getAllBrands.mockImplementationOnce(() => Promise.resolve(mockedBrands));

      const { result, waitForNextUpdate } = renderHook(() => useBrands());
      await waitForNextUpdate();
      expect(result.current.brands).toEqual(brandsParser(mockedBrands));
    });

    it('should update isLoading to true at the start of the getAllBrands and to false after that',
      async () => {
        getAllBrands.mockImplementationOnce(() => Promise.resolve(mockedBrands));

        const { result, waitForNextUpdate } = renderHook(() => useBrands());
        expect(result.current.isLoading).toBeTruthy();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBeFalsy();
      }
    );
  });
});