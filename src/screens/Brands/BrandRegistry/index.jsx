import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useErrors from '../../../hooks/useErrors';
import BrandService from '../services';

const BrandRegistry = () => {
  const [brand, setBrand] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const validations = {
    brand: (data) => {
      if (data && data.length >= 3) {
        return { valid: true };
      }
      return { valid: false, text: 'Marca deve ter ao menos 3 letras.' };
    },
  };

  const [errors, validateFields, isFormValid] = useErrors(validations);

  const handleCancel = () => {
    history.goBack();
  };

  // TODO: Avaliar remover disable na próxima linha
  useEffect(() => {
    if (id) {
      BrandService.get(id).then((m) => setBrand(m.name));
    }
  }, [id]); // eslint-disable-line

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (isFormValid()) {
          if (id) {
            BrandService.update({ id, name: brand }).then(() => {
              history.goBack();
            });
          } else {
            BrandService.register({ name: brand }).then(() => {
              setBrand('');
              history.goBack();
            });
          }
        }
      }}
    >
      <TextField
        value={brand}
        onChange={(evt) => setBrand(evt.target.value)}
        onBlur={validateFields}
        helperText={errors.brand.text}
        error={!errors.brand.valid}
        name="brand"
        id="brand"
        label="Marca"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <Button variant="contained" color="primary" type="submit" disabled={!isFormValid()}>
        {id ? 'Alterar' : 'Cadastrar'}
      </Button>

      <Button variant="contained" color="secondary" onClick={handleCancel}>
        Cancelar
      </Button>
    </form>
  );
};

export default BrandRegistry;
