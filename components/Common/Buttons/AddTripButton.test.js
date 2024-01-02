import AddTripButton from "./AddTripButton";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <>
        <AddTripButton />
      </>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
