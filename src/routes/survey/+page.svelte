<script>
    import { Input, P, Button, Progressbar, Select, MultiSelect } from 'flowbite-svelte';

    const survey = [
        {
            title: "What is your Budget? (USD)",
            placeholder: "500",
            type: "number",
            inputNum: 1,
        },
        {
            title: "What is desired size? (mm)",
            placeholder: "210",
            type: "any",
            inputNum: 3,
            selectoptions: {
                "nocare": "don't care",
                "small": "small",
                "medium": "medium",
                "large": "large",
            }
        },
        {
            title: "What is desired speed? (mm/s)",
            placeholder: "600",
            type: "any",
            inputNum: 1,
            selectoptions: {
                "nocare": "don't care",
                "medium": "medium",
                "fast": "fast",
                "stupid": "stupidly fast",
            }
        },
        {
            title: "Plug & Play?",
            placeholder: "",
            type: "select",
            inputNum: 0,
            selectoptions: {
                "nocare": "don't care",
                false: "no",
                true: "yes",
            }
        },
        {
            title: "Must Have Features: (Select all that apply)",
            placeholder: "",
            type: "multiselect",
            inputNum: 0,
            selectoptions: [
                {value: 'us', name: 'United States'},
                {value: 'dsad', name: 'United Srewtates'},
                {value: 'userewr', name: 'Uniterewd States'}, // add in features 
            ],
        },
    ];
    let inputs = [];
    let progress = 0;
    let stage = 0;
    let placeholdervar = NaN;
    let placeholdervarlist = [0, 0, 0];

    function next(input, inputnum) {
        stage++;
        if (inputnum > 1) {
            inputs.push(placeholdervarlist[i]);
        }
        else {
            inputs.push(input);
        }
        progress = (stage / survey.length) * 100;
        // inputs.push(input);
    }

    let update = false;
    $: {
        update = !update;
    }
</script>
<style>

</style>
<div>
    <P size="2xl" align="center">The Ultimate Survey</P>
    <div style="margin:20px;max-width:75vw;width:100%;">
        <Progressbar progress="{progress}" labelOutside="Done" />
    </div>

    <P for="budget" align="center" size="xl">{survey[stage].title}</P>
    {#if survey[stage].type == "any" || survey[stage].type == "number"}
        {#if survey[stage].inputNum > 1}
            {#each {length: survey[stage].inputNum} as _, i}
                <Input type="number" placeholder="{survey[stage].placeholder}" bind:value="{placeholdervarlist[i]}" style="margin:10px;max-width:75vw" /> <!-- why is i undefined??? -->
            {/each}
        {:else}
            <Input type="number" placeholder="{survey[stage].placeholder}" bind:value="{placeholdervar}" style="margin:10px;max-width:75vw" />
        {/if}
    {/if}
    {#if survey[stage].type == "any"}<P align="center" size="xl">OR</P>{/if}
    {#if survey[stage].type == "any" || survey[stage].type == "select"}
        <Select bind:value="{placeholdervar}" style="margin:10px;max-width:75vw">
            {#each Object.keys(survey[stage].selectoptions) as option}
                <option value="{option}">{survey[stage].selectoptions[option]}</option>
            {/each}
        </Select>
    {/if}
    {#if survey[stage].type == "multiselect"}
        <div style="margin:10px;max-width:75vw">
            <MultiSelect items={survey[stage].selectoptions} bind:value={placeholdervar} />
        </div>
    {/if}
    <!-- <Input type="number" placeholder="{survey[stage].placeholder}" bind:value="{placeholdervar}" style="margin:10px;max-width:75vw" /> -->
    <Button style="margin:10px;" on:click={() => next(placeholdervar, survey[stage].inputNum)}>Next</Button>
</div>