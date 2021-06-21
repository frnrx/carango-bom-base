import { useState } from 'react';

const createInitialState = (validations) => {
  const initialState = {};
  const validationKeys = Object.keys(validations);
  validationKeys.forEach((field) => {
    initialState[field] = { valid: true, text: '' };
  });

  return initialState;
};

const useErrors = (validations) => {
  const initialState = createInitialState(validations);

  const [errors, setErrors] = useState(initialState);

  const validateFields = (event) => {
    const { name, value } = event.target;
    const newState = { ...errors };
    newState[name] = validations[name](value);
    setErrors(newState);
  };

  const isFormValid = () => {
    const errosEntries = Object.entries(errors);
    return errosEntries.some((entry) => {
      const [, value] = entry;
      if (!value.valid) {
        return false;
      }
      return true;
    });
  };

  return [errors, validateFields, isFormValid];
};

export default useErrors;
