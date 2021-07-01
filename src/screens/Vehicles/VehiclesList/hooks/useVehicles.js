import { useState, useEffect, useContext } from 'react';

import { SnackBarContext } from '../../../../contexts/snackbar';

import { getAllVehicles, removeVehicle } from '../../services';
import vehicleParser from '../vehicleParser';

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);

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

  const deleteVehicle = (vehicleId) => {
    removeVehicle(vehicleId);
  };

  useEffect(() => {
    setIsLoading(true);
    loadVehicles();
  }, []);

  return {vehicles, isLoading, deleteVehicle};
}

export default useVehicles;
