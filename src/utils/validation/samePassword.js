const samePasswordValidation = (password, confirmation) => {
  if (password === confirmation) {
    return {
      valid: true,
      message: "Coinciden",
    };
  }

  return {
    valid: false,
    message: "Deben coincidir",
  };
};

export default samePasswordValidation;
