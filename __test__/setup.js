import { shallow } from "enzyme";
import testSnapshot from "./snapshot";

global.shallow = shallow;
global.testSnapshot = testSnapshot;

// Mock Animated library
jest.mock("Animated", () => {
  const ActualAnimated = require.requireActual("Animated");
  return {
    ...ActualAnimated,
    timing: (value, config) => ({
      start: callback => {
        value.setValue(config.toValue);
        if (callback) {
          callback();
        }
      },
    }),
  };
});
