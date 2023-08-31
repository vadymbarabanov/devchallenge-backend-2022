import { readFileSync } from "./files/read-file-sync.js";
import path from "path";

const envs = readFileSync(path.join(process.cwd(), ".env")).split("\n");

envs.forEach((env) => {
  // make sure env is not empty string
  if (env) {
    const parsedEnv = env.split("=");
    process.env[parsedEnv[0]] = parsedEnv[1].replaceAll(/"/g, "");
  }
});
