<script>
  import "./main.css";
  import { Route, router } from "tinro";
  import UserSearch from "./routes/UserSearch.svelte";
  import About from "./routes/About.svelte";
</script>

<div class="bg-gray-100 min-h-screen subpixel-antialiased">
  <!-- <Nav /> -->
  <div class="flex justify-center">
    <div class="w-11/12">
      <Route path="/">
        <UserSearch />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </div>
  </div>
</div>
