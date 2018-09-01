/**
 * This is function docs.
 *
 * @param a this is parameter `a`.
 * @param b this is parameter `b`.
 */
export function functionArguments(
  /**
   * this is parameter a docs
   */
  a: number,
  /**
   * this is parameter b docs
   */
  b: { c: number },
) {
  return a + b.c;
}
