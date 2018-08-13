export const availableNickname = nickname => {
  return nickname && true;
};

const availableNicknameValidation = nickname => {
  const valid = availableNickname(nickname);

  return {
    valid,
    message: valid ? "Disponible" : "No disponible",
  };
};

export default availableNicknameValidation;
