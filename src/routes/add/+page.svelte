<script lang="ts">
  import { Label, Input, Button, Select, Textarea, Toggle } from "flowbite-svelte";
  const handleSubmit = () => {
    alert("Form submited.");
  };
</script>
<style>
  .spacer {
    height: 10px;
  }
</style>
<div class="w-9/12">
    <form>
        <Label for="name">Printer Name</Label>
        <Input autocomplete="autocomplete_off_randString"  id="name" placeholder="Ender 3 V3 SE" />

        <Label for="brand">Printer Brand</Label>
        <Input autocomplete="autocomplete_off_randString"  id="brand" placeholder="Prusa" />

        <Label for="type">Type</Label>
        <Select id="type">
            <option value=bedslinger>Bedslinger</option>
            <option value=corexy>CoreXY</option>
            <option value=delta>Delta</option>
            <!-- <option value=resin>resin</option> -->
        </Select>

        <Label for="brand">Speed (according to offical website in mm/s)</Label>
        <Input autocomplete="autocomplete_off_randString"  id="brand" placeholder="600" />
        <Label for="brand">Acceleration (according to offical website in mm/s)</Label>
        <Input autocomplete="autocomplete_off_randString"  id="brand" placeholder="20000" />

        <Label for="type">Build Size X (cm)</Label>
        <Input autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size X (cm)" />
        <Label for="type">Build Size Y (cm)</Label>
        <Input autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size Y (cm)" />
        <Label for="type">Build Size Z (cm)</Label>
        <Input autocomplete="autocomplete_off_randString"  id="size" placeholder="Enter printer build size Z (cm)" />

        <Label for="features">Features</Label>
        <div style="display:inline-block;border-right:1px solid gray;padding-right:15px">
            <Toggle>Auto Z offset</Toggle>
            <div class="spacer" />
            <Toggle>Auto Bed Leveling</Toggle>
            <div class="spacer" />
            <Toggle>Power Loss Recovery</Toggle>
            <div class="spacer" />
            <Toggle>Filament Run-out Sensor</Toggle>
        </div>
        <div style="display:inline-block;border-right:1px solid gray;margin-left:15px;padding-right:15px">
            <Toggle>Air Purifier</Toggle>
            <div class="spacer" />
            <Toggle>Input Shaping</Toggle>
            <div class="spacer" />
            <Toggle>Camera</Toggle>
        </div>
        <div style="display:inline-block;margin-left:15px;">
            <Toggle>Wifi</Toggle>
            <div class="spacer" />
            <Toggle>Remote Access</Toggle>
            <div class="spacer" />
            <Toggle>Touchscreen</Toggle>
        </div>

        <Label for="description">Description</Label>
        <Textarea id="description" placeholder="Enter printer description" />
        <Button type="submit" on:click={handleSubmit}>Submit</Button>
    </form>
</div>
