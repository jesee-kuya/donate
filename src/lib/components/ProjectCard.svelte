<script lang="ts">
    import type { Project } from '$lib/types';
    
    export let project: Project;
    
    // Emit event when card is clicked
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div 
    class="project-card"
    on:click={() => dispatch('select', project)}
    role="button"
    tabindex="0"
    aria-label={`Donate to ${project.title}`}
>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
</div>

<style>
    .project-card {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 1.5rem;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    }
    
    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    p {
        color: #64748b;
        line-height: 1.5;
    }
</style>