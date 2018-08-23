export class ClassMethods {
  // eslint-disable-next-line no-empty-function
  public async a(): Promise<void> {}

  // @ts-ignore
  // eslint-disable-next-line no-empty-function
  protected async b(a: number): Promise<string> {}

  // @ts-ignore
  private c(a: string): string {}
}
