<script>
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>About - Donate</title>
</svelte:head>

<Header />

<div class="container mx-auto px-4 py-8">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">About Donate</h1>
		
		<div class="prose prose-lg mx-auto">
			<p class="text-xl text-gray-600 mb-8 text-center">
				Empowering communities through transparent, anonymous donations to meaningful social projects across Kenya.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
				<div class="text-center">
					<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold mb-2">100% Anonymous</h3>
					<p class="text-gray-600">Your donations are completely anonymous. No personal information is stored or shared.</p>
				</div>

				<div class="text-center">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold mb-2">Secure Payments</h3>
					<p class="text-gray-600">All payments are processed securely through Mpesa, Kenya's most trusted mobile payment platform.</p>
				</div>

				<div class="text-center">
					<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
						</svg>
					</div>
					<h3 class="text-lg font-semibold mb-2">Direct Impact</h3>
					<p class="text-gray-600">Track the real-time progress of projects and see exactly how your donations are making a difference.</p>
				</div>
			</div>

			<div class="bg-gray-50 rounded-lg p-8 mb-8">
				<h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
				<p class="text-gray-700 mb-4">
					Donate was created to bridge the gap between generous hearts and meaningful social projects across Kenya. 
					We believe that everyone deserves the opportunity to make a positive impact, regardless of the size of their contribution.
				</p>
				<p class="text-gray-700">
					Our platform focuses on transparency, security, and anonymity, ensuring that your donations reach the projects 
					that need them most while protecting your privacy.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
					<ol class="space-y-3 text-gray-700">
						<li class="flex items-start">
							<span class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
							Browse verified social projects across different categories
						</li>
						<li class="flex items-start">
							<span class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
							Choose a project that resonates with you
						</li>
						<li class="flex items-start">
							<span class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
							Make a secure donation using Mpesa
						</li>
						<li class="flex items-start">
							<span class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
							Track the project's progress in real-time
						</li>
					</ol>
				</div>

				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">Project Categories</h3>
					<ul class="space-y-2 text-gray-700">
						<li class="flex items-center">
							<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							Education & Learning
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							Healthcare & Wellness
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							Technology & Innovation
						</li>
						<li class="flex items-center">
							<svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
							</svg>
							Agriculture & Environment
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
