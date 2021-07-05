import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { registerVehicle } from '../../services';

const useVehicleRegistry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);
  const history = useHistory();

  const register = (brand, model, year, value) => {
    setIsLoading(true);
    registerVehicle(userJWT, brand, model, year, value)
      .then(() => {
        addAlert({ content: 'Veículo cadastrado corretamente!', customSeverity: 'success' });
        history.push('/');
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao registrar veículo!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { register, isLoading };
};

export default useVehicleRegistry;
