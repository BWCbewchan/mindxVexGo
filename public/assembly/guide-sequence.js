// Recorded steps are cumulative. Never silently discard an earlier component.
export function sequenceIssue(steps) {
  let previous = new Set();
  for (let i = 0; i < steps.length; i++) {
    const parts = steps[i].parts;
    const current = new Set(parts.map(part => part.id));
    if ([...previous].some(id => !current.has(id)))
      return `Step ${i + 1} removes earlier parts. Record a cumulative assembly before exporting or changing the order.`;
    if (parts.some(part => part.mate?.target && !current.has(part.mate.target)))
      return `Step ${i + 1} contains an attachment without its target part.`;
    previous = current;
  }
  return null;
}
