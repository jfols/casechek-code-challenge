import { usersSearch } from "./github.js";

test("usersSearch returns data", () => {
  const users = usersSearch("j"); // assuming there will always be at least one github username with a "j" in it
  expect(users.length).toBeGreaterThan(0);
});
