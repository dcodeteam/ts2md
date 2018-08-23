export class Foo {
  // eslint-disable-next-line no-empty-function
  public async bar(): Promise<void> {}

  protected async baz(foo: number): Promise<string> {
    await this.bar();

    return this.quoz(String(foo));
  }

  private quoz(foo: string): string {
    return foo;
  }
}
