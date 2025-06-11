<script lang="ts">
    import '../app.css';
</script>

<div class="layout">
    <slot />
</div>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    :root {
        --font-inter: 'Inter', sans-serif;
    }
    
    body {
        background-color: #f8fafc;
        color: #1e293b;
        font-family: var(--font-inter);
    }
    
    @layer base {
        html {
            font-family: var(--font-inter);
        }
    }
</style>