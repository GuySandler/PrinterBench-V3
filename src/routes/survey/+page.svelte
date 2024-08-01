<script>
    import { Input, P, Button, Progressbar, Select, MultiSelect } from 'flowbite-svelte';
    import { UltimateForm } from '$lib/firebase'

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
            inputNum: 1,
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
    let placeholdervar;
    let placeholdervarselect = "";
    let placeholdervarlist = [];
    let done = false;

    function next(input, inputnum, type) {
        if (type != "multiselect" && placeholdervarselect == "" && placeholdervar == null && placeholdervarlist.length == 0) {
            return 0;
        }

        if (type == "multiselect") {
            inputs.push(placeholdervarlist);
        }
        else if (inputnum > 1) {
            if (placeholdervarselect != "") {
                inputs.push(placeholdervarselect);
                // console.log("did an if");
                // console.log(placeholdervarlist);
            }
            else {
                if (placeholdervarlist.length == 0) return 0;
                inputs.push(placeholdervarlist)
                // console.log("did an else");
            };
        }
        else {
            if (placeholdervarselect != "") {
                inputs.push(placeholdervarselect);
            }
            else inputs.push(input);
        }

        if (stage+1 == survey.length) {
            done = true;
        }
        stage++;

        placeholdervar = null;
        placeholdervarlist = [];
        progress = (stage / survey.length) * 100;
        placeholdervarselect = "";
        // inputs.push(input);
        console.log(inputs);
    }

    let update = false;
    $: {
        update = !update;
    }
    // (async () => {
    //     console.log(await UltimateForm("g"));
    // })();
</script>
<style>

</style>
<div>
    {#if !done}
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
            <Select bind:value="{placeholdervarselect}" style="margin:10px;max-width:75vw">
                {#each Object.keys(survey[stage].selectoptions) as option}
                    <option value="{option}">{survey[stage].selectoptions[option]}</option>
                {/each}
            </Select>
        {/if}
        {#if survey[stage].type == "multiselect"}
            <div style="margin:10px;max-width:75vw">
                <MultiSelect items={survey[stage].selectoptions} bind:value={placeholdervarlist} />
            </div>
        {/if}
        <!-- <Input type="number" placeholder="{survey[stage].placeholder}" bind:value="{placeholdervar}" style="margin:10px;max-width:75vw" /> -->
        <Button style="margin:10px;" on:click={() => next(placeholdervar, survey[stage].inputNum, survey[stage].type)}>Next</Button>
    {:else}
        <P>Done</P>
        <Button style="margin:10px;" on:click={() => UltimateForm(inputs)}>Test Submit</Button>
    {/if}
    <!-- <P>{survey[stage].type}</P> -->
    <Button on:click={() => UltimateForm([400, "medium", "fast", "true", ["feature1", "feature2"]])}>Test</Button>
</div>