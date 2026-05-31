import test from "node:test";
import assert from "node:assert/strict";
import { createNotification, listNotifications } from "../services/notificationService.js";

test("createNotification preserves server-generated id", async () => {
  const result = await createNotification({ id: "ntf_evil", type: "test" });
  assert.notEqual(result.id, "ntf_evil");
  assert.match(result.id, /^ntf_\d+$/);
});

test("createNotification always starts with read: false", async () => {
  const result = await createNotification({ read: true, type: "test" });
  assert.equal(result.read, false);
});

test("createNotification merges legitimate payload fields", async () => {
  const result = await createNotification({ type: "new_message", userId: "usr_123" });
  assert.equal(result.type, "new_message");
  assert.equal(result.userId, "usr_123");
});
