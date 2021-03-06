const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validEmail = email => emailRegex.test(email);

const validEmailValidation = email => {
  const valid = validEmail(email);
  return {
    valid,
    message: valid ? "Correcto" : "Incorrecto",
  };
};

export default validEmailValidation;
