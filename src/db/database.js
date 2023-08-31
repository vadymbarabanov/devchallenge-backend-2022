import path from "path";
import Pg from "pg";
import { fileURLToPath } from "url";
import { readSqlFile } from "../utils/files/read-sql-file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Database {
  instance;
  client;

  constructor() {
    this.client = new Pg.Client({
      connectionString: process.env.DATABASE_URL,
    });
  }

  static Create() {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

  async connect() {
    await this.client.connect();
    console.info("Database connected");
    await this._applyInitialMigration();
  }

  async closeConnection() {
    await this.client.end();
  }

  async _applyInitialMigration() {
    const sqlQuery = readSqlFile(
      path.join(__dirname, "migrations", "initial.sql")
    );

    await this.client.query(sqlQuery);
  }
}
