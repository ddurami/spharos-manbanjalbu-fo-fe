export function maskName(name: string): string {
  const trimmed = name.trim();

  if (trimmed.length <= 1) {
    return trimmed;
  }

  if (trimmed.length === 2) {
    return `${trimmed[0]}*`;
  }

  return `${trimmed[0]}*${trimmed.slice(2)}`;
}
