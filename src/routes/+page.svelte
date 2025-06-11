<script lang="ts">
    import PageHeader from '$lib/components/PageHeader.svelte';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import DonationModal from '$lib/components/DonationModal.svelte';
    import PageFooter from '$lib/components/PageFooter.svelte';
    import { onMount } from 'svelte';
    import type { Project } from '$lib/types';
    
    let projects: Project[] = [];
    let selectedProject: Project | null = null;
    let showModal = false;
    let showThankYou = false;

    // Mock data - replace with actual API call
    onMount(() => {
        // In a real app, you'd fetch this from your backend
        projects = [
            { id: '1', title: 'Education for All', description: 'Providing school supplies to underprivileged children' },
            { id: '2', title: 'Clean Water Initiative', description: 'Building wells in drought-affected areas' },
            { id: '3', title: 'Animal Shelter Support', description: 'Helping abandoned pets find loving homes' },
        ];
    });

    function handleProjectSelect(event: CustomEvent<Project>) {
        selectedProject = event.detail;
        showModal = true;
        showThankYou = false;
    }
    
    function handleModalClose() {
        showModal = false;
    }
    
    function handleDonation(event: CustomEvent<{ projectId: string; amount: number }>) {
        const { projectId, amount } = event.detail;
        console.log(`Donated $${amount} to project ${projectId}`);
        // Here you would send the donation to your backend
    }
</script>

<div id="app-container">
    <PageHeader />
    
    <main>
        <h2>Our Projects</h2>
        <div id="project-list" class="project-grid">
            {#each projects as project (project.id)}
                <ProjectCard 
                    {project} 
                    on:select={handleProjectSelect} 
                />
            {/each}
        </div>
    </main>
    
    <PageFooter adminLink="/admin" />
</div>

<DonationModal 
    {project: selectedProject} 
    {isOpen: showModal} 
    {showThankYou}
    on:close={handleModalClose}
    on:donate={handleDonation}
/>

<style>
    #app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        font-family: 'Inter', sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    
    main {
        flex: 1;
    }
    
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }
    
    h2 {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
</style>