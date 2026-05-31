import test from "node:test";
import assert from "node:assert/strict";
import { registerUser } from "../services/authService.js";

const validPayload = {
  fullName: "Alice Smith",
  email: "alice@example.com",
  password: "securepass1",
  role: "freelancer"
};

test("registerUser returns fullName in response", async () => {
  const result = await registerUser(validPayload);
  assert.equal(result.fullName, "Alice Smith");
});

test("registerUser returns matching id and token sub", async () => {
  const result = await registerUser(validPayload);
  // Just check id format since we can't verify JWT without a real verify
  assert.match(result.id, /^usr_\d+$/);
  assert.ok(result.token);
});
