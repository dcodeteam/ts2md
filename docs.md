### Class `Cli`

By default it will output files to `docs.md` file relative to `cwd`.

```bash
ts2md --root src --entry src/index.ts
```

Pass `--out` parameter to define set custom path.

```bash
ts2md --root src --entry src/index.ts --out docs/README.md
```

#### Constructors

```typescript
class Cli {
  public constructor(cwd: string, version: string, argv: string[]);
}
```

###### Parameters

- **cwd**: `string`
  Command working directory.
- **version**: `string`
  Current program version.
- **argv**: `string[]`
  List of passed arguments.

#### Methods

##### `bootstrap`

Starts CLI process.

```typescript
class Cli {
  public bootstrap(): void;
}
```

##### `resolvePath`

Resolves provided `relativePath` from current `cwd`.

```typescript
class Cli {
  protected resolvePath(relativePath: string): string;
}
```

###### Parameters

- **relativePath**: `string`
  Path to resolve. If it's not relative, it will not change.

##### `collectFiles`

Collects TypeScript files in `root` directory.

```typescript
class Cli {
  protected collectFiles(root: string): string[];
}
```

###### Parameters

- **root**: `string`
  Relative root path.

##### `createProgram`

Creates TypeScript Program from files in `root` directory.

```typescript
class Cli {
  protected createProgram(files: string[]): ts.Program;
}
```

###### Parameters

- **files**: `string[]`
  Relative root path.

##### `generateDocs`

Generates documentation for `entry` file.

```typescript
class Cli {
  protected generateDocs(entry: string, program: ts.Program): string;
}
```

###### Parameters

- **entry**: `string`
  Project entry point.
- **program**: `ts.Program`
  TypeScript program.

##### `writeDocs`

Writes generated `docs` to `output` file.

```typescript
class Cli {
  protected writeDocs(output: string, docs: string): void;
}
```

###### Parameters

- **output**: `string`
  Relative path to output file.
- **docs**: `string`
  Generated documentation.

### Class `App`

API for NodeJS.

```javascript
const { App } = require("ts2md");

module.exports = function generateDocs(entryFile, program) {
  const app = new App(entryFile, program);

  return app.generateDocs();
};
```

#### Constructors

```typescript
class App {
  public constructor(entryFile: string, program: ts.Program);
}
```

###### Parameters

- **entryFile**: `string`
  Absolute path to documentation entry file.
- **program**: `ts.Program`
  TypeScript program.

#### Methods

##### `generateDocs`

Generates markdown for `entryFile`.

```typescript
class App {
  public generateDocs(): string;
}
```

##### `parse`

Creates parse result.

```typescript
class App {
  protected parse(): ParseResult;
}
```

##### `render`

Generates markdown form provided `parseResult`.

```typescript
class App {
  protected render(parseResult: ParseResult): string;
}
```

###### Parameters

- **parseResult**: `ParseResult`
  Plain object representation of parsed files.

### Interface `ParseResult`

#### Properties

##### `nodes`

```typescript
interface ParseResult {
  nodes: NodeParseResult[];
}
```

##### `exported`

```typescript
interface ParseResult {
  exported: ExportElement[];
}
```

### Class `Parser`

#### Constructors

```typescript
class Parser {
  public constructor(fileName: string, program: ts.Program);
}
```

###### Parameters

- **fileName**: `string`
- **program**: `ts.Program`

#### Methods

##### `parse`

```typescript
class Parser {
  public parse(): ParseResult;
}
```

### Class `Renderer`

#### Constructors

```typescript
class Renderer {
  public constructor(result: ParseResult);
}
```

###### Parameters

- **result**: `ParseResult`

#### Methods

##### `render`

```typescript
class Renderer {
  public render(): string;
}
```
