import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  Grid,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import FormButton from '../../../components/FormButton';
import useErrors from '../../../hooks/useErrors';

import useBrands from './hooks/useBrands';
import useVehicleRegistry from './hooks/useVehicleRegistry';
import useVehicleUpdate from './hooks/useVehicleUpdate';
import validations from './validations';

const VehicleRegistry = () => {
  const { brands } = useBrands();
  const { pathname } = useLocation();
  const { vehicleId } = useParams();
  const { register: registerVehicle, isLoading: isRegisterLoading } = useVehicleRegistry();
  const { update: updateVehicle } = useVehicleUpdate();
  const [brand, setBrand] = React.useState({});
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState();
  const [value, setValue] = React.useState();
  const [errors, validateFields, isFormValid] = useErrors(validations);

  const isRegistryMode = pathname.includes('/cadastro-veiculo');
  const isUpdateMode = pathname.includes('/alteracao-veiculo');

  const handleBrandChange = (event) => setBrand(event.target.value);
  const handleModelChange = (event) => setModel(event.target.value);
  const handleYearChange = (event) => setYear(event.target.value);
  const handleValueChange = (event) => setValue(event.target.value);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (isRegistryMode) {
      registerVehicle(brand, model, year, value);
    } else if (isUpdateMode) {
      updateVehicle(vehicleId, brand, model, year, value);
    }
  };

  return (
    <>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" component="h2">
          {isRegistryMode && 'Cadastro de veículos'}
          {isUpdateMode && 'Alteração de veículo'}
        </Typography>
      </Box>
      <form onSubmit={handleOnSubmit}>
        <Grid container direction="column" spacing={2} alignContent="center">
          <Grid container item xs={8}>
            <TextField
              id="brands"
              label="Marca"
              value={brand}
              onChange={handleBrandChange}
              variant="outlined"
              select
              fullWidth
              required
            >
              {brands.map((option) => (
                <MenuItem key={option.value.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container item xs={8}>
            <TextField
              id="model"
              label="Modelo"
              type="text"
              name="model"
              role="textbox"
              variant="outlined"
              onChange={handleModelChange}
              onBlur={validateFields}
              helperText={errors.model.text}
              error={errors.model.showError}
              fullWidth
              required
            />
          </Grid>
          <Grid container item xs={8}>
            <TextField
              id="year"
              label="Ano"
              type="number"
              name="year"
              variant="outlined"
              onChange={handleYearChange}
              onBlur={validateFields}
              helperText={errors.year.text}
              error={errors.year.showError}
              fullWidth
              required
            />
          </Grid>
          <Grid container item xs={8}>
            <FormControl fullWidth variant="outlined">
              <InputLabel error={errors.value.showError} htmlFor="value">Preço</InputLabel>
              <OutlinedInput
                id="value"
                name="value"
                type="number"
                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                labelWidth={42}
                aria-describedby="value-helper-text"
                onBlur={validateFields}
                onChange={handleValueChange}
                error={errors.value.showError}
                required
              />
              {errors.value.showError &&
                <FormHelperText id="value-helper-text" error>{errors.value.text}</FormHelperText>
              }
            </FormControl>
          </Grid>
          <Grid item container justify="space-between" xs={8}>
            <FormButton to="/usuarios" isLink>
              Cancelar
            </FormButton>
            {isRegistryMode &&
              <FormButton
                color="primary"
                type="submit"
                disabled={!isFormValid()}
              >
                {isRegisterLoading ? <CircularProgress /> : 'Cadastrar'}
              </FormButton>
            }
            {isUpdateMode &&
              <FormButton
                color="primary"
                type="submit"
                disabled={!isFormValid()}
              >
                Alterar
              </FormButton>
            }
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default VehicleRegistry;
