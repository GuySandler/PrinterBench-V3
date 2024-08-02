<script lang="ts">
    import { Label, Input, Button, Select, Toggle, Range, P, Popover } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';
    import { Confetti } from "svelte-confetti"
    import { profileImg, expertMode, profileImportant } from "../../stores";
    import { test, addData } from "$lib/firebase"
    import {  } from "../../stores";
    let expert = false;
    expertMode.subscribe((value) => {
        expert = value;
    });
    function CalculatePoints() {
        let points = 0;
        if (autoZOffset) points += 40;
        if (autoBedLeveling) points += 40;
        if (powerLossRecovery) points += 30;
        if (filamentRunOutSensor) points += 25;
        if (airPurifier) points += 20;
        if (inputShaping) points += 25;
        if (camera) points += 20;
        if (wifi) points += 20;
        if (remoteAccess) points += 20;
        if (touchscreen) points += 20;
        if (enclosure) points += 20;
        if (openSource) points += 25;
        if (multicolor) points += 15;
        points += (110/(parseInt(price)+5))*100 // price
        if (type == "delta") points += Math.round(Math.cbrt((parseInt(sized)*parseInt(sizez)))/8.5) // volume
        else if (type != "delta") points += Math.round(Math.cbrt((parseInt(sizex)*parseInt(sizey)*parseInt(sizez)))/8.5) // volume
        points += (0.025*Math.log(parseInt(speed))*(2+parseInt(speed))+10)/2 // speed
        points += Math.round(parseInt(acceleration)/255) // acceleration
        return Math.round(points);
    }
    const handleSubmit = () => {
        if (name != "" && brand != "" && price != "" && type != "" && link != "" && speed != "" && acceleration != "" && sizex != "" && sizey != "" && sizez != "") {
            console.log("Submitting data");
            let data = [];
            data.push({
                name: name,
                brand: brand,
                price: Math.round(parseInt(price)),
                type: type,
                link: link,
                speed: Math.round(parseInt(speed)),
                acceleration: Math.round(parseInt(acceleration)),
                sizex: Math.round(parseInt(sizex)),
                sizey: Math.round(parseInt(sizey)),
                sizez: Math.round(parseInt(sizez)),
                autoZOffset: autoZOffset,
                autoBedLeveling: autoBedLeveling,
                powerLossRecovery: powerLossRecovery,
                filamentRunOutSensor: filamentRunOutSensor,
                airPurifier: airPurifier,
                inputShaping: inputShaping,
                camera: camera,
                wifi: wifi,
                remoteAccess: remoteAccess,
                touchscreen: touchscreen,
                rating: Math.round(parseInt(rating)),
                enclosure: enclosure,
                multicolor: multicolor,
                multicolorPrice: Math.round(parseInt(multicolorPrice)),
                points: CalculatePoints(),
                diameter: type == "delta" ? sized : 0,
                plugnplay: plugnplay,
                preBuilt: preBuilt,
                opensource: openSource,
                affiliateLink: affiliateLink,
                channelName: channelName
            });
            console.log(data);

            console.log(CalculatePoints())
            addData("pending", JSON.stringify(data));
            done = true;
        } else {
            console.log("Please fill out all fields");
        }
    };
    let rating = 2.5;
    let name = "";
    let brand = "";
    let price = "";
    let type = "";
    let link = "";
    let speed = "";
    let acceleration = "";
    let sizex = "";
    let sizey = "";
    let sizez = "";
    let sized = "";
    let autoZOffset = false;
    let autoBedLeveling = false;
    let powerLossRecovery = false;
    let filamentRunOutSensor = false;
    let airPurifier = false;
    let inputShaping = false;
    let camera = false;
    let wifi = false;
    let remoteAccess = false;
    let touchscreen = false;
    let multicolor = false;
    let multicolorPrice = "";
    let enclosure = false;
    let openSource = false;
    let plugnplay = false;
    let preBuilt = false;
    let affiliateLink = "";
    let channelName = "";

    let config = {
        readOnly: false,
        countStars: 7,
        range: {min: 0, max: 7},
        score: rating,
        showScore: true,
        scoreFormat: function(){ return `(${this.score.toFixed(0)}/${this.countStars})` },
        starConfig: {
            size: 500,
            fillColor: '#FFFFFF',
            strokeColor: "#FFFFFF",
            unfilledColor: '#FFFFFF',
            strokeUnfilledColor: '#FFFFFF'
        }
    }
    onMount(() => {
        var done = false;
    });
    var done = false;
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { onMount } from "svelte";

    inject({ mode: dev ? 'development' : 'production' });

    let isLoggedIn = false;
    profileImg.subscribe((value) => {
        if (value != "") {
            isLoggedIn = true;
        }
    });
    let isImportant = false;
    profileImportant.subscribe((value) => {
        isImportant = value;
    });
