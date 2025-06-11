<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';
	import { mpesa } from '$lib/mpesa.js';
	import Header from '$lib/components/header.svelte';
	import DonationForm from '$lib/components/donation-form.svelte';

	let project = $state(null);
	let donations = $state([]);
	let showDonationForm = $state(false);

	onMount(() => {
		const projectId = $page.params.id;
		project = db.projects.getById(projectId);
		donations = db.donations.getByProject(projectId);
	});

	function formatCurrency(amount) {
		return new Intl.NumberFormat('en-KE', {
			style: 'currency',
			currency: 'KES',
			minimumFractionDigits: 0
		}).format(amount);
	}

	const progressPercentage = $derived(
		project ? Math.min((project.current_amount / project.target_amount) * 100, 100) : 0
	);
</script>

<svelte:head>
	<title>{project?.title || 'Project'} - DonateKenya</title>
</svelte:head>

<Header />

{#if project}
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-4xl mx-auto">
			<!-- Back Button -->
			<a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
				<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				Back to Projects
			</a>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2">
					<img 
						src={project.image_url || "/placeholder.svg"} 
						alt={project.title}
						class="w-full h-64 object-cover rounded-lg mb-6"
					/>
					
					<div class="mb-4">
						<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
							{project.category}
						</span>
					</div>
					
					<h1 class="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
					<p class="text-gray-700 text-lg leading-relaxed mb-8">{project.description}</p>
					
					<!-- Recent Donations -->
					<div class="bg-gray-50 rounded-lg p-6">
						<h3 class="text-lg font-semibold mb-4">Recent Donations</h3>
						{#if donations.length > 0}
							<div class="space-y-3">
								{#each donations.slice(0, 5) as donation}
									<div class="flex items-center justify-between bg-white p-3 rounded">
										<div>
											<p class="font-medium">Anonymous Donor</p>
											<p class="text-sm text-gray-500">
												{new Date(donation.created_at).toLocaleDateString()}
											</p>
										</div>
										<span class="font-bold text-green-600">
											{formatCurrency(donation.amount)}
										</span>
									</div>
								{/each}
							</div>
						{:else}
							<p class="text-gray-500">Be the first to donate to this project!</p>
						{/if}
					</div>
				</div>

				<!-- Donation Sidebar -->
				<div class="lg:col-span-1">
					<div class="bg-white rounded-lg shadow-lg p-6 sticky top-6">
						<div class="mb-6">
							<div class="flex justify-between text-sm text-gray-600 mb-2">
								<span>Raised</span>
								<span>{Math.round(progressPercentage)}% of goal</span>
							</div>
							<div class="text-2xl font-bold text-gray-900 mb-1">
								{formatCurrency(project.current_amount)}
							</div>
							<div class="text-gray-600 mb-3">
								of {formatCurrency(project.target_amount)} goal
							</div>
							<div class="w-full bg-gray-200 rounded-full h-3">
								<div 
									class="bg-green-500 h-3 rounded-full transition-all duration-300"
									style="width: {progressPercentage}%"
								></div>
							</div>
						</div>

						<div class="mb-6">
							<p class="text-sm text-gray-600 mb-2">
								<strong>{donations.length}</strong> donations
							</p>
						</div>

						{#if !showDonationForm}
							<button
								onclick={() => showDonationForm = true}
								class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
							>
								Donate Now
							</button>
						{:else}
							<DonationForm {project} />
						{/if}

						<div class="mt-4 text-xs text-gray-500 text-center">
							<p>✓ Secure Mpesa Payment</p>
							<p>✓ 100% Anonymous</p>
							<p>✓ Instant Processing</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container mx-auto px-4 py-8">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900">Project not found</h1>
			<a href="/" class="text-blue-600 hover:text-blue-800 mt-4 inline-block">
				Return to projects
			</a>
		</div>
	</div>
{/if}
