import "./env";
import { dropChildren } from "./models/Children";

try {
  dropChildren();
} catch (err) {
  console.log(err);
}
