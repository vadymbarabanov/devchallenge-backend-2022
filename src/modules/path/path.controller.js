import Router from "../../app/router.js";
import PathService from "./path.service.js";

const router = new Router({ prefix: "/path" });
// add dependency injection
const pathService = new PathService();

router.post((req, res) => {
  console.log("/api/path fired");
  const result = pathService.getPath();
  res.status(201).end(result);
});

export default router;
