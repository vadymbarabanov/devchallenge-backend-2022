export default class PeopleRepository {
  constructor(db) {
    this.db = db;
  }

  async createUser(input) {
    const data = await this.db.client.query("SELECT 1 + 1");
    return data.rows;
  }

  async createTrustLevel(personId, people) {
    console.log(personId, people);
  }
}
