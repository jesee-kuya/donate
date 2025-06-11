<script lang="ts">
  import type { Project } from '$lib/types';
  import confetti from 'canvas-confetti';
  
  export let project: Project;
  export let isOpen = false;
  export let showThankYou = false;
  
  let donationAmount: number | null = null;
  
  // Dispatch events for user actions
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  function handleClose() {
      dispatch('close');
  }
  
  async function handleSubmit(e: Event) {
      e.preventDefault();
      
      // Simulate donation processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch('donate', { 
          projectId: project.id, 
          amount: donationAmount 
      });
      
      showThankYou = true;
      
      // Trigger confetti
      confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
      });
      
      // Close modal after 3 seconds
      setTimeout(() => {
          handleClose();
      }, 3000);
  }
</script>

{#if isOpen}
  <div 
      id="donation-modal" 
      class="modal-overlay" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title-heading"
      on:click|self={handleClose}
  >
      <div class="modal-content">
          <button 
              class="close-button" 
              on:click={handleClose}
              aria-label="Close donation modal"
          >&times;</button>
          
          <h3 id="modal-title-heading">Donate to <span>{project.title}</span></h3>
          <p>Your contribution will make a real difference. Thank you for your generosity.</p>
          
          {#if !showThankYou}
              <form id="donation-form" on:submit={handleSubmit}>
                  <div class="form-group">
                      <label for="donation-amount">Amount ($)</label>
                      <input 
                          type="number" 
                          id="donation-amount" 
                          min="1" 
                          step="1" 
                          placeholder="Enter amount"
                          required
                          bind:value={donationAmount}
                      />
                  </div>
                  <button type="submit" class="btn btn-primary">
                      Donate Anonymously
                  </button>
              </form>
          {:else}
              <div id="thank-you-message" aria-live="polite">
                  <h4>Thank you!</h4>
                  <p>Your donation has been received.</p>
              </div>
          {/if}
      </div>
  </div>
{/if}

<style>
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
  }
  
  .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      position: relative;
  }
  
  .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
  }
  
  .form-group {
      margin-bottom: 1.5rem;
  }
  
  input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cbd5e0;
      border-radius: 4px;
      font-size: 1rem;
  }
  
  .btn-primary {
      background-color: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      width: 100%;
  }
  
  #thank-you-message {
      text-align: center;
      padding: 2rem;
      background-color: #f0fdf4;
      border-radius: 8px;
      border: 1px solid #bbf7d0;
  }
</style>