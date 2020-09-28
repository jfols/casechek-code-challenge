<script>
  import SearchTextInput from "../components/SearchTextInput.svelte";
  import UserCard from "../components/UserCard.svelte";
  import Modal from "../components/Modal.svelte";
  import { usersSearch } from "../api/github.js";
  import UserFollowersDetail from "../components/UserFollowersDetail.svelte";

  let users = [];
  let query;

  let selectedUser = null;
  let userDetailsModalIsOpen = false;
  $: {
    userDetailsModalIsOpen = selectedUser != null;
  }

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
    <div
      class="mb-4 mx-2 cursor-pointer"
      on:click={() => {
        selectedUser = user;
      }}>
      <UserCard {user} />
    </div>
  {/each}
</div>

<Modal
  bind:open={userDetailsModalIsOpen}
  on:close={() => {
    selectedUser = null;
  }}>
  <UserFollowersDetail user={selectedUser} />
</Modal>
