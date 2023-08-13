"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const pack = (0, fs_1.readFileSync)('./package.json').toString(), pkg = JSON.parse(pack.trim());
const { Command } = require('commander');
const program = new Command();
program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);
program
    .option('-k, --api-key <key>', 'specify an api key to get private voices')
    .option('-c, --color', 'colorize output (not for json)')
    .option('-j, --as-json', 'report as json, instead of ascii tabled')
    .option('-f, --as-formatted-json', 'report as formatted multiline json');
program.parse();
//# sourceMappingURL=index.js.map