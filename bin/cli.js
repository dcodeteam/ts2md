#!/usr/bin/env node

"use strict";

const { Cli } = require("../lib/cli/Cli");
const { version } = require("../package.json");

const cli = new Cli(process.cwd(), version, process.argv);

try {
  cli.bootstrap();
} catch (e) {
  console.error(e.message);

  process.exit(1);
}
