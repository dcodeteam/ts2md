export class App {
  // @ts-ignore
  private entryFile: string;

  public constructor(entryFile: string) {
    this.entryFile = entryFile;
  }

  public generateDocs(): string {
    return "";
  }
}
