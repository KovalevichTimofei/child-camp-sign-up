import teams from "../db/teams";
import { getByTeam } from "./Children";
import fs from "fs";

const fakeTeams = [
  {
    id: 1,
    signUpId: 1,
    number: 1,
    title: "Нейронные связи",
  },
  {
    id: 2,
    signUpId: 1,
    number: 2,
    title: "Чуткие уши",
  },
  {
    id: 3,
    signUpId: 1,
    number: 3,
    title: "Чистые уста",
  },
  {
    id: 4,
    signUpId: 1,
    number: 4,
    title: "Внимательные глаза",
  },
  {
    id: 5,
    signUpId: 1,
    number: 5,
    title: "Горящее сердце",
  },
  {
    id: 6,
    signUpId: 1,
    number: 6,
    title: "Сильные руки",
  },
  {
    id: 7,
    signUpId: 2,
    number: 1,
    title: "Нейронные связи",
  },
  {
    id: 8,
    signUpId: 2,
    number: 2,
    title: "Чуткие уши",
  },
  {
    id: 9,
    signUpId: 2,
    number: 3,
    title: "Чистые уста",
  },
  {
    id: 10,
    signUpId: 2,
    number: 4,
    title: "Внимательные глаза",
  },
  {
    id: 11,
    signUpId: 2,
    number: 5,
    title: "Горящее сердце",
  },
  {
    id: 12,
    signUpId: 2,
    number: 6,
    title: "Сильные руки",
  },
];

async function recreateAndFillTable() {
  fs.writeFile(
    "./dist/db/teams.json",
    JSON.stringify(fakeTeams),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`Teams file is written successfully!`);
      }
    }
  );
}

export async function generateTeams() {
  await recreateAndFillTable();
}

export async function getAll() {
  try {
    const Promises = teams.map(async (team) => ({
      ...team,
      members: await getByTeam(team.id),
    }));
    return await Promise.all(Promises);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getBySignUp(signUpId) {
  try {
    const Promises = teams
      .filter((el) => el.signUpId === signUpId)
      .map(async (team) => ({
        ...team,
        members: await getByTeam(team.id),
      }));
    const result = await Promise.all(Promises);
    return result;
  } catch (err) {
    console.log(err);
  }
}
