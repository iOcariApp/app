import React from "react";

import DimensionsHelper from "components/DimensionsHelper";

const width = 100;
const height = 100;
const children = noop;

const wrapper = shallow(<DimensionsHelper>{children}</DimensionsHelper>);

test("onLayout sets `width` & `height` state", () => {
  wrapper.instance().onLayout({ nativeEvent: { layout: { width, height } } });

  expect(wrapper.state("width")).toBe(height);
  expect(wrapper.state("height")).toBe(height);
});

test("calls children function with the proper arguments", () => {
  expect(children).toBeCalledWith(
    expect.objectContaining({
      width,
      height,
      onLayout: wrapper.instance().onLayout,
    })
  );
});
