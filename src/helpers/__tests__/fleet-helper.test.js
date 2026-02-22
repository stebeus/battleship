import { describe, expect, it } from "vitest";

describe("createDivision", () => {
  describe("Default behavior", () => {
    it("creates a division of 1 ship", () => {
      expect(division).toHaveLength(1);
    });

    it("has a ship of length 1", () => {
      expect(division[0]).toHaveLength(1);
    });
  });
});
