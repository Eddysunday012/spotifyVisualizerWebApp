import { describe, it, expect } from "vitest";
import { getAccessToken } from "../spotify";

describe("testing spotify logic functionality", () => {
  it("should return a string", async () => {
    const token = await getAccessToken();
    expect(token).toBe("hello world");
  });
});
