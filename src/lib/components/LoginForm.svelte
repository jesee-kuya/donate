<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher<{
      login: { username: string; password: string };
    }>();
  
    let username = '';
    let password = '';
    let error: string | null = null;
  
    function onSubmit() {
      if (!username || !password) {
        error = 'Both fields are required.';
        return;
      }
      error = null;
      dispatch('login', { username, password });
    }
  </script>
  
  <form class="card" on:submit|preventDefault={onSubmit}>
    <h2>Admin Login</h2>
  
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" bind:value={username} type="text" required />
    </div>
  
    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" bind:value={password} type="password" required />
    </div>
  
    {#if error}
      <p class="error-message">{error}</p>
    {/if}
  
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
  