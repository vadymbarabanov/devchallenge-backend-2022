export default class PeopleService {
  constructor(peopleRepo) {
    this.peopleRepo = peopleRepo;
  }

  async createUser(input) {
    return this.peopleRepo.createPerson(input);
  }

  async createTrustLevel(personId, people) {
    await this.peopleRepo.createTrustLevel(personId, people);
  }
}
