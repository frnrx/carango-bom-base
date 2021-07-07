import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  TextField,
  Typography,
  Box,
  Grid,
  CircularProgress
} from '@material-ui/core';

import useErrors from '../../../hooks/useErrors';
import FormButton from '../../../components/FormButton';

import useBrandRegistry from './hooks/useBrandRegistry';
import useBrandUpdate from './hooks/useBrandUpdate';
import validations from './validations';

const BrandRegistry = () => {
  const { pathname } = useLocation();
  const { brandId } = useParams();
  const [brand, setBrand] = React.useState('');
  const { register: registerBrand, isLoading: isRegisterLoading } = useBrandRegistry();
  const { update: updateBrand, isUpdateLoading, isGetLoading } = useBrandUpdate(brandId, setBrand);
  const [errors, validateFields, isFormValid] = useErrors(validations);
  const shouldDisableRegistryButton = !isFormValid() || isRegisterLoading;
  const shouldDisableUpdateButton = !isFormValid() || isUpdateLoading;

  const isRegistryMode = pathname.includes('/cadastro-marca');
  const isUpdateMode = pathname.includes('/alteracao-marca');

  const handleBrandChange = (event) => setBrand(event.target.value);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (isRegistryMode) {
      registerBrand(brand);
    } else if (isUpdateMode) {
      updateBrand(brandId, brand);
    }
  };

  return (
    <>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" component="h2">
          {isRegistryMode && 'Cadastro de marcas'}
          {isUpdateMode && 'Alteração de marca'}
        </Typography>
        {isGetLoading && <CircularProgress />}
      </Box>
      <form onSubmit={handleOnSubmit}>
        <Grid container direction="column" spacing={2} alignContent="center">
          <Grid container item xs={8}>
            <TextField
              onChange={handleBrandChange}
              onBlur={validateFields}
              helperText={errors.brand.text}
              error={errors.brand.showError}
              name="brand"
              id="brand"
              label="Marca"
              type="text"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item container justify="space-between" xs={8}>
            <FormButton to="/marcas" isLink>
              Cancelar
            </FormButton>
            {isRegistryMode &&
              <FormButton
                color="primary"
                type="submit"
                disabled={shouldDisableRegistryButton}
              >
                {isRegisterLoading ? <CircularProgress /> : 'Cadastrar'}
              </FormButton>
            }
            {isUpdateMode &&
              <FormButton
                color="primary"
                type="submit"
                disabled={shouldDisableUpdateButton}
              >
                {isUpdateLoading ? <CircularProgress /> : 'Alterar'}
              </FormButton>
            }
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default BrandRegistry;
