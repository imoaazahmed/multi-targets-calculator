export function createArray(length: number): number[] {
  const result: number[] = [];
  for (let i = 1; i <= length; i++) {
    result.push(i);
  }
  return result;
}
