<script>
    import "../app.css";
    import Navbar from "./navbar.svelte";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    
    inject({ mode: dev ? 'development' : 'production' });
</script>
<div><center>
    <nav>
        <Navbar />
    </nav>
    <slot />
</center></div>