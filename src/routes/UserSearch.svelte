<script>
  import SearchTextInput from "../components/SearchTextInput.svelte";

  import UserCard from "../components/UserCard.svelte";

  import { usersSearch } from "../api/github.js";

  let users = [];
  let query;

  const _usersSearch = async (query) => {
    let result = await usersSearch(query);
    try {
      users = result.data.items;
    } catch (e) {
      // this is definitely a shortcut! more time on this and error handling could be dramatically improved
      if (result.errorMessage) {
        alert(result.errorMessage);
      } else {
        alert("On no! Something went wrong searching for users...");
      }
    }
  };

  $: {
    if (query) {
      _usersSearch(query);
    }
  }
</script>

<div class="text-3xl mt-10 text-center">
  Github user followers Casechek code challenge
</div>
<div class="flex justify-center my-10">
  <SearchTextInput bind:query />
</div>

<div class="flex flex-wrap">
  {#each users as user}
    <div class="mb-4 mx-2">
      <UserCard {user} />
    </div>
  {/each}
</div>
