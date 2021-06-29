const vehicleParser = (vehicles) =>
  vehicles.map((vehicle) => ({
    id: vehicle.id,
    brand: vehicle.marca.nome,
    year: vehicle.ano,
    value: vehicle.valor,
    model: vehicle.modelo,
  }));

export default vehicleParser;
