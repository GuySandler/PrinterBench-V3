<script lang="ts">
    import { Label, Input, Button, Select, Toggle, Range, P } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';

    import { test, addData } from "$lib/firebase"
    const handleSubmit = () => {
        alert("Form submited.");
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
    // test();
    // condence data to JSON
    let data = [];
    data.push({
        name: name,
        brand: brand,
        price: price,
        type: type,
        link: link,
        speed: speed,
        acceleration: acceleration,
        sizex: sizex,
        sizey: sizey,
        sizez: sizez,
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
        rating: rating
    });
    // addData("test", JSON.stringify(data));
</script>
<style>
  .spacer {
    height: 10px;
  }
</style>
<div class="w-9/12">
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

        <Label for="link">Printer Brand</Label>
        <Input bind:value={link} autocomplete="autocomplete_off_randString"  id="link" placeholder="https://www.prusa3d.com/product/original-prusa-mk4/" />

        <Label for="brand">Speed (according to offical website in mm/s)</Label>
        <Input bind:value={speed} autocomplete="autocomplete_off_randString"  id="speed" placeholder="600" />
        <Label for="brand">Acceleration (according to offical website in mm/s)</Label>
        <Input bind:value={acceleration} autocomplete="autocomplete_off_randString"  id="brand" placeholder="20000" />

        <div style="display:inline-block">
            <Label for="type">Build Size X (cm)</Label>
            <Input bind:value={sizex} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size X (cm)" />
        </div>
        <div style="display:inline-block">
            <Label for="type">Build Size Y (cm)</Label>
            <Input bind:value={sizey} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size Y (cm)" />
        </div>
        <div style="display:inline-block">
            <Label for="type">Build Size Z (cm)</Label>
            <Input bind:value={sizez} style="width:10vw" autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size Z (cm)" />
        </div>
        <Label for="features">Features</Label>
        <div style="display:inline-block;border-right:1px solid gray;padding-right:15px">
            <Toggle bind:checked={autoZOffset}>Auto Z offset</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={autoBedLeveling}>Auto Bed Leveling</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={powerLossRecovery}>Power Loss Recovery</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={filamentRunOutSensor}>Filament Run-out Sensor</Toggle>
        </div>
        <div style="display:inline-block;border-right:1px solid gray;margin-left:15px;padding-right:15px">
            <Toggle bind:checked={airPurifier}>Air Purifier</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={inputShaping}>Input Shaping</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={camera}>Camera</Toggle>
        </div>
        <div style="display:inline-block;margin-left:15px;">
            <Toggle bind:checked={wifi}>Wifi</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={remoteAccess}>Remote Access</Toggle>
            <div class="spacer" />
            <Toggle bind:checked={touchscreen}>Touchscreen</Toggle>
        </div>

        <Label for="brand">Overall Rating (0.00 - 5.00)</Label>
        <div style="display:inline-block">
            <StarRating config={config} rating={rating} />
        </div>
        <Range bind:value={rating} style="width:20vw;margin-right:10px;padding-right:10px" max={5} step={0.25} id="rating" />
        <P size="3xl" style="display:inline-flex;width:5vw">{rating}</P>

        <br>
        <Button type="submit" on:click={handleSubmit}>Submit</Button>
    </form>
</div>
