export abstract class BaseRenderer {
  protected content: string = "";

  protected addText(text: string): this {
    this.content += text;

    return this;
  }

  protected addTextLine(text: string): this {
    return this.addText(`${text}\n`);
  }

  protected addHeader(size: number, text: string): this {
    return this.addTextLine(`${"#".repeat(size)} ${text}`);
  }

  protected addLineBreak(): this {
    return this.addTextLine("");
  }

  protected addHorizontalLine(): this {
    return this.addTextLine("------");
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

    return this.addTextLine(text);
  }

  protected addCode(text: string): this {
    return this.addTextLine(["```typescript", text, "```", ""].join("\n"));
  }

  protected makeBold(text: string): string {
    return `**${text}**`;
  }

  protected makeItalic(text: string): string {
    return `*${text}*`;
  }

  protected makeCode(text: string): string {
    return `\`${text}\``;
  }

  protected abstract prerender(): void;

  public render(): string {
    if (!this.content) {
      this.prerender();
    }

    return this.content;
  }
}
