export default function (_, res, next) {
  res.send = function (data) {
    switch (typeof data) {
      case "object":
      case "number":
      case "boolean": {
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(data));
        break;
      }
      case "string": {
        res.setHeader("Content-Type", "text/html");
        res.write(data);
        break;
      }
      default: {
        res.write(data);
      }
    }

    res.end();
  };
  next();
}
