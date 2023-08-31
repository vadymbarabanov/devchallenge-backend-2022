import ColorChanger from "./color-changer.js";

const cc = new ColorChanger();

export function formatPerformanceTime(ms, redTime) {
  const formattedTime = ms >= 1000 ? ms / 1000 + "s" : ms + "ms";

  if (ms >= redTime) {
    return cc.bg.red(formattedTime).text();
  }

  return cc.bg.green(formattedTime).text();
}

export function formatStatusCode(code) {
  if (code < 200) {
    return cc.bg.cyan(code).text();
  }

  if (code < 300) {
    return cc.bg.green(code).text();
  }

  if (code < 400) {
    return cc.bg.blue(code).text();
  }

  if (code < 500) {
    return cc.bg.magenta(code).text();
  }

  return cc.bg.red(code).text();
}
