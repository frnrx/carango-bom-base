import React from 'react';

import { Typography, Card, CardContent, Grid, CircularProgress } from '@material-ui/core';

import useDashboard from './hooks/useDashboard';

const Dashboard = () => {
  const { dashboardInfo, isLoading } = useDashboard();

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Dashboard
      </Typography>
      {isLoading && <CircularProgress />}
      <Grid container spacing={6}>
        {
          dashboardInfo.map((brandInfo) => (
            <Grid item xs={6} data-testid="dashboard-card" key={brandInfo.brand}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" component="p">Marca:</Typography>
                  <Typography variant="h5" component="p" gutterBottom>{brandInfo.brand}</Typography>
                  <Typography variant="subtitle2" component="p">Qtd de veículos:</Typography>
                  <Typography variant="h5" component="p" gutterBottom>
                    {brandInfo.vehicleNumber}
                  </Typography>
                  <Typography variant="subtitle2" component="p">Valor total:</Typography>
                  <Typography variant="h5" component="p">R$ {brandInfo.totalValue}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </>
  );
};

export default Dashboard
