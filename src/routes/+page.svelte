<script>
    import { P, Card } from "flowbite-svelte";
    // import { userRulesTest } from "$lib/firebase";
    import logo from '$lib/images/printerbench.svg';
    import { expertMode } from "../stores";
    let test = false;
    expertMode.subscribe((value) => {
        test = value;
    });
</script>
<div>
    <img src={logo} style="display:inline-block; width:10vw; height:10vw" alt="PrinterBench Logo"/>
    <P size="5xl" style="display:inline-block;" align="center">PrinterBench</P>

    <P align="center" size="2xl">Making picking a printer easy</P>

    <div>
        <Card style="margin:10px;display:inline-block;height:10vh;vertical-align:top;" href="/add">
            <P size="xl" align="center">Add Printer</P>
            <P align="center">help contribute to the database with a simple form</P>
        </Card>
        <Card style="margin:10px;display:inline-block;height:10vh;vertical-align:top;" href="/leaderboard">
            <P size="xl" align="center">Leaderboard</P>
            <P align="center">See the top or see where your printer stands</P>
        </Card>
        <Card style="margin:10px;display:inline-block;height:10vh;vertical-align:top;" href="/leaderboard">
            <P size="xl" align="center">Add Reviews</P>
            <P align="center">Look for your Printer and Add a Review</P>
        </Card>
    </div>
    <!-- <P>{test}</P> -->
</div>
<!-- <button on:click={userRulesTest}>test</button> -->