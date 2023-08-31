export default function (req, _, next) {
  const reqUrl = req.url.split("?");
  const queryParams = reqUrl[1];
  if (!queryParams) {
    return next();
  }

  req.url = reqUrl[0];

  const parsedParams = queryParams.split("&");

  req.query = {};

  parsedParams.forEach((param) => {
    param = param.split("=");
    req.query[param[0]] = param[1];
  });

  next();
}
