<script>
  import { onMount } from "svelte";
  import { getFollowers } from "../api/github.js";
  import UserCard from "./UserCard.svelte";

  export let user;

  let followers = [];

  let maybeNoResults = "";

  const _getFollowers = async () => {
    try {
      let result = await getFollowers(user.login);
      followers = result.data;
      if (followers.length == 0) {
        maybeNoResults = "no followers found...";
      }
    } catch (e) {
      // this is definitely a shortcut! more time on this and error handling could be dramatically improved
      if (result.errorMessage) {
        alert(result.errorMessage);
      } else {
        alert("On no! Something went wrong searching for users...");
      }
    }
  };

  onMount(_getFollowers);
</script>

<div>
  <div class="text-2xl pb-2 mb-4 border-b">{user.login} followers</div>
  {#each followers as user}
    <div class="mb-4 mx-2">
      <UserCard {user} />
    </div>
  {/each}
  {maybeNoResults}
</div>
