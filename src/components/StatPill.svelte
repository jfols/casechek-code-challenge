<script>
  export let value = 0;
  export let label = "stat";
</script>

<div class="rounded-lg px-2 bg-gray-800 text-white mr-1 mb-1">
  <div class="flex">
    <div class="flex-none pr-1 py-1 border-r-2 border-gray-600">{value}</div>
    <div class="text-xs self-center pl-1">{label}</div>
  </div>
</div>
