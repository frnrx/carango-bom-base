import { useState, useContext, useEffect } from 'react';

import { SnackBarContext } from '../../../../contexts/snackbar';
import { getAllUsers } from '../services';

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { addAlert } = useContext(SnackBarContext);

  const userJWT = localStorage.getItem('userJWT');

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

  useEffect(() => {
    setIsLoading(true);
    loadUsers();
  }, []);

  return { users, isLoading };
};

export default useUsers;
