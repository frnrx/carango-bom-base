import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';

import columns from './columns';
import VehicleService from '../services';
import vehicleParser from './vehicleParser';

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVehicles = () => {
    VehicleService.getAll()
      .then((data) => {
        setVehicles(vehicleParser(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    loadVehicles();
  }, []);

  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={vehicles}
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      loading={isLoading}
    />
  );
};

export default VehiclesList;
