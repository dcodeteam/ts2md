/**
 * This is class methods documentation.
 *
 * ```javascript
 * const instance = new ClassMethods();
 *
 * instance.a().catch(() => {
 *   process.exit(1);
 * })
 * ```
 */
export class ClassMethods {
  /**
   * This is public method `a`.
   *
   * ```javascript
   * const instance = new ClassMethods();
   *
   * instance.a().catch(() => {
   *   process.exit(1);
   * })
   * ```
   */
  // eslint-disable-next-line no-empty-function
  public async a(): Promise<void> {}

  /**
   * This is protected method `b`.
   *
   * You can extend class and call it whenever you want.
   *
   * ```javascript
   * import { ClassMethods } from ".";
   *
   * export class MyClassMethods extends ClassMethods {
   *   constructor() {
   *     super();
   *
   *     this.b(1).catch(() => {
   *       process.exit(1);
   *     })
   *   }
   * }
   * ```
   *
   * Or you can override it.
   *
   * ```javascript
   * import { ClassMethods } from ".";
   *
   * export class MyClassMethods extends ClassMethods {
   *   protected b(a: number): Promise<string> {
   *     return super.b(a).catch(() => {
   *       process.exit(1);
   *     })
   *   }
   * }
   * ```
   *
   * @param a is very useful parameter.
   */
  // @ts-ignore
  // eslint-disable-next-line no-empty-function
  protected async b(a: number): Promise<string> {}

  /**
   * Should not be documented.
   *
   * @param a
   */
  // @ts-ignore
  private c(a: string): string {}
}
