import { ModuleParseResult } from "./ModuleParseResult";

export class ProjectParseResult {
  public readonly entryModule: string;

  public readonly modules: Map<string, ModuleParseResult>;

  public constructor(
    entryModule: string,
    modules: Map<string, ModuleParseResult>,
  ) {
    this.entryModule = entryModule;
    this.modules = modules;
  }
}
