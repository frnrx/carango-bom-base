import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { updateBrand, getBrand } from '../../services';

const useBrandUpdate = (brandId, setBrand) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);
  const history = useHistory();

  const update = (brand) => {
    setIsUpdateLoading(true);
    updateBrand(userJWT, brandId, brand)
      .then(() => {
        addAlert({ content: 'Marca atualizada corretamente!', customSeverity: 'success' });
        history.push('/marcas');
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao atualizar marca!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsUpdateLoading(false);
      });
  };

  const loadBrand = () => {
    setIsGetLoading(true);
    getBrand(brandId, userJWT)
      .then((data) => {
        setBrand(data.nome);
      })
      .catch(() => {
        addAlert({
          content: 'Erro inesperado ao carregar informações da marca!',
          customSeverity: 'error',
        });
        history.push('/marcas');
      })
      .finally(() => {
        setIsGetLoading(false);
      });
  };

  useEffect(() => {
    if (brandId) {
      loadBrand();
    }
  }, [brandId]);

  return { update, isUpdateLoading, isGetLoading };
};

export default useBrandUpdate;
