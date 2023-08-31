import Router from "../../app/router.js";
import PeopleService from "./people.service.js";
import PeopleRepo from "./people.repository.js";
import Database from "../../db/database.js";
import UserDto from "./dto/user.dto.js";

const db = Database.Create();

const router = new Router({ prefix: "/people" });
const peopleService = new PeopleService(new PeopleRepo(db));

router.post(async (req, res) => {
  const errors = new UserDto().validate(req.body);

  if (errors.length) {
    return res.status(200).send({ errors });
  }

  const person = await peopleService.createUser(req.body);

  res.status(201).send(person);
});

router.post("/:id/trust_connections", (req, res) => {
  // get :id variable
  console.log({ param: req.param });

  peopleService.createTrustLevel(req.param.id, res.body);
  res.status(201).end();
});

export default router;
