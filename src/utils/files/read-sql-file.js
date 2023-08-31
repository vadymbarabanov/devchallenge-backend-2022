import { readFileSync } from "./read-file-sync.js";

const NEW_LINE_REGEXP = /[\r\n]+/g;

/**
 * @param {string} path
 * @returns {string}
 */
export function readSqlFile(path) {
  return readFileSync(path).replaceAll(NEW_LINE_REGEXP, "");
}
