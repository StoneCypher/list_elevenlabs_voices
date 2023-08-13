
import { readFileSync } from 'fs';
import { program }      from 'commander';





const pack = readFileSync('./package.json').toString(),
      pkg  = JSON.parse(pack.trim());

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version);

program
  .option('-k, --api-key <key>',     'api key')
  .option('-c, --color',             'colorize output (not for json)')
  .option('-j, --as-json',           'report as json')
  .option('-f, --as-formatted-json', 'report as formatted multiline json');
