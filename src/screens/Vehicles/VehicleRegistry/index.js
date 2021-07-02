import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { AuthenticationContext } from '../../../contexts/authentication';
import FormButton from '../../../components/FormButton';

import useBrands from './hooks/useBrands';

const VehicleRegistry = () => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { brands } = useBrands();
  const { pathname } = useLocation();
  const history = useHistory();
  const [selectedBrand, setSelectedBrand] = React.useState({});
  const isRegistryMode = pathname.includes('/cadastro-veiculo');
  const isUpdateMode = pathname.includes('/alteracao-veiculo');

  const handleChange = (event) => {
    setSelectedBrand(event.target.value);
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
      <form>
        <Grid container direction="column" spacing={2} alignContent="center">
          <Grid container item xs={8}>
            <TextField
              fullWidth
              required
              id="brands"
              select
              label="Marca"
              value={selectedBrand}
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
              }}
            >
              {brands.map((option) => (
                <option key={option.value.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid container item xs={8}>
            <TextField
              fullWidth
              required
              id="model"
              label="Modelo"
              type="text"
              name="model"
              role="textbox"
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={8}>
            <TextField
              fullWidth
              required
              id="year"
              label="Ano"
              type="number"
              name="year"
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={8}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="value">Preço</InputLabel>
              <OutlinedInput
                id="value"
                type="number"
                required
                value={9000}
                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                labelWidth={42}
              />
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
