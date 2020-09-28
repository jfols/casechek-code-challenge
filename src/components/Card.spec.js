import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/svelte";

import Card from "./Card.svelte";
import SlotTest from "./SlotTest.svelte";

test("renders slot inside Card", () => {
  const { getByText } = render(SlotTest, { props: { Component: Card } });

  expect(getByText("Hello World")).toBeInTheDocument();
});
