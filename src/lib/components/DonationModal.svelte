  <script lang="ts">
    import type { Project } from '$lib/types';
    export let project: Project;
    export let onClose!: () => void;
    let amount = 0;
    let message = '';
    let submitted = false;
  
    function close() {
      onClose();
    }
  
    function submit() {
      // TODO: call backend / M-Pesa API
      console.log(`Donated $${amount} to ${project.title}`, message);
      submitted = true;
    }
  </script>
  
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-button" on:click={close} aria-label="Close">&times;</button>
      {#if !submitted}
        <h3 id="modal-title-heading">Donate to <strong>{project.title}</strong></h3>
        <p>Your contribution will make a real difference. Thank you!</p>
        <form on:submit|preventDefault={submit}>
          <div class="form-group">
            <label for="amount">Amount ($)</label>
            <input id="amount" type="number" bind:value={amount} min="1" required />
          </div>
          <div class="form-group">
            <label for="message">Message (optional)</label>
            <input id="message" type="text" bind:value={message} />
          </div>
          <button type="submit" class="btn btn-primary">Donate Anonymously</button>
        </form>
      {:else}
        <div id="thank-you-message">
          <h4>Thank you!</h4>
          <p>Your donation has been received.</p>
          <button class="btn" on:click={close}>Close</button>
        </div>
      {/if}
    </div>
  </div>
  