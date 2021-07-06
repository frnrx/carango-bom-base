import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import useUsers from './hooks/useUsers';
import columns from './columns';

const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState({});

  const { users, isLoading, deleteUser } = useUsers();

  const shouldDisableButtons = useMemo(
    () => selectedUser && Object.keys(selectedUser).length === 0,
    [selectedUser],
  );

  const handleOnRowSelected = (selectedRow) => setSelectedUser(selectedRow.data);

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3" component="h2">
          Lista de usuários
        </Typography>
      </Box>
      <DataGrid
        columns={columns}
        rows={users}
        loading={isLoading}
        onRowSelected={handleOnRowSelected}
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={shouldDisableButtons}
          onClick={deleteUser(selectedUser.id)}
        >
          Excluir
        </Button>
        <Box mx={1}>
          <Button to="/cadastro-usuario" component={Link} variant="contained" color="primary">
            Criar novo usuário
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UsersList;
