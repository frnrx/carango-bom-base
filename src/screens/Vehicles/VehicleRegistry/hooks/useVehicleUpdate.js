import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

import { updateVehicle, getVehicle } from '../../services';

const useVehicleUpdate = (vehicleId, setters) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);
  const history = useHistory();

  const update = (id, brand, model, year, value) => {
    setIsUpdateLoading(true);
    updateVehicle(userJWT, id, brand, model, year, value)
      .then(() => {
        addAlert({ content: 'Veículo atualizado corretamente!', customSeverity: 'success' });
        history.push('/');
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao atualizar veículo!', customSeverity: 'error' });
      })
      .finally(() => {
        setIsUpdateLoading(false);
      });
  };

  const loadVehicle = (id) => {
    setIsGetLoading(true);
    getVehicle(id, userJWT)
      .then((data) => {
        setters.setBrand({
          id: data.marca.id,
          name: data.marca.nome,
        });
        setters.setModel(data.modelo);
        setters.setYear(data.ano);
        setters.setValue(data.preco);
      })
      .catch(() => {
        addAlert({
          content: 'Erro inesperado ao carregar informações do veículo!',
          customSeverity: 'error',
        });
        history.push('/');
      })
      .finally(() => {
        setIsGetLoading(false);
      });
  };

  useEffect(() => {
    if (vehicleId) {
      loadVehicle(vehicleId);
    }
  }, []);

  return { update, isUpdateLoading, isGetLoading };
};

export default useVehicleUpdate;
