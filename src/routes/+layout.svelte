<script lang="ts">
    import '../app.css'; 
    import Navbar from '$lib/components/Navbar.svelte';
  </script>
  
  <Navbar />
  <main id="app-container">
    <slot />
  </main>
  