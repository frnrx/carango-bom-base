import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { registerBrand } from '../../services';

const useBrandRegistry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);
  const history = useHistory();

  const register = (brand) => {
    setIsLoading(true);
    registerBrand(userJWT, brand)
      .then(() => {
        addAlert({ content: 'Marca cadastrada corretamente!', customSeverity: 'success' });
        history.push('/marcas');
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao cadastrar marca!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { register, isLoading };
};

export default useBrandRegistry;