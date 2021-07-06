import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { updateVehicle } from '../../services';

const useVehicleUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);
  const history = useHistory();

  const update = (vehicleId, brand, model, year, value) => {
    setIsLoading(true);
    updateVehicle(userJWT, vehicleId, brand, model, year, value)
      .then(() => {
        addAlert({ content: 'Veículo atualizado corretamente!', customSeverity: 'success' });
        history.push('/');
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao atualizar veículo!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { update, isLoading };
};

export default useVehicleUpdate;
