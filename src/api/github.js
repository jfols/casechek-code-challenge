import { Octokit } from "@octokit/core";
import { pick, map } from "ramda";

const octokit = new Octokit();

const usersSearch = async (query) => {
  const results = await octokit.request("GET /search/users", {
    q: query,
  });

  results.data.items = map(
    pick(["login", "avatar_url", "html_url", "type"]),
    results.data.items
  );

  return results;
};

export { usersSearch };
