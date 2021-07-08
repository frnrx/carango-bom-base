import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { userRegistrationService } from '../services';
import { SnackBarContext } from '../../../../contexts/snackbar';
import { AuthenticationContext } from '../../../../contexts/authentication';

const useUserRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);

  const register = (name, email, password) => {
    setIsLoading(true);

    userRegistrationService(name, email, password, userJWT)
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
