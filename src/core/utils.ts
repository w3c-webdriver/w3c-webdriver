export function deepMap(
  source: unknown,
  transformer: (item: unknown) => unknown
): unknown {
  if (Array.isArray(source)) {
    return source.map((item) => deepMap(item, transformer));
  }

  const target = transformer(source);

  if (target) {
    return target;
  }

  if (typeof source === 'object' && source !== null) {
    return Object.keys(source).reduce(
      (acc, key) => ({
        ...acc,
        [key]: deepMap((source as Record<string, unknown>)[key], transformer),
      }),
      {}
    );
  }

  return source;
}
