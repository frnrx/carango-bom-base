import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { AuthenticationContext } from '../../../contexts/authentication';
import useVehicles from './hooks/useVehicles';
import columns from './columns';

const VehiclesList = () => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { vehicles, isLoading, deleteVehicle } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const shouldDisableButtons = useMemo(() =>
    selectedVehicle && Object.keys(selectedVehicle).length === 0,
  [selectedVehicle]);
  const handleOnRowSelected = (selectedRow) => setSelectedVehicle(selectedRow.data);

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
        onRowSelected={handleOnRowSelected}
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
            onClick={deleteVehicle(selectedVehicle.id)}
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
