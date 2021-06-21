import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Fab } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';

import BrandService from '../services';
import useStyles from './styles';

const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState();
  const classes = useStyles();
  const history = useHistory();

  const loadBrands = () => {
    BrandService.getAll().then((data) => setBrands(data));
  };

  const change = () => {
    history.push(`/alteracao-marca/${selectedBrand.id}`);
  };

  const remove = () => {
    BrandService.remove(selectedBrand).then(() => {
      setSelectedBrand(null);
      loadBrands();
    });
  };

  useEffect(() => loadBrands(), []);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={brands}
        columns={colunas}
        onRowSelected={(gridSelection) => setSelectedBrand(gridSelection.data)}
      />

      <div className={classes.actionsToolbar}>
        <Button
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!selectedBrand}
          onClick={() => remove()}
        >
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!selectedBrand}
          onClick={() => change()}
        >
          Alterar
        </Button>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push('/cadastro-marca')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default BrandsList;
