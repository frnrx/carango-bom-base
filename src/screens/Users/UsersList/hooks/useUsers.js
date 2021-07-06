import { useState, useContext, useEffect } from 'react';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';
import { getAllUsers, removeUser } from '../services';

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { addAlert } = useContext(SnackBarContext);

  const { userJWT } = useContext(AuthenticationContext);

  const loadUsers = () => {
    getAllUsers(userJWT)
      .then((data) => setUsers(data))
      .catch(() => {
        addAlert({
          content: 'Erro inesperado ao carregar usuários!',
          customSeverity: 'error',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteUser = (vehicleId) => () => {
    removeUser(vehicleId, userJWT)
      .then((removedVehicle) => {
        const vehiclesWithoutRemovedVehicle = users.filter((user) => user.id !== removedVehicle.id);
        setUsers(vehiclesWithoutRemovedVehicle);
      })
      .catch(() => {
        addAlert({ content: 'Erro inesperado ao excluir usuário!', customSeverity: 'error' });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    loadUsers();
  }, []);

  return { users, isLoading, deleteUser };
};

export default useUsers;
