const brandsParser = (brands) =>
  brands.map((brand) => ({
    label: brand.nome,
    value: { id: brand.id, name: brand.nome }
  }));

export default brandsParser;
