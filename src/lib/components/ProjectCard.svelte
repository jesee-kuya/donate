<script lang="ts">
  import type { Project } from '$lib/types';
  export let project: Project;
  export let onSelect: (proj: Project) => void;
</script>

<button
  type="button"
  class="project-card text-left"
  on:click={() => onSelect(project)}
>
  <h3 class="text-lg font-semibold">{project.title}</h3>
  {#if project.description}
    <p class="text-sm text-var(--text-muted-color)">{project.description}</p>
  {/if}
  {#if project.totalRaised !== undefined}
    <div class="donation-info">
      Raised: <span class="total-donated">${project.totalRaised}</span>
    </div>
  {/if}
</button>
