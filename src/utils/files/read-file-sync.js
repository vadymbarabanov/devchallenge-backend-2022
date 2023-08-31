import fs from "fs";

/**
 * @param {string} path
 * @returns {string}
 */
export function readFileSync(path) {
  return fs.readFileSync(path, {
    encoding: "utf-8",
    flag: "r",
  });
}
