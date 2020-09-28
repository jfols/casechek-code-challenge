<script>
  import { onMount } from "svelte";
  import { getFollowers } from "../api/github.js";
  import UserCard from "./UserCard.svelte";
  import StatPill from "./StatPill.svelte";
  import { getUser } from "../api/github.js";

  export let user;

  let followers = [];
  let userFull = {};

  const _getFollowers = async () => {
    let result = await getFollowers(user.login);
    try {
      followers = result.data;
    } catch (e) {
      // this is definitely a shortcut! more time on this and error handling could be dramatically improved
      followers = [];
      if (result.errorMessage) {
        alert(result.errorMessage);
      } else {
        alert("On no! Something went wrong getting this user's followers...");
      }
    }
  };

  const _getUser = async () => {
    let result = await getUser(user.login);
    try {
      userFull = result.data;
    } catch (e) {
      // this is definitely a shortcut! more time on this and error handling could be dramatically improved
      if (result.errorMessage) {
        alert(result.errorMessage);
      } else {
        alert("On no! Something went wrong searching for users...");
      }
    }
  };

  onMount(() => {
    _getFollowers();
    _getUser();
  });
</script>

<div class="flex mb-4">
  <div class="h-32 w-32 flex-none rounded-lg overflow-hidden">
    <img
      src={user.avatar_url}
      class="w-32 h-32"
      alt={user.login + ' profile image'} />
  </div>
  <div class="px-2">
    <div class="mb-2">
      <div class="text-xl font-bold">
        {user.login}
        {#if userFull.name}
          <span class="text-gray-700"> ({userFull.name})</span>
        {/if}
      </div>
      {#if userFull.location}
        <div class="text-gray-700">{userFull.location}</div>
      {/if}
    </div>
    <div class="flex flex-wrap w-64">
      <StatPill label="followers" value={userFull.followers} />
      <StatPill label="following" value={userFull.following} />
      <StatPill label="repos" value={userFull.public_repos} />
      <StatPill label="gists" value={userFull.public_gists} />
    </div>
  </div>
</div>

{#each followers as user}
  <div class="mb-4 mx-2">
    <UserCard {user} />
  </div>
{/each}
