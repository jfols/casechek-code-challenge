import { usersSearch, getFollowers, getUser } from "./github.js";
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

test("getFollowers returns data", async () => {
  const users = await getFollowers("jfols"); // assuming jfols has followers
  expect(users.data.length).toBeGreaterThan(0);
});

test("getFollowers returns expected properties", async () => {
  const users = await getFollowers("jfols"); // assuming jfols has followers
  users.data.forEach((user) => {
    expect(keys(user)).toEqual(["login", "avatar_url", "html_url", "type"]);
  });
});

test("getUser returns data", async () => {
  const users = await getUser("jfols");
  expect(users.data).not.toBeNull();
});

test("getUser returns expected properties", async () => {
  const user = await getUser("jfols");
  expect(keys(user.data)).toEqual([
    "login",
    "id",
    "avatar_url",
    "html_url",
    "type",
    "name",
    "company",
    "blog",
    "location",
    "bio",
    "twitter_username",
    "public_repos",
    "public_gists",
    "followers",
    "following",
    "created_at",
    "updated_at",
  ]);
});
