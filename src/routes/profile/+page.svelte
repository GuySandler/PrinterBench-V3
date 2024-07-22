<script>
    import { P, Card } from "flowbite-svelte";
    import { GetUserFavs } from "$lib/firebase";
</script>
<div>
    <button on:click={GetUserFavs}>Get Favorites</button>
</div>