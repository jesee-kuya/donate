<script lang="ts">
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import DonationModal from '$lib/components/DonationModal.svelte';
    import type { Project } from '$lib/types';
  
    let projects: Project[] = [
      { id: 'clean-water', title: 'Clean Water Initiative', description: 'Provide clean water to villages', totalRaised: 1200 },
      { id: 'school-kits', title: 'School Kits for Kids', description: 'Supply school kits to underprivileged children', totalRaised: 800 },
      { id: 'tree-planting', title: 'Urban Tree Planting', description: 'Plant trees in city parks', totalRaised: 450 }
    ];
  
    let selected: Project | null = null;
  
    function openModal(project: Project) {
      selected = project;
    }
  
    function closeModal() {
      selected = null;
    }
  </script>
  
  <h2 class="text-2xl font-bold mb-4">Our Projects</h2>
  <div id="project-list" class="project-grid">
    {#each projects as project (project.id)}
      <ProjectCard {project} onSelect={openModal} />
    {/each}
  </div>
  
  {#if selected}
    <!-- Pass the selected project by name -->
    <DonationModal project={selected} onClose={closeModal} />
  {/if}
  