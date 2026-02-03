export function selectObservation(
  hash: number,
  observations: string[]
): string {
  const index = hash % observations.length;
  return observations[index];
}