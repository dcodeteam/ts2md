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

#### Properties

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

#### Properties

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

#### Properties

#### Methods

##### `parse`

```typescript
class Parser {
  public parse(): ParseResult;
}
```

### Class `NodeParseResult`

#### Constructors

```typescript
class NodeParseResult {
  public constructor(node: ts.Node);
}
```

###### Parameters

- **node**: `ts.Node`

#### Properties

##### `id`

```typescript
class NodeParseResult {
  public id: string;
}
```

##### `documentationTags`

```typescript
class NodeParseResult {
  public documentationTags: NodeDocumentationTag[];
}
```

##### `documentation`

```typescript
class NodeParseResult {
  public documentation: string;
}
```

#### Methods

##### `fulfillSymbolData`

```typescript
class NodeParseResult {
  protected fulfillSymbolData(symbol: ts.Symbol, checker: ts.TypeChecker): void;
}
```

###### Parameters

- **symbol**: `ts.Symbol`
- **checker**: `ts.TypeChecker`

##### `fulfillSignatureData`

```typescript
class NodeParseResult {
  protected fulfillSignatureData(
    signature: ts.Signature,
    checker: ts.TypeChecker,
  ): void;
}
```

###### Parameters

- **signature**: `ts.Signature`
- **checker**: `ts.TypeChecker`

### Class `StatementParseResult`

#### Extends `NodeParseResult`

#### Constructors

```typescript
class StatementParseResult {
  public constructor(node: ts.Declaration);
}
```

###### Parameters

- **node**: `ts.Declaration`

#### Properties

##### `exported`

```typescript
class StatementParseResult {
  public exported: boolean;
}
```

##### `defaultExported`

```typescript
class StatementParseResult {
  public defaultExported: boolean;
}
```

### Class `ClassParseResult`

#### Extends `StatementParseResult`

#### Constructors

```typescript
class ClassParseResult {
  public constructor(node: ts.ClassDeclaration, program: ts.Program);
}
```

###### Parameters

- **node**: `ts.ClassDeclaration`
- **program**: `ts.Program`

#### Properties

##### `extendedClass`

```typescript
class ClassParseResult {
  public extendedClass: string;
}
```

##### `implementedInterfaces`

```typescript
class ClassParseResult {
  public implementedInterfaces: string[];
}
```

##### `constructors`

```typescript
class ClassParseResult {
  public constructors: ConstructorParseResult[];
}
```

##### `methods`

```typescript
class ClassParseResult {
  public methods: MethodParseResult[];
}
```

##### `properties`

```typescript
class ClassParseResult {
  public properties: PropertyParseResult[];
}
```

### Class `InterfaceParseResult`

#### Extends `StatementParseResult`

#### Constructors

```typescript
class InterfaceParseResult {
  public constructor(node: ts.InterfaceDeclaration, program: ts.Program);
}
```

###### Parameters

- **node**: `ts.InterfaceDeclaration`
- **program**: `ts.Program`

#### Properties

##### `extendedInterfaces`

```typescript
class InterfaceParseResult {
  public extendedInterfaces: string[];
}
```

##### `methods`

```typescript
class InterfaceParseResult {
  public methods: MethodParseResult[];
}
```

##### `properties`

```typescript
class InterfaceParseResult {
  public properties: PropertyParseResult[];
}
```

##### `constructors`

```typescript
class InterfaceParseResult {
  public constructors: ConstructorParseResult[];
}
```

### Class `FunctionParseResult`

#### Extends `StatementParseResult`

#### Constructors

```typescript
class FunctionParseResult {
  public constructor(node: ts.FunctionDeclaration, program: ts.Program);
}
```

###### Parameters

- **node**: `ts.FunctionDeclaration`
- **program**: `ts.Program`

#### Properties

##### `parameters`

```typescript
class FunctionParseResult {
  public parameters: ParameterParseResult[];
}
```

##### `returnType`

```typescript
class FunctionParseResult {
  public returnType: string;
}
```

### Class `VariableListParseResult`

#### Extends `StatementParseResult`

#### Constructors

```typescript
class VariableListParseResult {
  public constructor(node: ts.VariableStatement, program: ts.Program);
}
```

###### Parameters

- **node**: `ts.VariableStatement`
- **program**: `ts.Program`

#### Properties

##### `declarations`

```typescript
class VariableListParseResult {
  public declarations: VariableParseResult[];
}
```

### Class `VariableParseResult`

#### Extends `StatementParseResult`

#### Constructors

```typescript
class VariableParseResult {
  public constructor(node: ts.VariableDeclaration, program: ts.Program);
}
```

###### Parameters

- **node**: `ts.VariableDeclaration`
- **program**: `ts.Program`

#### Properties

##### `type`

```typescript
class VariableParseResult {
  public type: string;
}
```

### Class `ExportParseResult`

#### Constructors

```typescript
class ExportParseResult {
  public constructor(node: ts.ExportDeclaration);
}
```

###### Parameters

- **node**: `ts.ExportDeclaration`

#### Properties

##### `elements`

```typescript
class ExportParseResult {
  public elements: ExportElement[];
}
```

##### `moduleSpecifier`

```typescript
class ExportParseResult {
  public moduleSpecifier: string;
}
```

### Class `MethodParseResult`

#### Extends `MemberParseResult`

#### Constructors

