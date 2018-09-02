interface A {
  a: string;
}

interface B {
  b: number;
}

export class ClassImplements implements A, B {
  // @ts-ignore
  public a: string;

  // @ts-ignore
  public b: number;
}
