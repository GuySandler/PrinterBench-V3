<script>
    import { Input, P, Button, Progressbar, Select, MultiSelect, Spinner, Modal, Tabs, TabItem, Card, Avatar, Popover, Table, TableBodyRow, TableHead, TableHeadCell, TableBody, TableBodyCell } from 'flowbite-svelte';
    import { UltimateForm, GetLeaderboard, GetReviews } from '$lib/firebase'
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import StarRating from 'svelte-star-rating';

    inject({ mode: dev ? 'development' : 'production' });
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
                {value: 'autoZOffset', name: 'Auto Z Offset'},
                {value: 'autoBedLeveling', name: 'Auto Bed Leveling'},
                {value: 'powerLossRecovery', name: 'Power Loss Recovery'},
                {value: 'filamentRunOutSensor', name: 'Filament Run Out Sensor'},
                {value: 'airPurifier', name: 'Air Purifier'},
                {value: 'inputShaping', name: 'Input Shaping'},
                {value: 'camera', name: 'Camera'},
                {value: 'wifi', name: 'Wifi'},
                {value: 'remoteAccess', name: 'Remote Access'},
                {value: 'touchscreen', name: 'Touchscreen'},
                {value: 'enclosure', name: 'Enclosure'},
                {value: 'opensource', name: 'Open Source'},
                {value: 'multicolor', name: 'Multicolor Option'},
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
    let reviewsGot = [];
    function reviews(data) {
        reviewsGot = [];
        GetReviews(data).then(data => {
            reviewsGot = data;
        })
        // console.log("ran")
    }
    let modal = false;
    let modalNum = 0;
    function LeaderBoardClick(number) {
        modalNum = number;
        modal = true;
    }
    let rating = 3;
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
</script>
<style>
    .centerFlexBox {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        margin:10px
    }
    .LeaderBoardElement {
        width:50vw;
        min-height: 50px;
        height:7.5vh;
        border-radius:5px;
        display:flexbox;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        align-content:center;
        padding:10px;
        margin-top: 20px;
        margin-bottom:20px;
        transition: all 0.3s;
    }
    .LeaderBoardElement:hover {
        scale: 1.05;
        cursor: pointer;
    }
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

        <!-- <P>Done</P> -->
        <!-- <Button style="margin:10px;" on:click={() => UltimateForm(inputs)}>Test Submit</Button> -->
        {#await UltimateForm(inputs)}
            <Spinner size={8} />
        {:then data}
            <!-- <P>{data}</P> -->
            {#each data as printer, i}
                <!-- <P>{printer[0].name}</P> -->
                <div>
                    <button on:click={() => LeaderBoardClick(printer[0].name)} class="LeaderBoardElement bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 hover:dark:bg-gray-900 border-2 border-black dark:border-white">
                        <div style="float:left;margin-right:5px;width:2vw;height:2vw;min-width:20px;min-height:20px;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                            <P style="font-size: calc(5px + 1vw);">#{i+1}</P>
                        </div>
                        <P style="float:left;">{printer[0].name}</P>
                    </button>
                </div>
            {/each}
        {:catch error}
            <P>{error}</P>
        {/await}

        {#await GetLeaderboard("", modalNum)}
            <Spinner size={8} />
        {:then GotData}
            <Modal title={GotData.name+" by "+GotData.brand} bind:open={modal} size="xl">
                <Tabs>
                    <TabItem open title="Info" on:click={() => function(){}}>
                        <div style="float:left;display:flexbox;flex-wrap:warp;align-content:center;align-items:center;justify-content:center;width:100%;">
                            <Card style="width:155px;height:100px;display:inline-block;margin:7px">
                                <P align="center"  size="2xl">Price</P>
                                <P align="center" size="lg">${GotData.price}</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block;margin:7px">
                                <P align="center" size="2xl">Type</P>
                                <P align="center" size="lg">{GotData.type}</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block;margin:7px">
                                <P align="center" class="inline-block" size="2xl">Speed</P>
                                <svg id="speedTooltip" class="align-middle w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <Popover class="z-10 w-64 text-sm font-light " title="Speed" triggeredBy="#speedTooltip">The max speed of laying down material.</Popover>
                                <P align="center" size="lg">{GotData.speed}mm/s</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block;margin:7px">
                                <P align="center" size="2xl" class="inline-block">Accel</P>
                                <svg id="accelerationTooltip" class="align-middle inline-block w-6 h-6 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <Popover class="z-10 w-64 text-sm font-light" title="Acceleration" triggeredBy="#accelerationTooltip">The max movement speed, does not really matter in terms of printing speed.</Popover>
                                <P align="center" size="lg">{GotData.acceleration}mm/s</P>
                            </Card>
                            {#if GotData.type != "delta"}
                                <Card style="width:155px;height:100px;display:inline-block;transform:translateY(-5px);;margin:7px">
                                    <P align="center" size="2xl">Size (mm)</P>
                                    <P align="center" size="sm">{GotData.sizex} x {GotData.sizey} x {GotData.sizez}</P>
                                </Card>
                                {:else if GotData.type == "delta"}
                                <Card style="width:155px;height:100px;display:inline-block;transform:translateY(-5px);;margin:7px">
                                    <P align="center" size="2xl">Size (mm)</P>
                                    <P align="center" size="sm">{GotData.diameter}⌀ x {GotData.sizez}</P>
                                </Card>
                            {/if}
                            <Card style="width:155px;height:100px;display:inline-block;margin:7px">
                                <P align="center" size="2xl">Points</P>
                                <P align="center" size="lg">{GotData.points}</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block;margin:7px">
                                <P align="center" size="2xl">Rating</P>
                                <div style="display:inline-block"><StarRating config={config} rating={GotData.rating} /></div>
                            </Card>
                        </div>
                    </TabItem>
                    <TabItem title="Features">
                        <Table>
                            <TableHead>
                                <TableHeadCell>Features</TableHeadCell>
                                <TableHeadCell>Description</TableHeadCell>
                            </TableHead>
                            <TableBody>
                                <TableBodyRow>{#if GotData.autoZOffset}<TableBodyCell>Auto Z Offset</TableBodyCell><TableBodyCell>A mechanism that automatically gets the appropriate distance between the nozzle and bed for first layer calibration.</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.autoBedLeveling}<TableBodyCell>Auto Bed Leveling</TableBodyCell><TableBodyCell>The bed isn't flat so this mechanism helps get the offsets from diffrent positions of the bed to fix it.</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.powerLossRecovery}<TableBodyCell>Power Loss Recovery</TableBodyCell><TableBodyCell>Allows printer to continue a print if the power suddenly cuts out.</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.filamentRunOutSensor}<TableBodyCell>Filament RunOut Sensor</TableBodyCell><TableBodyCell>Detects if there is no more filament and pauses.</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.airPurifier}<TableBodyCell>Air Purifier</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.inputShaping}<TableBodyCell>Input Shaping</TableBodyCell><TableBodyCell>A mechanism that adjusts the motion of the printer to reduce/compensate vibrations and improve print quality.</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.camera}<TableBodyCell>Camera</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.wifi}<TableBodyCell>Wifi</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.remoteAccess}<TableBodyCell>Remote Access</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.touchscreen}<TableBodyCell>Touchscreen</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.openSource}<TableBodyCell>Open Source</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.enclosure}<TableBodyCell>Enclosure</TableBodyCell><TableBodyCell>Some printers come with enclosures allowing you to print materials like ABS</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData.multicolor}<TableBodyCell>Multicolor</TableBodyCell><TableBodyCell>${GotData.multicolorPrice}</TableBodyCell>{/if}</TableBodyRow>
                            </TableBody>
                        </Table>
                    </TabItem>
                    <TabItem title="Reviews" on:click={() => reviews(GotData)}>
                        <div style="margin-top:15px;margin-bottom:15px" />
                        {#if reviewsGot.length == 0}
                            <P>No Reviews</P>
                        {:else}
                            {#each reviewsGot as reviews}
                                <Card style="width:50vw;margin:10px;padding:10px;border-radius:5px;{reviews.isImportant ? 'box-shadow: 0px 0px 104px 10px yellow;' : ''}" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
                                    <div style="float:right;display:inline-block">
                                        {#if reviews.isImportant}
                                            <svg style="display:inline-block;" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="yellow" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                                            </svg>
                                        {/if}
                                        <Avatar src="{reviews.img}" size="sm" rounded style="display:inline-block;" />
                                        <P size="sm" style="display:inline-block;">{reviews.name}</P>
                                    </div>
                                    <P style="overflow-wrap: break-word;overflow-y:auto;">{reviews.review}</P>
                                    {#if reviews.isImportant}
                                        <iframe title="video" src="https://www.youtube.com/embed/{reviews.video}" />
                                    {/if}
                                </Card>
                            {/each}
                        {/if}
                    </TabItem>
                </Tabs>
                <svelte:fragment slot="footer">
                    {#if GotData.link.includes("https://")}
                        <Button href="{GotData.link}" target="_blank">Shop</Button>
                    {:else}
                        <Button href="https://{GotData.link}" target="_blank">Shop</Button>
                    {/if}
                    <!-- <A href={"https://"+GotData.link}>Shop</A> -->
                    <Button color="alternative" on:click={() => modal = false}>Close</Button>
                </svelte:fragment>
            </Modal>
        {:catch error}
            <P style="color: red">{error.message}</P>
        {/await}
    <!-- {:catch error}
        <P style="color: red">{error.message}</P>
    {/await} -->
    {/if}
    <!-- <P>{survey[stage].type}</P> -->
    <Button on:click={() => UltimateForm([400, "medium", "fast", "true", ["feature1", "feature2"]])}>Test</Button>
</div>