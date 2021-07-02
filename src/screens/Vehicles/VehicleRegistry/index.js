import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { AuthenticationContext } from '../../../contexts/authentication';
import FormButton from '../../../components/FormButton';

import useBrands from './hooks/useBrands';
import useVehicleRegistry from './hooks/useVehicleRegistry';

const VehicleRegistry = () => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { brands } = useBrands();
  const { pathname } = useLocation();
  const history = useHistory();
  const { registerVehicle } = useVehicleRegistry();
  const [brand, setBrand] = React.useState({});
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState();
  const [value, setValue] = React.useState();

  const isRegistryMode = pathname.includes('/cadastro-veiculo');
  const isUpdateMode = pathname.includes('/alteracao-veiculo');

  const handleBrandChange = (event) => setBrand(event.target.value);
  const handleModelChange = (event) => setModel(event.target.value);
  const handleYearChange = (event) => setYear(event.target.value);
  const handleValueChange = (event) => setValue(event.target.value);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    registerVehicle(brand, model, year, value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3" component="h2">
          {isRegistryMode && 'Cadastro de veículos'}
          {isUpdateMode && 'Alteração de veículos'}
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
              data-testid="select-brand"
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
              fullWidth
              required
            />
          </Grid>
          <Grid container item xs={8}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="value">Preço</InputLabel>
              <OutlinedInput
                id="value"
                type="number"
                value={9000}
                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                labelWidth={42}
                aria-describedby="value-helper-text"
                onChange={handleValueChange}
                required
              />
              <FormHelperText id="value-helper-text">Some important helper text</FormHelperText>
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
              >
                Cadastrar
              </FormButton>
            }
            {isUpdateMode &&
              <FormButton
                color="primary"
                type="submit"
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
