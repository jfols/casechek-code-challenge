import { Octokit } from "@octokit/core";
import { pick, map } from "ramda";

// NOTE! This is jfols personal access token, please don't abuse it! This ups the request/hour limit from 60 to 5k
// in practice this type of credential would never live in git or client side code
// https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
const octokit = new Octokit({
  auth: "f2ecb7fd556dd03bdec28bad45957d6e7a63664e",
});

const usersSearch = async (query) => {
  let results;
  try {
    results = await octokit.request("GET /search/users", {
      q: query,
    });

    results.data.items = map(
      pick(["login", "avatar_url", "html_url", "type"]),
      results.data.items
    );
  } catch (e) {
    // oh man! had to add this quick hack to soften the blow for rate limit, this is not the right way to do this but in the interest of time...
    if (e.headers["x-ratelimit-limit"] == e.headers["x-ratelimit-used"]) {
      results = {
        errorMessage: "rate limit reached, please try again in a moment...",
      };
    }
  }
  return results;
};

const getFollowers = async (username) => {
  let results;
  try {
    results = await octokit.request("GET /users/" + username + "/followers", {
      username: username,
    });

    results.data = map(
      pick(["login", "avatar_url", "html_url", "type"]),
      results.data
    );
  } catch (e) {
    // todo DRY this up, looks eerily familiar
    if (e.headers["x-ratelimit-limit"] == e.headers["x-ratelimit-used"]) {
      results = {
        errorMessage: "rate limit reached, please try again in a moment...",
      };
    }
  }
  return results;
};

const getUser = async (username) => {
  let results;
  try {
    results = await octokit.request("GET /users/" + username, {
      username: username,
    });
    results.data = pick(
      [
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
      ],
      results.data
    );
  } catch (e) {
    // todo DRY this up, looks eerily familiar
    if (e.headers["x-ratelimit-limit"] == e.headers["x-ratelimit-used"]) {
      results = {
        errorMessage: "rate limit reached, please try again in a moment...",
      };
    }
  }
  return results;
};

export { usersSearch, getFollowers, getUser };
