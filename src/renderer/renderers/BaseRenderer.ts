export abstract class BaseRenderer {
  protected content: string = "";

  protected addText(text: string): this {
    this.content += text;

    return this;
  }

  protected addHeader(size: number, text: string): this {
    return this.addText(`${"#".repeat(size)} ${text}\n`);
  }

  protected addLineBreak(): this {
    return this.addText("\n");
  }

  protected addHorizontalLine(): this {
    return this.addText("------\n");
  }

  protected addList(values: string[]): this {
    const text = values
      .map(x =>
        x
          .split("\n")
          .map((line, idx) => (idx === 0 ? `- ${line}` : `  ${line}`))
          .join("\n")
      )
      .join("\n");

    return this.addText(`${text}\n`);
  }

  protected addCode(text: string): this {
    return this.addText(["```typescript", text, "```", ""].join("\n"));
  }

  protected makeBold(text: string): string {
    return `**${text}**`;
  }

  protected makeItalic(text: string): string {
    return `*${text}*`;
  }

  protected abstract prerender(): void;

  public render(): string {
    if (!this.content) {
      this.prerender();
    }

    return this.content;
  }
}
