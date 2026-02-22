import { describe, expect, it } from "vitest";
import { createDivision } from "../fleet-helper";

describe("createDivision", () => {
  describe("Default behavior", () => {
    const division = createDivision();

    it("creates a division of 1 ship", () => {
      expect(division).toHaveLength(1);
    });

    it("has a ship of length 1", () => {
      expect(division[0]).toHaveLength(1);
    });
  });
});
