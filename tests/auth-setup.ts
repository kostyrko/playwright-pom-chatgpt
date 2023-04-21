import { test } from "@playwright/test";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config({
    path: './tests/.env',
});

const storageState = "tests/.auth/storageState.json";

test("authenticate user", async ({
  page
}) => {
  if (process.env.username === "**REMOVED**") {
    throw new Error("Env file is not correct");
  }

  const stats = fs.existsSync(storageState!.toString())
    ? fs.statSync(storageState!.toString())
    : null;
  if (stats && stats.mtimeMs > new Date().getTime() - 600000) {
    console.log(`\x1b[2m\tSign in skipped because token is fresh\x1b[0m`);
    return;
  }

  console.log(`\x1b[2m\tSign in started'\x1b[0m`);

  // when we're not authenticated, the app redirects to the login page
  await page.goto("");

  console.log(`\x1b[2m\tSign in as '${process.env.USERNAME}'\x1b[0m`);

  await page.getByPlaceholder('Username').fill(process.env.USERNAME as string);

  await page.getByPlaceholder('Password').fill(process.env.PASSWORD as string);


  console.log(`\x1b[2m\tSign in processing\x1b[0m`);

  await page.locator('#login-button').click();

  console.log(`\x1b[2m\tSign in processed\x1b[0m`);

  await page.context().storageState({ path: storageState });
});
