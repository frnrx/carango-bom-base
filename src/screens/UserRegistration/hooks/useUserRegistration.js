import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { userRegistrationService } from '../services';
import { SnackBarContext } from '../../../contexts/snackbar';

const useUserRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addAlert } = useContext(SnackBarContext);

  const register = (email, password) => {
    setIsLoading(true);

    userRegistrationService(email, password)
      .then(() => {
        history.push('/usuarios');
      })
      .catch(() => {
        addAlert({ content: 'Não foi possível criar o usuário.', customSeverity: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, register };
};

export default useUserRegistration;
