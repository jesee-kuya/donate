<script lang="ts">
    import LoginForm from '$lib/components/LoginForm.svelte';
    import Dashboard from '$lib/components/Dashboard.svelte';
    import type { Donation } from '$lib/types';
  
    let isAuthenticated = false;
  
    function handleLogin(event: CustomEvent<{ username: string; password: string }>) {
      const { username, password } = event.detail;
      // Replace with real auth check:
      if (username === 'admin' && password === 'password') {
        isAuthenticated = true;
      }
    }
  
    function handleLogout() {
      isAuthenticated = false;
    }
  
    function handleDownload() {
      // Example static data — replace with real fetch
      const donations: Donation[] = [
        { project: 'Clean Water Initiative', amount: 200, date: '2025-06-09' },
        { project: 'School Kits for Kids',    amount: 100, date: '2025-06-10' }
      ];
  
      const csv = [
        ['Project', 'Amount', 'Date'],
        ...donations.map(d => [d.project, d.amount.toString(), d.date])
      ]
        .map(row => row.join(','))
        .join('\n');
  
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'donations.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  </script>
  
  {#if !isAuthenticated}
    <LoginForm on:login={handleLogin} />
  {:else}
    <Dashboard on:logout={handleLogout} on:download={handleDownload} />
  {/if}
  