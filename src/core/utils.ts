// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepMap(source: any, transformer: (item: any) => any): any {
  if (Array.isArray(source)) {
    return source.map(item => deepMap(item, transformer));
  }

  const target = transformer(source);

  if (target) {
    return target;
  }

  if (typeof source === 'object' && source !== null) {
    return Object.keys(source).reduce(
      (acc, key) => ({
        ...acc,
        [key]: deepMap(source[key], transformer)
      }),
      {}
    );
  }

  return source;
}
