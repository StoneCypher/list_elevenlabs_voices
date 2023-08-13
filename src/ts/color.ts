
import { white, whiteBright, blackBright, cyan } from 'cli-color';

let in_color: boolean = false;

function is_color(set_to: boolean) {
  in_color = set_to;
  return in_color;
}





const base = (text: string) => in_color? white(text)       : text;
const item = (text: string) => in_color? cyan(text)        : text;
const name = (text: string) => in_color? whiteBright(text) : text;
const misc = (text: string) => in_color? blackBright(text) : text;





export {

  is_color,

  base,
  item,
  name,
  misc

};
