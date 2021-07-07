const validations = {
  brand: (data) => {
    if (data && data.length >= 3) {
      return { valid: true };
    }
    return { valid: false, text: 'Marca deve ter ao menos 3 letras.' };
  },
};

export default validations;
