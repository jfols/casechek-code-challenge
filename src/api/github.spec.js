import { usersSearch } from "./github.js";
import { keys } from "ramda";

test("usersSearch returns data", async () => {
  const users = await usersSearch("j"); // assuming there will always be at least one github username with a 'j' in it
  expect(users.data.items.length).toBeGreaterThan(0);
});

test("usersSearch returns expected properties", async () => {
  const users = await usersSearch("j"); // assuming there will always be at least one github username with a 'j' in it
  users.data.items.forEach((user) => {
    expect(keys(user)).toEqual(["login", "avatar_url", "html_url", "type"]);
  });
});
