import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { SnackBarContext } from '../../../contexts/snackbar';
import { AuthenticationContext } from '../../../contexts/authentication';

import { getDashboard } from '../services';
import dashboardParser from './dashboardParser';

const useDashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert } = useContext(SnackBarContext);
  const { userJWT } = useContext(AuthenticationContext);
  const history = useHistory();

  const loadDashboard = () => {
    getDashboard(userJWT)
      .then((data) => {
        setDashboardInfo(dashboardParser(data));
      })
      .catch(() => {
        addAlert({
          content: 'Erro inesperado ao carregar informações do dashboard!',
          customSeverity: 'error',
        });
        history.push('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    loadDashboard();
  }, []);

  return { dashboardInfo, isLoading };
};

export default useDashboard;