```typescript
class MethodParseResult {
  public constructor(
    node: ts.MethodSignature | ts.MethodDeclaration,
    program: ts.Program,
  );
}
```

###### Parameters

- **node**: `ts.MethodSignature | ts.MethodDeclaration`
- **program**: `ts.Program`

#### Properties

##### `parameters`

```typescript
class MethodParseResult {
  public parameters: ParameterParseResult[];
}
```

##### `returnType`

```typescript
class MethodParseResult {
  public returnType: string;
}
```

### Class `PropertyParseResult`

#### Extends `MemberParseResult`

#### Constructors

```typescript
class PropertyParseResult {
  public constructor(
    node: ts.PropertySignature | ts.PropertyDeclaration,
    program: ts.Program,
  );
}
```

###### Parameters

- **node**: `ts.PropertySignature | ts.PropertyDeclaration`
- **program**: `ts.Program`

#### Properties

##### `type`

```typescript
class PropertyParseResult {
  public type: string;
}
```

### Class `ParameterParseResult`

#### Extends `NodeParseResult`

#### Constructors

```typescript
class ParameterParseResult {
  public constructor(node: ts.ParameterDeclaration, program: ts.Program);
}
```

###### Parameters

- **node**: `ts.ParameterDeclaration`
- **program**: `ts.Program`

#### Properties

##### `type`

```typescript
class ParameterParseResult {
  public type: string;
}
```

### Class `ConstructorParseResult`

#### Extends `MemberParseResult`

#### Constructors

```typescript
class ConstructorParseResult {
  public constructor(
    node: ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration,
    program: ts.Program,
  );
}
```

###### Parameters

- **node**: `ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration`
- **program**: `ts.Program`

#### Properties

##### `parameters`

```typescript
class ConstructorParseResult {
  public parameters: ParameterParseResult[];
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

#### Properties

#### Methods

##### `render`

```typescript
class Renderer {
  public render(): string;
}
```

### Class `BaseRenderer`

#### Properties

##### `content`

```typescript
class BaseRenderer {
  protected content: string;
}
```

#### Methods

##### `render`

```typescript
class BaseRenderer {
  public render(): string;
}
```

##### `addText`

```typescript
class BaseRenderer {
  protected addText(text: string): this;
}
```

###### Parameters

- **text**: `string`

##### `addTextLine`

```typescript
class BaseRenderer {
  protected addTextLine(text: string): this;
}
```

###### Parameters

- **text**: `string`

##### `addHeader`

```typescript
class BaseRenderer {
  protected addHeader(size: number, text: string): this;
}
```

###### Parameters

- **size**: `number`
- **text**: `string`

##### `addHorizontalLine`

```typescript
class BaseRenderer {
  protected addHorizontalLine(): this;
}
```

##### `addList`

```typescript
class BaseRenderer {
  protected addList(values: string[]): this;
}
```

###### Parameters

- **values**: `string[]`

##### `addCode`

```typescript
class BaseRenderer {
  protected addCode(text: string): this;
}
```

###### Parameters

- **text**: `string`

##### `makeBold`

```typescript
class BaseRenderer {
  protected makeBold(text: string): string;
}
```

###### Parameters

- **text**: `string`

##### `makeCode`

```typescript
class BaseRenderer {
  protected makeCode(text: string): string;
}
```

###### Parameters

- **text**: `string`

##### `prerender`

```typescript
class BaseRenderer {
  protected prerender(): void;
}
```

### Class `ClassRenderer`

#### Extends `BaseRenderer`

#### Constructors

```typescript
class ClassRenderer {
  public constructor(result: ClassParseResult);
}
```

###### Parameters

- **result**: `ClassParseResult`

#### Properties

#### Methods

##### `prerender`

```typescript
class ClassRenderer {
  protected prerender(): void;
}
```

### Class `InterfaceRenderer`

#### Extends `BaseRenderer`

#### Constructors

```typescript
class InterfaceRenderer {
  public constructor(result: InterfaceParseResult);
}
```

###### Parameters

- **result**: `InterfaceParseResult`

#### Properties

#### Methods

##### `prerender`

```typescript
class InterfaceRenderer {
  protected prerender(): void;
}
```

### Class `MethodRenderer`

#### Extends `BaseRenderer`

#### Constructors

```typescript
class MethodRenderer {
  public constructor(result: MethodParseResult);
}
```

###### Parameters

- **result**: `MethodParseResult`

#### Properties

#### Methods

##### `prerender`

```typescript
class MethodRenderer {
  protected prerender(): void;
}
```

### Class `PropertyRenderer`

#### Extends `BaseRenderer`

#### Constructors

```typescript
class PropertyRenderer {
  public constructor(result: PropertyParseResult);
}
```

###### Parameters

- **result**: `PropertyParseResult`

#### Properties

#### Methods

##### `prerender`

```typescript
class PropertyRenderer {
  protected prerender(): void;
}
```

### Class `ConstructorRenderer`

#### Extends `BaseRenderer`

#### Constructors

```typescript
class ConstructorRenderer {
  public constructor(
    parent: ClassParseResult | InterfaceParseResult,
    result: ConstructorParseResult,
  );
}
```

###### Parameters

- **parent**: `ClassParseResult | InterfaceParseResult`
- **result**: `ConstructorParseResult`

#### Properties

#### Methods

##### `prerender`

```typescript
class ConstructorRenderer {
  protected prerender(): void;
}
```
