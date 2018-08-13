import { passwordStrength } from "utils/validation/passwordStrength";
import passwordStrengthValidation from "utils/validation/passwordStrength";

const testLowStrength = password => {
  const strength = passwordStrength(password);
  expect(strength).toBe(0);
};

const testMediumStrength = password => {
  const strength = passwordStrength(password);
  expect(strength).toBe(1);
};

const testHighStrength = password => {
  const strength = passwordStrength(password);
  expect(strength).toBe(2);
};

describe("when a password is passed as the argument", () => {
  describe("when a low strength is passed", () => {
    it("should return 0", () => {
      testLowStrength("a");
      testLowStrength("ab");
      testLowStrength("abc");
      testLowStrength("abcd");
      testLowStrength("abcde");
    });
  });

  describe("when a medium strength is passed", () => {
    it("should return 1", () => {
      testMediumStrength("abcdef");
      testMediumStrength("abcdefg");
      testMediumStrength("abcdefgh");
    });
  });

  describe("when a high strength is passed", () => {
    it("should return 2", () => {
      testHighStrength("abcdefghi");
      testHighStrength("abcdefghij");
      testHighStrength("abcdefghijk");
    });
  });
});

describe("validation wrapper works", () => {
  test("low strength output is correct", () => {
    const result = passwordStrengthValidation("a");
    expect(result).toEqual({
      valid: true,
      message: "Débil",
    });
  });

  test("medium strength output is correct", () => {
    const result = passwordStrengthValidation("abcdef");
    expect(result).toEqual({
      valid: true,
      message: "Regular",
    });
  });

  test("high strength output is correct", () => {
    const result = passwordStrengthValidation("abcdefghi");
    expect(result).toEqual({
      valid: true,
      message: "Fuerte",
    });
  });
});
