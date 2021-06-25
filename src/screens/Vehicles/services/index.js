const VehicleService = {
  async getAll() {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos').then((r) => r.json());
  },
  delete() {
    return true;
  }
};

export default VehicleService;