</script>
<style>
  .spacer {
    height: 10px;
  }
</style>
{#if !done}
<div class="w-9/12">
    {#if isLoggedIn}
    <form>
        <Label for="name">Printer Name</Label>
        <Input bind:value={name} autocomplete="autocomplete_off_randString"  id="name" placeholder="Ender 3 V3 SE" />

        <Label for="brand">Printer Brand</Label>
        <Input bind:value={brand} autocomplete="autocomplete_off_randString"  id="brand" placeholder="Prusa" />

        <Label for="brand">Printer Price (usd)</Label>
        <Input bind:value={price} autocomplete="autocomplete_off_randString"  id="brand" placeholder="600" />

        <Label for="type">Type</Label>
        <Select bind:value={type} id="type">
            <option value=bedslinger>Bedslinger</option>
            <option value=corexy>CoreXY</option>
            <option value=delta>Delta</option>
            <!-- <option value=resin>resin</option> -->
        </Select>

        {#if !isImportant}
            <Label for="link">Shop Link</Label>
            <Input bind:value={link} autocomplete="autocomplete_off_randString"  id="link" placeholder="https://www.prusa3d.com/product/original-prusa-mk4/" />
        {:else}
            <Label for="link">Your Affiliate Link (or shop)</Label>
            <Input bind:value={affiliateLink} autocomplete="autocomplete_off_randString"  id="link" placeholder="https://www.prusa3d.com/product/original-prusa-mk4/" />
            <Label for="referal">Your Channel Name</Label>
            <Input bind:value={channelName} autocomplete="autocomplete_off_randString"  id="referal" placeholder="Prusa3d" />
        {/if}
        <Label class="inline-block" for="brand">Speed (If you can't find it google)</Label>
        <svg id="speedTooltip" class="w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <Popover class="z-10 w-64 text-sm font-light " title="Speed" triggeredBy="#speedTooltip">The max speed of laying down material.</Popover>
        <Input bind:value={speed} autocomplete="autocomplete_off_randString"  id="speed" placeholder="600" />

        <Label class="inline-block" for="brand">Acceleration (according to offical website in mm/s)</Label>
        <svg id="accelerationTooltip" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <Popover class="z-10 w-64 text-sm font-light" title="Acceleration" triggeredBy="#accelerationTooltip">The max movement speed, does not really matter in terms of printing speed.</Popover>
        <Input bind:value={acceleration} autocomplete="autocomplete_off_randString"  id="brand" placeholder="20000" />

        {#if type != "delta"}
            <div style="display:inline-block">
                <Label for="type">Build Size X (mm)</Label>
                <Input type="number" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" bind:value={sizex} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size X (mm)" />
            </div>
            <div style="display:inline-block">
                <Label for="type">Build Size Y (mm)</Label>
                <Input type="number" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" bind:value={sizey} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size Y (mm)" />
            </div>
        {:else if type == "delta"}
            <div style="display:inline-block">
                <Label for="type">Build Size Diameter ⌀ (mm)</Label>
                <Input type="number" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" bind:value={sized} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size diameter ⌀ (mm)" />
            </div>
        {/if}
        <div style="display:inline-block">
            <Label for="type">Build Size Z (mm)</Label>
            <Input type="number" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" bind:value={sizez} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size Z (mm)" />
        </div>
        <Label for="features">Features</Label>
        <div style="display:inline-block;border-right:1px solid gray;padding-right:15px">

            <Toggle bind:checked={autoZOffset}>
                Auto Z offset
                <svg id="ZOffsetTooltip" style="margin-left:5px" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <Popover class="z-10 w-64 text-sm font-light " title="Auto Z offset" triggeredBy="#ZOffsetTooltip">Some kind of mechanism that automatically gets the appropriate distance between the nozzle and the bed for the first layer.</Popover>
            </Toggle>

            <div class="spacer" />

            <Toggle bind:checked={autoBedLeveling}>
                Auto Bed Leveling
                <svg id="BedLevelTooltip" style="margin-left:5px" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <Popover class="z-10 w-64 text-sm font-light " title="Auto Bed Leveling" triggeredBy="#BedLevelTooltip">The bed isn't always flat so this mechanism helps get the offsets from diffrent positions of the bed to fix it.</Popover>
            </Toggle>

            <div class="spacer" />

            <Toggle bind:checked={powerLossRecovery}>
                Power Loss Recovery
                <svg id="PowerLossTooltip" style="margin-left:5px" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <Popover class="z-10 w-64 text-sm font-light " title="Power Loss Recovery" triggeredBy="#PowerLossTooltip">Allows printer to continue a print if the power suddenly cuts out.</Popover>
            </Toggle>

            <div class="spacer" />

            <Toggle bind:checked={filamentRunOutSensor}>
                Filament Run-out Sensor
                <svg id="RunoutTooltip" style="margin-left:5px" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <Popover class="z-10 w-64 text-sm font-light " title="Filament Run-out Sensor" triggeredBy="#RunoutTooltip">Detects if there is no more filament and pauses.</Popover>
            </Toggle>

            <div class="spacer" />

            <Toggle bind:checked={openSource}>Open Source</Toggle>
        </div>
        <div style="display:inline-block;border-right:1px solid gray;margin-left:15px;padding-right:15px">

            <Toggle bind:checked={airPurifier}>Air Purifier</Toggle>

            <div class="spacer" />

            <Toggle bind:checked={inputShaping}>
                Input Shaping
                <svg id="InputShapingTooltip" style="margin-left:5px" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <Popover class="z-10 w-64 text-sm font-light " title="Input Shaping" triggeredBy="#InputShapingTooltip">A mechanism that adjusts the motion of the printer to reduce/compensate vibrations and improve print quality.</Popover>
            </Toggle>

            <div class="spacer" />

            <Toggle bind:checked={camera}>Camera</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={multicolor}>Multicolor option</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={plugnplay}>Plug & Play</Toggle>
        </div>
        <div style="display:inline-block;margin-left:15px;">
            <Toggle bind:checked={wifi}>Wifi</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={remoteAccess}>Remote Access</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={touchscreen}>Touchscreen</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={enclosure}>
                Enclosure
                <svg id="EnclosureTooltip" style="margin-left:5px" class="inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <Popover class="z-10 w-64 text-sm font-light " title="EnclosureTooltip" triggeredBy="#EnclosureTooltip">Some printers come with enclosures allowing you to print materials like ABS</Popover>
            </Toggle>
            <div class="spacer" />
            <Toggle bind:checked={preBuilt}>Pre-Built</Toggle>
        </div>
        {#if multicolor}
            <Label for="brand">Multicolor Price (cheapest in usd)</Label>
            <Input bind:value={multicolorPrice} autocomplete="autocomplete_off_randString"  id="brand" placeholder="300" />
        {/if}

        <Label for="brand">Overall Rating (0.00 - 5.00)</Label>
        <div style="display:inline-block">
            <StarRating config={config} rating={rating} />
        </div>
        <Range bind:value={rating} style="width:20vw;margin-right:10px;padding-right:10px" max={5} step={0.25} id="rating" />
        <P size="3xl" style="display:inline-flex;width:5vw">{rating}</P>
        {#if expert}
            <div style="margin-top:10px">
                <P align="center" size="2xl">Optional Expert Options</P>
                <Label for="features">Features</Label>
                <Input autocomplete="autocomplete_off_randString" />
            </div>
        {/if}
        <br>
        <Button type="submit" on:click={handleSubmit}>Submit</Button>
    </form>
    {/if}
    {#if !isLoggedIn}
        <P align="center" size="2xl">Please log in to submit a printer</P>
    {/if}
</div>
{/if}
{#if done}
<div style="
    position: fixed;
    top: -50px;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;">
        <Confetti x={[-5, 5]} y={[0, 0.2]} delay={[0, 0]} infinite duration=5000 amount=300 fallDistance="100vh" />
</div>
    <P align="center" size="2xl">Thank you for submitting!</P>
    <P align="center" size="2xl">Your submittion is under review and will be added soon</P>
    <Button on:click={() => done = false}>Submit another</Button>
{/if}
