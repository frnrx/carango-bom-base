import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import columns from './columns';
import VehicleService from '../services';
import vehicleParser from './vehicleParser';
import Authentication from '../../../contexts/authentication';

const VehiclesList = () => {
  const { isLoggedIn } = useContext(Authentication);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const shouldDisableButtons = useMemo(() =>
    selectedVehicle && Object.keys(selectedVehicle).length === 0,
  [selectedVehicle]);

  const loadVehicles = () => {
    VehicleService.getAll()
      .then((data) => {
        setVehicles(vehicleParser(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteVehicle = () => {
    VehicleService.delete(selectedVehicle);
  };

  useEffect(() => {
    setIsLoading(true);
    loadVehicles();
  }, []);

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3" component="h2">
          Lista de veículos
        </Typography>
      </Box>
      <DataGrid
        columns={columns}
        rows={vehicles}
        loading={isLoading}
        onRowSelected={(gridSelection) => setSelectedVehicle(gridSelection.data)}
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
      />
      {isLoggedIn &&
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={deleteVehicle}
            disabled={shouldDisableButtons}
          >
            Excluir
          </Button>
          <Box mx={1}>
            <Button
              to={`alteracao-veiculo/${selectedVehicle.id}`}
              component={Link}
              variant="contained"
              color="primary"
              disabled={shouldDisableButtons}
            >
              Alterar
            </Button>
          </Box>
          <Button to="/cadastro-veiculo" component={Link} variant="contained" color="primary">
            Incluir
          </Button>
        </Box>
      }
    </>
  );
};

export default VehiclesList;
