import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UserDisplay } from "../generalUserInfo";

describe("test userDisplay suite", () => {
  it("should render properly", async () => {
    render(<UserDisplay />);
  });
});
