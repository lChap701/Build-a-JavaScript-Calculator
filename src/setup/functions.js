/*
 * Safer alternative for eval()
 * Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
 */
function convert(data) {
  return window.Function('"use strict";return (' + data + ")")();
}

/*
 * Removes leading zeros for convert() function
 */
function format(str) {
  return str
    .split(" ")
    .map((s) => {
      return s.replaceAll(/^0{2,}/g, "");
    })
    .join(" ");
}

export { convert, format };