export function generateFreeStyleProjectName(): string {
  return `job-${Math.random()
    .toString(36)
    .substring(2, 6)}`;
}