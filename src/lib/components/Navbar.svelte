<script lang="ts">
  // Instance script: import the type
  import type { NavLink } from '$lib/types';

  // Now use it for your data
  const navLinks: NavLink[] = [
    { href: '/',     label: 'Home'   },
    { href: '/donate',  label: 'Donate' },
    { href: '/about', label: 'About'  },
    { href: '/admin', label: 'Admin'  }
  ];
</script>

<nav class="p-4 border-b shadow-md text-center bg-white">
  <h1 class="text-2xl font-bold mb-1">
    <a href="/" class="hover:text-var(--primary-hover-color)">Kindred Spirits</a>
  </h1>
  <p class="text-sm text-var(--text-muted-color) mb-2">
    Support social projects, anonymously.
  </p>
  <ul class="flex justify-center space-x-6">
    {#each navLinks as link}
      <li>
        <a href={link.href} class="hover:text-var(--primary-hover-color)">
          {link.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
