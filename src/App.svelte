<script>
  import "./main.css";
  import { Route, router } from "tinro";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";

  router.subscribe((value) => {
    console.log("pageview: ", value, window.location);
    try {
      gtag("config", "GA-YOUR-CODE-HERE", {
        page_location: window.location,
        page_path: value,
      });
    } catch (error) {
      console.warn("gtag not loaded...");
    }
  });
</script>

<div class="bg-gray-100 min-h-screen subpixel-antialiased">
  <!-- <Nav /> -->
  <div class="flex justify-center">
    <div class="w-11/12 sm:w-4/5 md:w-3/5">
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </div>
  </div>
</div>
