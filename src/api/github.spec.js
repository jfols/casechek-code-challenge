import { usersSearch } from "./github.js";

test("usersSearch returns data", async () => {
  const users = await usersSearch("j"); // assuming there will always be at least one github username with a "j" in it
  expect(users.data.items.length).toBeGreaterThan(0);
});
