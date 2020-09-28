<script>
  export let user = {};

  import Card from "./Card.svelte";
  import ExernalIcon from "../svg/ExternalIcon.svelte";
</script>

<Card>
  <div class="flex w-96">
    <img
      src={user.avatar_url}
      class="h-32 w-32"
      alt={user.login + ' profile image'} />
    <div class="p-4 w-full">
      <div class="flex justify-between">
        <div class="text-lg font-bold">{user.login}</div>
        <a
          class="underline hover:text-blue-400 text-xs"
          href={user.html_url}
          on:click|stopPropagation
          target="_blank">
          <ExernalIcon />
        </a>
      </div>
      {#if user.type != 'User'}
        <div class="pt-2">
          <div
            class="rounded-full inline-block py-1 px-3 bg-gray-700 text-gray-100
              block">
            {user.type}
          </div>
        </div>
      {/if}
    </div>
  </div>
</Card>
