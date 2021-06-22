import { useState } from 'react';

const createInitialState = (validations) => {
  const initialState = {};
  const validationKeys = Object.keys(validations);
  validationKeys.forEach((field) => {
    initialState[field] = { valid: false, text: '', showError: false };
  });

  return initialState;
};

const useErrors = (validations) => {
  const initialState = createInitialState(validations);

  const [errors, setErrors] = useState(initialState);

  const validateFields = (event) => {
    const { name, value } = event.target;
    const newState = { ...errors };
    console.log(`newState[name]`, newState[name]);
    newState[name] = validations[name](value);
    setErrors(newState);
  };

  const isFormValid = () => {
    const errosEntries = Object.entries(errors);

    return !errosEntries.some((entry) => {
      const [, value] = entry;

      return value.valid === false;
    });
  };

  return [errors, validateFields, isFormValid];
};

export default useErrors;
