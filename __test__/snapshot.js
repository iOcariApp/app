import renderer from "react-test-renderer";

const testSnapshot = component => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
};

export default testSnapshot;
