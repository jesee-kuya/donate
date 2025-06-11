<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';
	import ProjectCard from '$lib/components/project-card.svelte';
	import Header from '$lib/components/header.svelte';

	let projects: any[] = [];
	let selectedCategory: string = 'all';
	let categories: string[] = ['all', 'Education', 'Healthcare', 'Technology', 'Agriculture'];

	onMount(() => {
		projects = db.projects.getAll();
	});

	// Reactive derived value
	$: filteredProjects = selectedCategory === 'all'
		? projects
		: projects.filter(p => p.category === selectedCategory);
</script>


<svelte:head>
	<title>Donate - Support Social Projects</title>
	<meta name="description" content="Anonymously donate to social projects in Kenya. Support education, healthcare, technology, and agriculture initiatives." />
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<div class="text-center mb-12">
		<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
			Make a Difference Today
		</h1>
		<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
			Support meaningful social projects across Kenya. Every donation, no matter the size, 
			creates lasting impact in communities that need it most.
		</p>
		<div class="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
			<p class="text-green-800 font-medium">✓ 100% Anonymous Donations</p>
			<p class="text-green-800 font-medium">✓ Secure Mpesa Payments</p>
			<p class="text-green-800 font-medium">✓ Direct Impact Tracking</p>
		</div>
	</div>

	<!-- Category Filter -->
	<div class="flex flex-wrap justify-center gap-2 mb-8">
		{#each categories as category}
			<button
				class="px-4 py-2 rounded-full border transition-colors {selectedCategory === category 
					? 'bg-blue-600 text-white border-blue-600' 
					: 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'}"
				onclick={() => selectedCategory = category}
			>
				{category === 'all' ? 'All Projects' : category}
			</button>
		{/each}
	</div>

	<!-- Projects Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredProjects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	</div>

	{#if filteredProjects.length === 0}
		<div class="text-center py-12">
			<p class="text-gray-500 text-lg">No projects found in this category.</p>
		</div>
	{/if}
</div>
