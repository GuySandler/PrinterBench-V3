<script>
  import { P, Card } from "flowbite-svelte";
    // import { userRulesTest } from "$lib/firebase";

</script>
<div>
    <img src="src/images/printerbench.svg" style="display:inline-block; width:10vw; height:10vw" alt="PrinterBench Logo" />
    <P size="5xl" style="display:inline-block;" align="center">PrinterBench</P>

    <P align="center" size="2xl">Making picking a printer easy</P>

    <Card href="/add">
        <P size="xl" align="center">Add Printer</P>
        <P align="center">help contribute to the database with a simple form</P>
    </Card>
    <Card href="/leaderboard">
        <P size="xl" align="center">Leaderboard</P>
        <P align="center">See the top or see where your printer stands</P>
    </Card>
    <Card href="/leaderboard">
        <P size="xl" align="center">Add Reviews</P>
        <P align="center">Look for your Printer and Add a Review</P>
    </Card>
</div>
<!-- <button on:click={userRulesTest}>test</button> -->