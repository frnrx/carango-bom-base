import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { AuthenticationContext } from '../../../contexts/authentication';

import useBrands from './hooks/useBrands';

const columns = [{ field: 'nome', headerName: 'Marca', width: 200 }];

const BrandsList = () => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { brands, isLoading, deleteBrand } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState({});
  const shouldDisableButtons = useMemo(
    () => selectedBrand && Object.keys(selectedBrand).length === 0,
  [selectedBrand]);
  const handleOnRowSelected = (selectedRow) => setSelectedBrand(selectedRow.data);

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3" component="h2">
          Lista de marcas
        </Typography>
      </Box>
      <DataGrid
        columns={columns}
        rows={brands}
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
            onClick={deleteBrand(selectedBrand.id)}
            disabled={shouldDisableButtons}
          >
            Excluir
          </Button>
          <Box mx={1}>
            <Button
              to={`alteracao-marca/${selectedBrand.id}`}
              component={Link}
              variant="contained"
              color="primary"
              disabled={shouldDisableButtons}
            >
              Alterar
            </Button>
          </Box>
          <Button to="/cadastro-marca" component={Link} variant="contained" color="primary">
            Incluir
          </Button>
        </Box>
      }      
    </>
  );
};

export default BrandsList;
