import { useState, useEffect, useContext } from 'react';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { getAllVehicles, removeVehicle } from '../../services';
import vehicleParser from '../vehicleParser';

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);

  const loadVehicles = () => {
    getAllVehicles()
      .then((data) => {
        setVehicles(vehicleParser(data));
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao carregar veículos!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteVehicle = (vehicleId) => () => {
    removeVehicle(vehicleId, userJWT)
      .then((removedVehicle) => {
        const vehiclesWithoutRemovedVehicle = vehicles.filter((vehicle) =>
          vehicle.id !== removedVehicle.id
        );
        setVehicles(vehiclesWithoutRemovedVehicle);
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao excluir veículo!', customSeverity: 'error' });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    loadVehicles();
  }, []);

  return {vehicles, isLoading, deleteVehicle};
}

export default useVehicles;
