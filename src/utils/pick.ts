/**
 * Create a new object composed of only K properties
 */
export default function pick<T, K extends keyof T>(
  target: T,
  ...keys: K[]
): Pick<T, K> {
  const result: Partial<T> = {};

  for (const key of keys) {
    result[key] = target[key];
  }

  return result as Pick<T, K>;
}
