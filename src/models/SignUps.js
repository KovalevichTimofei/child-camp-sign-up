import signUps from "../db/signUps";
import fs from "fs";

const fakeSignUps = [
  {
    id: 1,
    title: "Первый заезд",
    dates: "12-16 июля 2022",
    info: "10-12 лет",
  },
  {
    id: 2,
    title: "Второй заезд",
    dates: "19-23 июля 2022",
    info: "7-9 лет",
  },
];

async function recreateAndFillTable() {
  fs.writeFile(
    "./dist/db/signUps.json",
    JSON.stringify(fakeSignUps),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`SignUps file is written successfully!`);
      }
    }
  );
}

export async function generateSignUps() {
  await recreateAndFillTable();
}

export async function getAll() {
  try {
    return signUps;
  } catch (err) {
    throw new Error(err);
  }
}
