"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.misc = exports.name = exports.item = exports.base = exports.is_color = void 0;
const cli_color_1 = require("cli-color");
let in_color = false;
function is_color(set_to) {
    in_color = set_to;
    return in_color;
}
exports.is_color = is_color;
const base = (text) => in_color ? (0, cli_color_1.white)(text) : text;
exports.base = base;
const item = (text) => in_color ? (0, cli_color_1.cyan)(text) : text;
exports.item = item;
const name = (text) => in_color ? (0, cli_color_1.whiteBright)(text) : text;
exports.name = name;
const misc = (text) => in_color ? (0, cli_color_1.blackBright)(text) : text;
exports.misc = misc;
//# sourceMappingURL=color.js.map