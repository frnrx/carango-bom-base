const validations = {
  email: (data) => {
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    if (data && emailRegex.test(data)) {
      return { valid: true, showError: false };
    }
    return { valid: false, text: 'E-mail inválido.', showError: true };
  },
  password: (data) => {
    if (data && data.length >= 6) {
      return { valid: true, showError: false };
    }
    return { valid: false, text: 'Senha deve ter ao menos 6 caracteres.', showError: true };
  },
  passwordConfirmation: (data) => {
    if (data) {
      return { valid: true, showError: false };
    }

    return { valid: false, text: 'As duas senhas devem ser iguais.', showError: true };
  },
};

export default validations;
