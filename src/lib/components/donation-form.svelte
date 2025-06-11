<script lang="ts">
	import { db } from '$lib/db.js';
	import { mpesa } from '$lib/mpesa.js';

	let { project } = $props();

	let amount = $state('');
	let phoneNumber = $state('');
	let message = $state('');
	let isProcessing = $state(false);
	let donationStatus = $state(null);

	const predefinedAmounts = [500, 1000, 2500, 5000];

	async function handleDonation() {
		if (!amount || !phoneNumber) {
			donationStatus = { type: 'error', message: 'Please fill in all required fields' };
			return;
		}

		if (parseFloat(amount) < 10) {
			donationStatus = { type: 'error', message: 'Minimum donation amount is KES 10' };
			return;
		}

		isProcessing = true;
		donationStatus = null;

		try {
			// Create donation record
			const donation = db.donations.create({
				project_id: project.id,
				amount: parseFloat(amount),
				phone_number: phoneNumber,
				donor_message: message,
				status: 'pending'
			});

			// Initiate Mpesa payment
			const mpesaResponse = await mpesa.initiateSTKPush(
				phoneNumber,
				parseFloat(amount),
				`DONATION-${donation.id}`,
				`Donation to ${project.title}`
			);

			if (mpesaResponse.ResponseCode === '0') {
				// Update project amount (in real app, do this after payment confirmation)
				db.projects.updateAmount(project.id, parseFloat(amount));
				
				donationStatus = { 
					type: 'success', 
					message: 'Payment request sent! Please check your phone and enter your Mpesa PIN.' 
				};
				
				// Reset form
				amount = '';
				phoneNumber = '';
				message = '';
			} else {
				donationStatus = { 
					type: 'error', 
					message: 'Payment failed. Please try again.' 
				};
			}
		} catch (error) {
			console.error('Donation error:', error);
			donationStatus = { 
				type: 'error', 
				message: 'An error occurred. Please try again.' 
			};
		} finally {
			isProcessing = false;
		}
	}

	function setAmount(value) {
		amount = value.toString();
	}
</script>

<div class="space-y-4">
	<h3 class="text-lg font-semibold">Make a Donation</h3>
	
	<!-- Predefined Amounts -->
	<div class="grid grid-cols-2 gap-2">
		{#each predefinedAmounts as presetAmount}
			<button
				onclick={() => setAmount(presetAmount)}
				class="p-2 border rounded-lg hover:bg-gray-50 transition-colors {amount === presetAmount.toString() ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}"
			>
				KES {presetAmount.toLocaleString()}
			</button>
		{/each}
	</div>

	<!-- Custom Amount -->
	<div>
		<label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
			Custom Amount (KES)
		</label>
		<input
			id="amount"
			type="number"
			bind:value={amount}
			placeholder="Enter amount"
			min="10"
			class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
	</div>

	<!-- Phone Number -->
	<div>
		<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
			Mpesa Phone Number *
		</label>
		<input
			id="phone"
			type="tel"
			bind:value={phoneNumber}
			placeholder="254712345678"
			class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		/>
		<p class="text-xs text-gray-500 mt-1">Format: 254XXXXXXXXX</p>
	</div>

	<!-- Optional Message -->
	<div>
		<label for="message" class="block text-sm font-medium text-gray-700 mb-1">
			Message (Optional)
		</label>
		<textarea
			id="message"
			bind:value={message}
			placeholder="Leave an encouraging message..."
			rows="3"
			class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
		></textarea>
	</div>

	<!-- Status Messages -->
	{#if donationStatus}
		<div class="p-3 rounded-lg {donationStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}">
			{donationStatus.message}
		</div>
	{/if}

	<!-- Submit Button -->
	<button
		onclick={handleDonation}
		disabled={isProcessing}
		class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
	>
		{#if isProcessing}
			<span class="flex items-center justify-center">
				<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Processing...
			</span>
		{:else}
			Donate KES {amount || '0'}
		{/if}
	</button>

	<p class="text-xs text-gray-500 text-center">
		Your donation is anonymous and secure. You'll receive an SMS confirmation.
	</p>
</div>
