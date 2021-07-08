import { useState, useContext, useEffect } from 'react';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { getAllBrands, removeBrand } from '../../services';

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);

  const loadBrands = () => {
    getAllBrands()
      .then((data) => {
        setBrands(data);
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao carregar marcas!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteBrand = (brandId) => () => {
    removeBrand(brandId, userJWT)
      .then((removedBrand) => {
        const brandsWithoutRemovedBrand = brands.filter((brand) =>
          brand.id !== removedBrand.id
        );
        setBrands(brandsWithoutRemovedBrand);
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao excluir marca!', customSeverity: 'error' });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    loadBrands();
  }, []);

  return {brands, isLoading, deleteBrand};
};

export default useBrands;
