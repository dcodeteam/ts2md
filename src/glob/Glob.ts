import * as globby from "globby";

/**
 * Glob matcher.
 *
 * ```javascript
 * const glob = new Glob(process.cwd(), "*.{ts,tsx}");
 *
 * const files = glob.find("*.{ts,tsx}")
 * ```
 */
export class Glob {
  protected cwd: string;

  protected pattern: string;

  /**
   * @param cwd Working directory.
   * @param pattern Glob match pattern.
   */
  public constructor(cwd: string, pattern: string) {
    this.cwd = cwd;
    this.pattern = pattern;
  }

  /**
   * Returns array of matching paths.
   */
  public find(): string[] {
    return globby.sync(this.pattern, {
      cwd: this.cwd,
      absolute: true,
    });
  }
}
