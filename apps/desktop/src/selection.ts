// Keeps the "Use these documents" ticks in step with the document list.
// New documents are ticked until the user unticks them, and a document the
// user unticked stays unticked when another document is added.
export function syncSelectedSources(current: string[], ids: string[], seen: Set<string>): string[] {
  const present = new Set(ids);
  const kept = current.filter(id => present.has(id));
  const added = ids.filter(id => !seen.has(id) && !kept.includes(id));
  for (const id of ids) seen.add(id);
  return [...kept, ...added];
}
