import children from "../db/children";
import { getBySignUp } from "./Teams";
import fs from "fs";
import { generateId } from "../plugins";

const fakeChildren = [
  {
    id: 1,
    firstName: "Имя1",
    surName: "Фамилия1",
    age: 8,
    gender: "male",
    teamId: 1,
  },
  {
    id: 2,
    firstName: "Имя2",
    surName: "Фамилия2",
    age: 10,
    gender: "female",
    teamId: 2,
  },
  {
    id: 3,
    firstName: "Имя3",
    surName: "Фамилия3",
    age: 9,
    gender: "male",
    teamId: 3,
  },
  {
    id: 4,
    firstName: "Имя4",
    surName: "Фамилия4",
    age: 9,
    gender: "female",
    teamId: 4,
  },
  {
    id: 5,
    firstName: "Имя5",
    surName: "Фамилия5",
    age: 10,
    gender: "male",
    teamId: 5,
  },
  {
    id: 6,
    firstName: "Имя6",
    surName: "Фамилия6",
    age: 8,
    gender: "female",
    teamId: 6,
  },
];

async function recreateAndFillTable() {
  fs.writeFile(
    "./dist/db/children.json",
    JSON.stringify(fakeChildren),
    "utf8",
    (err) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`Children file is written successfully!`);
      }
    }
  );
}

export async function dropChildren() {
  fs.writeFile("./dist/db/children.json", JSON.stringify([]), "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`Children file is written successfully!`);
    }
  });
}

export async function generateChildren() {
  await recreateAndFillTable();
}

export async function getAll() {
  try {
    return children;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getByTeam(teamId) {
  try {
    const children = JSON.parse(
      await fs.promises.readFile("./dist/db/children.json")
    );
    return children.filter((el) => el.teamId === teamId);
  } catch (err) {
    console.log(err);
  }
}

async function calculateTeamToAdd(data) {
  const { age, gender, signUpId } = data;
  const teams = await getBySignUp(signUpId);
  const promises = teams.map(async (team) => {
    const { id: teamId, title } = team;
    const childrenInThisTeam = await getByTeam(teamId);
    const countWithThisParams = childrenInThisTeam.filter(
      (el) => el.gender === gender && el.age === age
    ).length;

    return {
      teamId,
      title,
      countWithThisParams,
    };
  });
  const countOfChildrenWithThisParamsByTeam = await Promise.all(promises);
  return countOfChildrenWithThisParamsByTeam.sort(
    (a, b) => a.countWithThisParams - b.countWithThisParams
  )[0];
}

export async function createOne(data) {
  try {
    const { teamId, title } = await calculateTeamToAdd(data);
    try {
      const { firstName, surName, age, gender } = data;
      const newChild = {
        id: generateId(),
        firstName,
        surName,
        age,
        gender,
        teamId,
      };
      const children = JSON.parse(
        await fs.promises.readFile("./dist/db/children.json")
      );
      const newChildrenList = [...children, newChild];
      await fs.promises.writeFile(
        "./dist/db/children.json",
        JSON.stringify(newChildrenList),
        "utf8"
      );
      return title;
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    throw new Error(err);
  }
}
