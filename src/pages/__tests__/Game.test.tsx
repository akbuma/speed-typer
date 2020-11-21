import React from "react";
import renderer from "react-test-renderer";
import Game from "../Game";

describe("Game Class", () => {
  it("renders correct styles", () => {
    //@ts-ignore
    const tree = renderer.create(<Game />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
