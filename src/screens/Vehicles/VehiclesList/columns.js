const columns = [
  {
    field: 'brand',
    headerName: 'Marca',
    flex: 1,
  },
  {
    field: 'model',
    headerName: 'Modelo',
    flex: 1,
    sortable: false,
  },
  {
    field: 'year',
    headerName: 'Ano',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => (value ? `${value}` : ''),
  },
  {
    field: 'value',
    headerName: 'Valor',
    type: 'number',
    flex: 1,
    valueFormatter: ({ value }) => (value ? `R$ ${value}` : ''),
  },
];

export default columns;
