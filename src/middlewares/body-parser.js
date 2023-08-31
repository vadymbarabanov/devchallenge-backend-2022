export default function (req, _, next) {
  const data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  req.on("end", () => {
    if (data.length) {
      req.body = JSON.parse(Buffer.concat(data).toString());
    }

    next();
  });
}
