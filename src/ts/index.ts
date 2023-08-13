
// program

import { readFileSync, writeFileSync }      from 'fs';
import { base, item, name, misc, is_color } from './color';

const pack = readFileSync('./package.json').toString(),
      pkg  = JSON.parse(pack.trim());

const { Command } = require('commander');
const program     = new Command();

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version);

program
  .option('-q, --quiet',               'do not consolize voices (not the same as silent)')
  .option('-k, --api-key <key>',       'specify an api key to get private voices')
  .option('-e, --key-envvar <e>',      'specify an envvar name to get an api key from')
  .option('-s, --silent',              'no output at all (todo)')
  .option('-c, --color',               'colorize output (not for json)')
  .option('-j, --as-json',             'report as json, instead of ascii tabled')
  .option('-f, --as-formatted-json',   'report as formatted multiline json')
  .option('-o, --output-json <fname>', 'store json to disk, irrespective of display');

program.parse(process.argv);

const options = program.opts(),
      api_key = options.apiKey ?? process.env[options.keyEnvvar];

if (typeof api_key !== 'string') { throw new TypeError('No valid API key or envvar'); }

if (options.color !== undefined) { is_color(options.color) };





// needs an api key or a key envvar, can't skip
if ((options.apiKey === undefined) && (options.keyEnvvar === undefined)) {
  throw new SyntaxError(base( `Specify either an ${item('API key')} or a ${item('Key Envvar')}`));
}

// can't have both
if (options.apiKey && options.keyEnvvar) {
  throw new SyntaxError(base( `Specify either an ${item('API key')} or a ${item('Key Envvar')}; not both`));
}

// no two values in this object may be specified as arguments.  keys are
// how commander rewrites them for caps, gag.
const no_pair_of: any = {'color'           : 'color',
                         'asJson'          : 'as-json',
                         'asFormattedJson' : 'as-formatted-json',
                         'quiet'           : 'quiet',
                         'silent'          : 'silent'},

      npo_keys        = Object.keys(no_pair_of);

for (let j=0, jC=npo_keys.length; j<jC; ++j) {
  for (let i=j+1, iC=npo_keys.length; i<iC; ++i) {
    if (options[npo_keys[i] ?? ''] && options[npo_keys[j] ?? '']) {
      throw new SyntaxError(base( `Specify either ${item(no_pair_of[npo_keys[i] ?? ''] ?? '###1')} or ${item(no_pair_of[npo_keys[j] ?? ''] ?? '###2')}, not both`));
    }
  }
}

// // color and as-json are mutually exclusive
// if (options.color && options.asJson) {
//   throw new SyntaxError(base( `Specify either ${item('color')} or ${item('as-json')}`));
// }

// // so are color and as-formatted-json
// if (options.color && options.asFormattedJson) {
//   throw new SyntaxError(base( `Specify either ${item('color')} or ${item('as-formatted-json')}`));
// }

// // and so are as-json and as-formatted-json
// if (options.asJson && options.asFormattedJson) {
//   throw new SyntaxError(base( `Specify either ${item('as-json')} or ${item('as-formatted-json')}`));
// }

// // ... so are as-json and no-output
// if (options.asJson && options.asFormattedJson) {
//   throw new SyntaxError(base( `Specify either ${item('as-json')} or ${item('as-formatted-json')}`));
// }

// // ... and so are as-formatted-json and no-output
// if (options.asJson && options.asFormattedJson) {
//   throw new SyntaxError(base( `Specify either ${item('as-json')} or ${item('as-formatted-json')}`));
// }

// // aaaaaaand so are color and no-p
// if (options.asJson && options.asFormattedJson) {
//   throw new SyntaxError(base( `Specify either ${item('as-json')} or ${item('as-formatted-json')}`));
// }





async function attempt_backend_call() {

  const url     = 'https://api.elevenlabs.io/v1/voices',
        headers = { 'Content-Type' : 'application/json',
                    'xi-api-key'   : api_key };

  const response = await fetch(url, { method: 'GET', headers }),
        json     = await response.json();

  return json;

}





function emit_basic_output(voices: any) {
  // right now they're the same, and controlled by the lead-in flag
  // left as a wrapper in case that changes
  emit_color_output(voices);
}

function emit_color_output(voices: any) {
  voices.voices.map( (v: any) => {
    const name_col = 30;
    const name_sub = (v.name.length < name_col? v.name : (v.name.substring(0, name_col-3) + '...')).padEnd(name_col);
    console.log(base( `${misc(v.category.padStart(10))} ${item(v.voice_id)} ${name(name_sub)} ` ));
  });
}

function emit_json_output(voices: any) {
  console.log( JSON.stringify(voices) );
}

function emit_formatted_json_output(voices: any) {
  console.log( JSON.stringify(voices, undefined, 2) );
}





async function handle_cli() {

  const voices = await attempt_backend_call();

  if (options.outputJson && (typeof options.outputJson === 'string')) {

    if (!(options.silent)) {
      console.log('writing to ' + options.outputJson);
    }

    writeFileSync(options.outputJson, JSON.stringify(voices));

  }

  if      (options.color)           { emit_color_output(voices);          }
  else if (options.asJson)          { emit_json_output(voices);           }
  else if (options.asFormattedJson) { emit_formatted_json_output(voices); }
  else if (options.quiet)           { /* don't emit anything here */      }
  else if (options.silent)          { /* don't emit anything here */      }
  else                              { emit_basic_output(voices);          }

}





handle_cli();
