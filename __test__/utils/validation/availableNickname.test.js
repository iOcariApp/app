import { availableNickname } from "utils/validation/availableNickname";
import availableNicknameValidation from "utils/validation/availableNickname";

const testAvailableNickname = nickname => {
  const result = availableNickname(nickname);
  expect(result).toBe(true);
};

describe("when a available nickname is passed as the argument", () => {
  it("should return true", () => {
    testAvailableNickname("enzo_ferey");
  });
});

describe("validation wrapper works", () => {
  test("available nicknames output is correct", () => {
    const result = availableNicknameValidation("enzo_ferey");
    expect(result).toEqual({
      valid: true,
      message: "Disponible",
    });
  });
});
