// from https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/

import validEmail from "utils/validEmail";

describe("when a valid email is passed as the argument", () => {
  it("should return true", () => {
    let result = validEmail("email@domain.com");
    expect(result).toBe(true);

    result = validEmail("firstname.lastname@domain.com");
    expect(result).toBe(true);

    result = validEmail("email@subdomain.domain.com");
    expect(result).toBe(true);

    result = validEmail("firstname+lastname@domain.com");
    expect(result).toBe(true);

    result = validEmail('"email"@domain.com');
    expect(result).toBe(true);

    result = validEmail("1234567890@domain.com");
    expect(result).toBe(true);

    result = validEmail("email@domain-one.com");
    expect(result).toBe(true);

    result = validEmail("_______@domain.com");
    expect(result).toBe(true);

    result = validEmail("email@domain.name");
    expect(result).toBe(true);

    result = validEmail("email@domain.co.jp");
    expect(result).toBe(true);

    result = validEmail("firstname-lastname@domain.com");
    expect(result).toBe(true);
  });
});

describe("when an invalid email is passed as the argument", () => {
  it("should return false", () => {
    let result = validEmail("plainaddress");
    expect(result).toBe(false);

    result = validEmail("#@%^%#$@#$@#.com");
    expect(result).toBe(false);

    result = validEmail("@domain.com");
    expect(result).toBe(false);

    result = validEmail("Joe Smith <email@domain.com>");
    expect(result).toBe(false);

    result = validEmail("email.domain.com");
    expect(result).toBe(false);

    result = validEmail("email@domain@domain.com");
    expect(result).toBe(false);

    result = validEmail(".email@domain.com");
    expect(result).toBe(false);

    result = validEmail("email.@domain.com");
    expect(result).toBe(false);

    result = validEmail("email..email@domain.com");
    expect(result).toBe(false);

    result = validEmail("email@domain.com (Joe Smith)");
    expect(result).toBe(false);

    result = validEmail("email@domain");
    expect(result).toBe(false);

    result = validEmail("email@111.222.333.44444");
    expect(result).toBe(false);

    result = validEmail("email@domain..com");
    expect(result).toBe(false);
  });
});
