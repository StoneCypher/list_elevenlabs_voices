"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const color_1 = require("./color");
const pack = (0, fs_1.readFileSync)('./package.json').toString(), pkg = JSON.parse(pack.trim());
const { Command } = require('commander');
const program = new Command();
program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version);
program
    .option('-p, --private', 'only list your own private voices; skip premades')
    .option('-k, --api-key <key>', 'specify an api key to get private voices')
    .option('-e, --key-envvar <e>', 'specify an envvar name to get an api key from')
    .option('-q, --quiet', 'do not consolize voices (not the same as silent)')
    .option('-s, --silent', 'no output at all (todo)')
    .option('-c, --color', 'colorize output (default; not for json)')
    .option('-b, --basic', 'basic output (no color, not json)')
    .option('-j, --as-json', 'report as json, instead of ascii tabled')
    .option('-f, --as-formatted-json', 'report as formatted multiline json')
    .option('-o, --output-json <fname>', 'store json to disk, irrespective of display');
program.parse(process.argv);
const options = program.opts(), api_key = (_b = (_a = options.apiKey) !== null && _a !== void 0 ? _a : process.env[options.keyEnvvar]) !== null && _b !== void 0 ? _b : process.env['LIST_ELEVENLABS_VOICES_APIKEY'];
if (typeof api_key !== 'string') {
    throw new TypeError('No valid API key or envvar');
}
if (options.basic !== undefined) {
    (0, color_1.is_color)(false);
}
;
if (api_key === undefined) {
    throw new SyntaxError((0, color_1.base)(`Specify either an ${(0, color_1.item)('API key')} or a ${(0, color_1.item)('Key Envvar')}, or set envvar ${(0, color_1.item)('LIST_ELEVENLABS_VOICES_APIKEY')}`));
}
if (options.apiKey && options.keyEnvvar) {
    throw new SyntaxError((0, color_1.base)(`Specify either an ${(0, color_1.item)('API key')} or a ${(0, color_1.item)('Key Envvar')}; not both`));
}
const no_pair_of = { 'color': 'color',
    'asJson': 'as-json',
    'asFormattedJson': 'as-formatted-json',
    'quiet': 'quiet',
    'silent': 'silent' }, npo_keys = Object.keys(no_pair_of);
for (let j = 0, jC = npo_keys.length; j < jC; ++j) {
    for (let i = j + 1, iC = npo_keys.length; i < iC; ++i) {
        if (options[(_c = npo_keys[i]) !== null && _c !== void 0 ? _c : ''] && options[(_d = npo_keys[j]) !== null && _d !== void 0 ? _d : '']) {
            throw new SyntaxError((0, color_1.base)(`Specify either ${(0, color_1.item)((_f = no_pair_of[(_e = npo_keys[i]) !== null && _e !== void 0 ? _e : '']) !== null && _f !== void 0 ? _f : '###1')} or ${(0, color_1.item)((_h = no_pair_of[(_g = npo_keys[j]) !== null && _g !== void 0 ? _g : '']) !== null && _h !== void 0 ? _h : '###2')}, not both`));
        }
    }
}
function attempt_backend_call() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.elevenlabs.io/v1/voices', headers = { 'Content-Type': 'application/json',
            'xi-api-key': api_key };
        const response = yield fetch(url, { method: 'GET', headers }), json = yield response.json();
        return json;
    });
}
function emit_basic_output(voices) {
    emit_color_output(voices);
}
function emit_color_output(voices) {
    voices.map((v) => {
        const name_col = 30;
        const name_sub = (v.name.length < name_col ? v.name : (v.name.substring(0, name_col - 3) + '...')).padEnd(name_col);
        console.log((0, color_1.base)(`${(0, color_1.misc)(v.category.padStart(10))} ${(0, color_1.item)(v.voice_id)} ${(0, color_1.name)(name_sub)} `));
    });
}
function emit_json_output(voices) {
    console.log(JSON.stringify(voices));
}
function emit_formatted_json_output(voices) {
    console.log(JSON.stringify(voices, undefined, 2));
}
function handle_cli() {
    return __awaiter(this, void 0, void 0, function* () {
        const o_voices = yield attempt_backend_call();
        const voices = options.private
            ? o_voices.voices.filter((v) => v.category !== 'premade')
            : o_voices.voices;
        if (options.outputJson && (typeof options.outputJson === 'string')) {
            if (!(options.silent)) {
                console.log('writing to ' + options.outputJson);
            }
            (0, fs_1.writeFileSync)(options.outputJson, JSON.stringify(voices));
        }
        if (options.color) {
            emit_color_output(voices);
        }
        else if (options.asJson) {
            emit_json_output(voices);
        }
        else if (options.asFormattedJson) {
            emit_formatted_json_output(voices);
        }
        else if (options.quiet) { }
        else if (options.silent) { }
        else {
            emit_basic_output(voices);
        }
    });
}
handle_cli();
//# sourceMappingURL=index.js.map