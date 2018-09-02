import { ModuleParseResult } from "./ModuleParseResult";

export class ProjectParseResult {
  public modules: Map<string, ModuleParseResult>;

  public constructor(modules: Map<string, ModuleParseResult>) {
    this.modules = modules;
  }
}
