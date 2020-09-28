<script>
  import SearchIcon from "../svg/SearchIcon.svelte";
  import td from "throttle-debounce";

  // tailwind has some great css variant modifiers, but in this case we're adding a fancy label
  // and want a bit more control over everything so we'll keep track of focus ourselves
  let focus = false;

  export let query = null;

  const debounceQuery = td.debounce(150, false, (value) => {
    query = value;
  });

  let _inputValue;

  // svelte uses this JS label style syntax to make statements reactive
  $: {
    debounceQuery(_inputValue);
  }
</script>

<div
  class="rounded-lg p-3 text-2xl font-bold mx-1 md:mx-0 bg-white flex border-2
    border-gray-400 shadow-xl overflow-hidden"
  class:border-blue-400={focus}>
  <label for="search" class="block mr-1 pb-1">
    <SearchIcon />
  </label>

  <input
    id="search"
    class="w-full md:w-48 outline-none placeholder-gray-700"
    placeholder="type to search..."
    on:focus={() => {
      focus = true;
    }}
    bind:value={_inputValue}
    on:blur={() => {
      focus = false;
    }} />
</div>
