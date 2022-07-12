import "./env";
import { generateSignUps } from "./models/SignUps";
import { generateTeams } from "./models/Teams";
import { generateChildren } from "./models/Children";

try {
  generateSignUps();
  generateTeams();
  generateChildren();
} catch (err) {
  console.log(err);
}
