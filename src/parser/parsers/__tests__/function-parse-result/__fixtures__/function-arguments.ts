export function functionArguments(
  // @ts-ignore
  a: number,
  // @ts-ignore
  b: { c: number }
  // @ts-ignore
) {
  return a + b.c;
}
