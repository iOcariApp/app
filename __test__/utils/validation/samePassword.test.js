import samePasswordValidation from "utils/validation/samePassword";

describe("validation wrapper works", () => {
  test("same passwords output is correct", () => {
    const result = samePasswordValidation("mypassword", "mypassword");
    expect(result).toEqual({
      valid: true,
      message: "Coinciden",
    });
  });
  test("different passwords output is correct", () => {
    const result = samePasswordValidation("mypassword", "mypassword2");
    expect(result).toEqual({
      valid: false,
      message: "Deben coincidir",
    });
  });
});
