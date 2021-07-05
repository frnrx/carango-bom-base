const brandsParser = (brands) =>
  brands.map((brand) => ({
    label: brand.nome,
    value: { id: brand.id, nome: brand.nome }
  }));

export default brandsParser;
