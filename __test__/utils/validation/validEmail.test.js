// from https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/

import { validEmail } from "utils/validation/validEmail";
import validEmailValidation from "utils/validation/validEmail";

const testEmailValid = email => {
  const result = validEmail(email);
  expect(result).toBe(true);
};

const testEmailInvalid = email => {
  const result = validEmail(email);
  expect(result).toBe(false);
};

describe("when a valid email is passed as the argument", () => {
  it("should return true", () => {
    testEmailValid("email@domain.com");
    testEmailValid("firstname.lastname@domain.com");
    testEmailValid("email@subdomain.domain.com");
    testEmailValid("firstname+lastname@domain.com");
    testEmailValid('"email"@domain.com');
    testEmailValid("1234567890@domain.com");
    testEmailValid("email@domain-one.com");
    testEmailValid("_______@domain.com");
    testEmailValid("email@domain.name");
    testEmailValid("email@domain.co.jp");
    testEmailValid("firstname-lastname@domain.com");
  });
});

describe("when an invalid email is passed as the argument", () => {
  it("should return false", () => {
    testEmailInvalid("plainaddress");
    testEmailInvalid("#@%^%#$@#$@#.com");
    testEmailInvalid("@domain.com");
    testEmailInvalid("Joe Smith <email@domain.com>");
    testEmailInvalid("email.domain.com");
    testEmailInvalid("email@domain@domain.com");
    testEmailInvalid(".email@domain.com");
    testEmailInvalid("email.@domain.com");
    testEmailInvalid("email..email@domain.com");
    testEmailInvalid("email@domain.com (Joe Smith)");
    testEmailInvalid("email@domain");
    testEmailInvalid("email@111.222.333.44444");
    testEmailInvalid("email@domain..com");
  });
});

describe("validation wrapper works", () => {
  test("valid emails output is correct", () => {
    const result = validEmailValidation("email@domain.com");
    expect(result).toEqual({
      valid: true,
      message: "Correcto",
    });
  });
  test("invalid emails output is correct", () => {
    const result = validEmailValidation("email@domain..com");
    expect(result).toEqual({
      valid: false,
      message: "Incorrecto",
    });
  });
});
