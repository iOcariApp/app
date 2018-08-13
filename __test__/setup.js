import { shallow } from "enzyme";
import testSnapshot from "./snapshot";

// Mock function used whenever call count doesn't matter
const noop = jest.fn();

global.shallow = shallow;
global.testSnapshot = testSnapshot;
global.noop = noop;

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
