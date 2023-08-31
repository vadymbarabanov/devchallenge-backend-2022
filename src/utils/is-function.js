export function isFunction(func) {
  if (typeof func === "function" && func instanceof Function) {
    return true;
  }
  return false;
}
