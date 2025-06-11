<script lang="ts">
    export let adminLink = "/admin";
</script>

<footer>
    <p>Built with ❤️ for a better world. | <a href={adminLink}>Admin</a></p>
</footer>

<style>
    footer {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #e2e8f0;
        text-align: center;
        color: #64748b;
    }
    
    a {
        color: #3b82f6;
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
</style>