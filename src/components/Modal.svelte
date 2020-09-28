<script>
  export let open = false;
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div
    class="z-10 fixed flex justify-center inset-0 cursor-auto p-4"
    transition:fade={{ duration: 200, easing: quintOut }}
    on:click|stopPropagation>
    <div class="fixed inset-0">
      <div
        class="absolute inset-0 bg-gray-700 opacity-75"
        on:click|stopPropagation|self={() => {
          open = false;
          dispatch('close');
        }} />
    </div>
    <div
      class="z-20 fixed self-center bg-white rounded-lg max-w-screen
        max-h-screen overflow-scroll shadow-xl p-4 lg:m-4">
      <slot />
      <div class="flex justify-end my-3">
        <div
          class="text-sm hover:underline flex-none cursor-pointer"
          on:click|stopPropagation={() => {
            open = false;
            dispatch('close');
          }}>
          close
        </div>
      </div>
    </div>
  </div>
{/if}
