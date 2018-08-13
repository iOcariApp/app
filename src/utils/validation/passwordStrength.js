export const passwordStrength = password => {
  const length = password.length;

  if (length <= 5) {
    return 0;
  } else if (length <= 8) {
    return 1;
  } else return 2;
};

const passwordStrengthValidation = password => {
  const strength = passwordStrength(password);

  let message = "Débil";
  if (strength === 1) message = "Regular";
  else if (strength === 2) message = "Fuerte";

  return {
    valid: true,
    message,
  };
};

export default passwordStrengthValidation;
