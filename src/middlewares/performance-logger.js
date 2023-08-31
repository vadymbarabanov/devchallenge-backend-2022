import {
  formatPerformanceTime,
  formatStatusCode,
} from "../utils/format-time.js";

let startTime = 0;

export default function (options) {
  const redTime = options.redTime ?? 1000;

  return function (req, res, next) {
    startTime = Date.now();

    const end = res.end;
    res.end = (...args) => {
      const currentTime = new Date();
      const ms = currentTime.getTime() - startTime;

      console.info(
        `[${currentTime.getHours()}:${currentTime.getMinutes()}] ${
          req.method
        } ${formatStatusCode(res.statusCode)} ${
          req.url
        } - ${formatPerformanceTime(ms, redTime)}`
      );

      end.apply(res, args);
    };
    next();
  };
}
