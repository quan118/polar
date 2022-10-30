import { expect, test } from "vitest";
import { bytesToBase64 } from "@/utils/common";

test("should convert bytes to base64 correctly", () => {
  const bytes = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72];
  expect("iVBORw0KGgoAAAANSUg=").toEqual(bytesToBase64(bytes));
});
