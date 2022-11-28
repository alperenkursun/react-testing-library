import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

describe("Odev testleri", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Header render edildi mi?", () => {
    const header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  });

  test("Emoji listesi eksiksiz render edildi mi?", () => {
    const emojilistitems = screen.getAllByText(/Click to copy emoji/);
    expect(emojilistitems.length).toEqual(20);
  });

  test("Filtrelemeye uygun olarak render ediliyor mu?", () => {
    const emoji = "Yum";
    const textbox = screen.getByRole("textbox");
    userEvent.type(textbox, emoji);
    expect(screen.getByText(emoji)).toBeInTheDocument();
  });

  test("kopyalama işlemi gerçekleşti mi?", () => {
    const copy = screen.getAllByText("Click to copy emoji");
    const textbox = screen.getByRole("textbox");
    userEvent.click(copy);
    userEvent.paste(textbox, copy);
    expect(textbox.value == copy);
  });
});
