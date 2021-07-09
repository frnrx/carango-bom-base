const currentYear = new Date().getFullYear();

const validations = {
  model: (data) => {
    if (data && data.length > 3) {
      return { valid: true, showError: false };
    }
    return {
      valid: false,
      text: 'Nome de modelo deve ter mais que 3 caracteres.',
      showError: true,
    };
  },
  year: (data) => {
    if (data && Number(data) > 1800 && Number(data) <= currentYear + 1) {
      return { valid: true, showError: false };
    }
    return {
      valid: false,
      text: 'Ano deve ser válido.',
      showError: true,
    };
  },
  value: (data) => {
    if (data && Number(data) > 5000) {
      return { valid: true, showError: false };
    }
    return {
      valid: false,
      text: 'Valor deve ser maior que R$ 5000.',
      showError: true,
    };
  },
};

export default validations;
