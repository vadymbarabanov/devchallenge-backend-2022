export default function (_, res, next) {
  res.status = function (statusCode) {
    res.statusCode = statusCode;
    return res;
  };
  next();
}
