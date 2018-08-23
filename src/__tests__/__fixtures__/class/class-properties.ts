export class ClassProperties {
  // @ts-ignore
  public a: number;

  // @ts-ignore
  protected b: number | string;

  // @ts-ignore
  private c: Promise<boolean>;

  public d = () => this.b;

  public e = (a: number) => a + this.a;
}
