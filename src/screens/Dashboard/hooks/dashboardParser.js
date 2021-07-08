const dashboardParser = (dashboard) =>
  dashboard.map((dashboardBrandInfo) => ({
    brand: dashboardBrandInfo.nomeMarca,
    vehicleNumber: dashboardBrandInfo.qtdeVeiculos || 0,
    totalValue: dashboardBrandInfo.valorTotalVeiculos || 0,
  }));

export default dashboardParser;

