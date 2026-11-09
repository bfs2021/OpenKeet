import { strict as assert } from "node:assert";
import test from "node:test";
import { syncSelectedSources } from "../src/selection.ts";

test("every document is selected the first time the list arrives", () => {
  const seen = new Set<string>();
  assert.deepEqual(syncSelectedSources([], ["resume", "job"], seen), ["resume", "job"]);
});

test("a newly added document is selected while an unticked one stays unticked", () => {
  const seen = new Set(["resume", "job"]);
  assert.deepEqual(syncSelectedSources(["job"], ["resume", "job", "notes"], seen), ["job", "notes"]);
});

test("re-rendering with the same documents does not re-select an unticked one", () => {
  const seen = new Set(["resume", "job"]);
  assert.deepEqual(syncSelectedSources(["job"], ["resume", "job"], seen), ["job"]);
});

test("a removed document leaves the selection", () => {
  const seen = new Set(["resume", "job"]);
  assert.deepEqual(syncSelectedSources(["resume", "job"], ["resume"], seen), ["resume"]);
});
