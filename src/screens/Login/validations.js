const validations = {
  username: (data) => {
    if (data && data.length >= 4) {
      return { valid: true, showError: false };
    }
    return { valid: false, text: 'Usuário deve ter ao menos 4 caracteres.', showError: true };
  },
  password: (data) => {
    if (data && data.length >= 6) {
      return { valid: true, showError: false };
    }
    return { valid: false, text: 'Senha deve ter ao menos 6 caracteres.', showError: true };
  },
};

export default validations;
