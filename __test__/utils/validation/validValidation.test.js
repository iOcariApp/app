import validValidation from "utils/validation/validValidation";

test("wrapper output is correct", () => {
  const result = validValidation("whatever");
  expect(result).toEqual({
    valid: true,
    message: "",
  });
});
