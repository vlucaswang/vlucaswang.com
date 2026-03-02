export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isRecent(date: string | Date, days = 30): boolean {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return diff < days * 24 * 60 * 60 * 1000;
}
