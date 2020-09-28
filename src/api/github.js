import { Octokit } from "@octokit/core";
const octokit = new Octokit();

const usersSearch = (query) =>
  octokit.request("GET /search/users", {
    q: query,
  });

export { usersSearch };
