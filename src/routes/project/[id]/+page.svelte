<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';
	import { mpesa } from '$lib/mpesa.js';
	import Header from '$lib/components/header.svelte';
	import DonationForm from '$lib/components/donation-form.svelte';

	import { get } from 'svelte/store';

	let project: any = null;
	let donations: any[] = [];
	let showDonationForm = false;

	// Reactive page params
	let projectId: string;

	projectId = $page.params.id;

	onMount(() => {
		project = db.projects.getById(projectId);
		donations = db.donations.getByProject(projectId);
	});

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-KE', {
			style: 'currency',
			currency: 'KES',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Reactive percentage calculation
	$: progressPercentage = project
		? Math.min((project.current_amount / project.target_amount) * 100, 100)
		: 0;
</script>

<svelte:head>
	<title>{project?.title || 'Project'} - Donate</title>
</svelte:head>

<Header />

{#if project}
	<div class="container mx-auto px-4 py-8">
		<div class="mx-auto max-w-4xl">
			<!-- Back Button -->
			<a href="/" class="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800">
				<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
				Back to Projects
			</a>

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<!-- Main Content -->
				<div class="lg:col-span-2">
					<img
						src={project.image_url || '/placeholder.svg'}
						alt={project.title}
						class="mb-6 h-64 w-full rounded-lg object-cover"
					/>

					<div class="mb-4">
						<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
							{project.category}
						</span>
					</div>

					<h1 class="mb-4 text-3xl font-bold text-gray-900">{project.title}</h1>
					<p class="mb-8 text-lg leading-relaxed text-gray-700">{project.description}</p>

					<!-- Recent Donations -->
					<div class="rounded-lg bg-gray-50 p-6">
						<h3 class="mb-4 text-lg font-semibold">Recent Donations</h3>
						{#if donations.length > 0}
							<div class="space-y-3">
								{#each donations.slice(0, 5) as donation}
									<div class="flex items-center justify-between rounded bg-white p-3">
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
					<div class="sticky top-6 rounded-lg bg-white p-6 shadow-lg">
						<div class="mb-6">
							<div class="mb-2 flex justify-between text-sm text-gray-600">
								<span>Raised</span>
								<span>{Math.round(progressPercentage)}% of goal</span>
							</div>
							<div class="mb-1 text-2xl font-bold text-gray-900">
								{formatCurrency(project.current_amount)}
							</div>
							<div class="mb-3 text-gray-600">
								of {formatCurrency(project.target_amount)} goal
							</div>
							<div class="h-3 w-full rounded-full bg-gray-200">
								<div
									class="h-3 rounded-full bg-green-500 transition-all duration-300"
									style="width: {progressPercentage}%"
								></div>
							</div>
						</div>

						<div class="mb-6">
							<p class="mb-2 text-sm text-gray-600">
								<strong>{donations.length}</strong> donations
							</p>
						</div>

						{#if !showDonationForm}
							<button
								onclick={() => (showDonationForm = true)}
								class="w-full rounded-lg bg-blue-600 px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
							>
								Donate Now
							</button>
						{:else}
							<DonationForm {project} />
						{/if}

						<div class="mt-4 text-center text-xs text-gray-500">
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
			<a href="/" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
				Return to projects
			</a>
		</div>
	</div>
{/if}
