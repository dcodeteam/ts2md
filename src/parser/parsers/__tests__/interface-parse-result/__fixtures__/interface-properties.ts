export interface InterfaceProperties {
  a: string;
  b: number | string;
  c: (a: string, b: { c: number }) => boolean;
}
