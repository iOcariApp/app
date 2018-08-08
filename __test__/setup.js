import { shallow } from "enzyme";

global.shallow = shallow;

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
