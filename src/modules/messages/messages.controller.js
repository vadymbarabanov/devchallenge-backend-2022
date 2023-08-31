import Router from "../../app/router.js";
import MessagesService from "./messages.service.js";

const router = new Router({ prefix: "/messages" });
// add dependency injection
const messagesService = new MessagesService();

router.post((req, res) => {
  // validate req.body
  const result = messagesService.sendMessage(req.body);

  res.status(201).send(result);
});

export default router;
