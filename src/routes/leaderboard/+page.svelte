<script lang="ts">
    import { Spinner, P, Button, Modal, AdvancedRating, Rating, Popover, Footer, Tabs, TabItem, A, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Select, MultiSelect, Input, Avatar, Label, Range, Textarea } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';
    import { goto } from '$app/navigation';
    import { profileImg, profileName, profileFavs, profileImportant } from "../../stores";
    import { GetLeaderboard, GetReviews, AddReview, SetFavs, GetUserFavs, isImportant } from "$lib/firebase"
    import { onMount } from 'svelte';

    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });

    let userinfo = [];
    // $: {
    //     userinfo = [];
    //     profileName.subscribe((value) => {
    //         userinfo.push(value);
    //     });
    //     profileImg.subscribe((value) => {
    //         userinfo.push(value);
    //     });
    //     console.log("hi")
    // }
    let AddReviewModal = false;
    function AddReviewModalFunc() {
        AddReviewModal = !AddReviewModal;
    }
    let video = "";
    // isImportant()
    async function AddReviewFunc(data) {
        // isUserImportant = await;
        await AddReview(data, {review: review, rating: rating, name: userinfo[0], img: userinfo[1], isImportant: await isImportant(), video: video});
        AddReviewModal = false;
        reviews(data)
    }
    let reviewsGot = []
    function reviews(data) {
        userinfo = [];
        reviewsGot = []
        profileName.subscribe((value) => {
            if (value != "") userinfo.push(value);
        });
        profileImg.subscribe((value) => {
            if (value != "") userinfo.push(value);
        });
        GetReviews(data).then(data => {
            reviewsGot = data;
        })
        // console.log("ran")
    }
    onMount(() => { // somewhat helps the problem
        userinfo = [];
        profileName.subscribe((value) => {
            if (value != "") userinfo.push(value);
        });
        profileImg.subscribe((value) => {
            if (value != "") userinfo.push(value);
        });
    });

    let modal = false;
    let modalNum = 0
    function LeaderBoardClick(number) {
        modalNum = number;
        modal = true;
    }
    let featureFilterSelected = [];
    let featureFilter = [
        { value: 'autoZOffset', name: 'Auto Z Offset' },
        { value: 'AutoBedLeveling', name: 'Auto Bed Leveling' },
        { value: 'PowerLossRecovery', name: 'Power Loss Recovery' },
        { value: 'FilamentSensor', name: 'Filament Run-out Sensor' },
        { value: 'AirPurifier', name: 'Air Purifier' },
        { value: 'InputShaping', name: 'Input Shaping' },
        { value: 'Camera', name: 'Camera' },
        { value: 'Wifi', name: 'Wifi' },
        { value: 'RemoteAccess', name: 'Remote Access' },
        { value: 'Touchscreen', name: 'Touchscreen' }
    ];
    let type = "all"
    let name = ""
    let brand = ""
    let sortBy = "points"

    let rating = 2.5;
    let review = "";
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
    function test(features) {
        console.log(features.length);
    }
    let isFav = Array(30).fill("fav");
    let favs = [];
    profileFavs.subscribe((value) => {
        favs = value;
    });
    // async function AddToFav(name, i, favs) {
    //     isFav[i] = !isFav[i];
    //     if (favs == undefined) {
    //         favs = [];
    //     }
    //     if (favs.includes(name)) {
    //         isFav[i] = false;
    //         favs = favs.filter(item => item !== name);
    //     }
    //     else if (!favs.includes(name)) {
    //         isFav[i] = true;
    //         favs.push(name);

    //     }
    //     else if (!favs.includes(name) && isFav[i]) {
    //         favs.push(name);
    //     }
    //     else if (favs.includes(name) && !isFav[i]) {
    //         favs = favs.filter(item => item !== name);
    //     }
    //     console.log(favs);
    //     profileFavs.set(favs);
    //     SetFavs(Favs);
    // }
    let updater = false;
    async function AddToFav(name) {
        favs = await GetUserFavs()
        if (favs.includes(name)) {
            favs = favs.filter(item => item !== name); // if includes take out
        }
        else {
            favs.push(name);
        }
        await SetFavs(favs);
        updater = !updater;
    }
    // console.log(userinfo[1] != undefined)
    // async function isFav(name) {
    $: {
        if (favs != undefined) {
            let favs = [];
            async function func(){favs = await GetUserFavs()}func
            let printers = [];
            async function func2(){printers = await GetLeaderboard(sortBy, "", type, featureFilterSelected, name, brand);console.log(printers)}func2

            // console.log(printers)
            for (i of printers) {
                console.log(i.name)
            }
            // console.log(favs.includes(name) ? 'favOn' : 'fav');

            for (let i = 0; i < 50; i++) {
                if (favs.includes(name)) {isFav[i] = 'favOn'};
                if (favs.includes(name)) {isFav[i] = 'fav'};
            }
            // console.log(isFav);

        }
        updater = !updater;
    }
    // }
    let isUserImportant = false;
    profileImportant.subscribe((value) => {
        isUserImportant = value;
    });
    let HowPointCalc = false;
    let testprice = 0;
    let testsizex = 0;
    let testsizey = 0;
    let testsizez = 0;
    let testacceleration = 0;
    let testspeed = 0;
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
    #fav:hover {
        fill:red;
        scale:1.1
    }
    #fav:active, #favOn:active {
        scale: 0.95;
        transition: all 0.3s;
    }
    #fav {
        fill:none;
        z-index:4;
        transition: all 0.3s;
    }
    #favOn {
        fill:red;
        z-index:4;
        transition: all 0.3s;
    }
    iframe {
        height: 25vw;
        width: 100%;
    }
</style>
<!-- <P>{featureFilterSelected}</P> -->
<div class="w-9/12">
    <div style="width:100%;" class="centerFlexBox">
        <P style="">Filters</P>
    </div>
    <div style="width:100%;" class="centerFlexBox">
        <Select style="width:15vw;margin:5px;" bind:value={type}>
            <option value="all">All</option>
            <option value="bedslinger">Bedslinger</option>
            <option value="corexy">CoreXY</option>
            <option value="delta">Delta</option>
        </Select>
        <MultiSelect items={featureFilter} bind:value={featureFilterSelected} size="lg" />
        <Input placeholder="Printer Name" style="width:15vw;margin:5px;" bind:value={name} />
        <Input placeholder="Brand" style="width:15vw;margin:7px;" bind:value={brand} />
    </div>
    <div style="width:100%;" class="centerFlexBox">
        <P style="">Rank By</P>
    </div>
    <div style="width:100%;" class="centerFlexBox">
        <Select style="width:15vw;" bind:value={sortBy}>
            <option value="name">Name</option>
            <option value="points">Points</option>
            <option value="speed">Speed</option>
            <option value="priceH">Price (highest)</option>
            <option value="priceL">Price (lowest)</option>
        </Select>
    </div>
    <!-- <Button on:click={() => test(featureFilterSelected)}>Filter</Button> -->
    {#await GetLeaderboard(sortBy, "", type, featureFilterSelected, name, brand)}
        <Spinner size={8} />
    {:then GotData}
        {#if userinfo[1] != undefined}
        {#await GetUserFavs()}
            <Spinner size={8} />
        {:then Favs}
            {#each GotData as item, i}
                <div>
                    <button on:click={() => LeaderBoardClick(item.name)} class="LeaderBoardElement bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 hover:dark:bg-gray-900 border-2 border-black dark:border-white">
                        <div style="float:left;margin-right:5px;width:2vw;height:2vw;min-width:20px;min-height:20px;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                            <P style="font-size: calc(5px + 1vw);">#{i+1}</P>
                        </div>
                        <P style="float:left;">{item.name}</P>
                        <!-- <div style="float:right;">
                            <Rating total={5} rating={GotData}>
                                <P slot="text" class="ms-2 text-sm font-medium text-black dark:text-white">{GotData} / 5</P>
                            </Rating>
                        </div> -->
                    </button>
                    {#if userinfo[1] != undefined}
                    <button style="display:inline-block;margin-left:10px" id="fav" on:click={() => AddToFav(item.name)}>
                        <svg class="w-15 h-15 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24" id={isFav[i]}>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                        </svg>
                    </button>
                    {/if}
                </div>
            {/each}
        {/await}

        {:else}
            {#each GotData as item, i}
                <div>
                    <button on:click={() => LeaderBoardClick(item.name)} class="LeaderBoardElement bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 hover:dark:bg-gray-900 border-2 border-black dark:border-white">
                        <div style="float:left;margin-right:5px;width:2vw;height:2vw;min-width:20px;min-height:20px;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                            <P style="font-size: calc(5px + 1vw);">#{i+1}</P>
                        </div>
                        <P style="float:left;">{item.name}</P>
                        <!-- <div style="float:right;">
                            <Rating total={5} rating={GotData}>
                                <P slot="text" class="ms-2 text-sm font-medium text-black dark:text-white">{GotData} / 5</P>
                            </Rating>
                        </div> -->
                    </button>
                </div>
            {/each}
        {/if}
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
                        {#if userinfo[1] != undefined}
                            <Button on:click={AddReviewModalFunc} style="padding:5px;border-radius:5px;transition:all 0.3s" class="hover:scale-110 border-2 border-black dark:border-white">
                                <svg style="display:inline" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg> Add Review
                            </Button>
                            <Modal title={GotData.name+" by "+GotData.brand} bind:open={AddReviewModal}>
                                <Label>Review (will show your google account name and profile picture)</Label>
                                <Textarea placeholder="Review" bind:value={review} maxlength="2000" rows="4" />
                                <P size="xs">{review.length} / 2000</P>
                                <Label for="brand">Overall Rating (0.00 - 5.00)</Label>
                                {#if isUserImportant}
                                    <Label>Video ID</Label>
                                    <Input bind:value={video} style="width:20vw;" />
                                {/if}
                                <div style="display:inline-block">
                                    <StarRating config={config} rating={rating} />
                                </div>
                                <Range bind:value={rating} style="width:20vw;margin-right:10px;padding-right:10px" max={5} step={0.25} id="rating" />
                                <P size="3xl" style="display:inline-flex;width:5vw">{rating}</P>
                                <br>
                                <Button on:click={() => AddReviewFunc(GotData)}>Add Review</Button>
                            </Modal>
                        {:else}
                            <P>Log In to Add a Review</P>
                            <!-- <button on:click={() => AddReview(GotData, {test: "Review Test"})}>Review Test</button> -->
                        {/if}
                        <div style="margin-top:15px;margin-bottom:15px" />
                        {#if reviewsGot.length == 0}
                            <P>No Reviews, Will You Be The First?</P>
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
    {:catch error}
        <P style="color: red">{error.message}</P>
    {/await}
</div>
<Footer>
    <Button align="center" on:click={() => HowPointCalc = true} style="margin-bottom:10px;">How are points calculated?</Button>
    <Modal title="How are points calculated?" bind:open={HowPointCalc} size="lg">
        <div style="overflow-y:auto;">
            <P align="center" size="sm">Open Source = 25 | Nice to have but most are not</P>

            <Table>
                <TableHead>
                  <TableHeadCell>Feature</TableHeadCell>
                  <TableHeadCell>Points</TableHeadCell>
                  <TableHeadCell>Reason</TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                  <TableBodyRow>
                    <TableBodyCell>Auto Z Offset</TableBodyCell>
                    <TableBodyCell>40</TableBodyCell>
                    <TableBodyCell>It's kind of important nowdays</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Auto Bed Leveling</TableBodyCell>
                    <TableBodyCell>40</TableBodyCell>
                    <TableBodyCell>Necessity</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Power Loss Recovery</TableBodyCell>
                    <TableBodyCell>30</TableBodyCell>
                    <TableBodyCell>Necessity but most have it</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Filament Run Out Sensor</TableBodyCell>
                    <TableBodyCell>25</TableBodyCell>
                    <TableBodyCell>You can live without it, but it's important</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Air Purifier</TableBodyCell>
                    <TableBodyCell>20</TableBodyCell>
                    <TableBodyCell>Nice feature a lot don't have</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Input Shaping</TableBodyCell>
                    <TableBodyCell>25</TableBodyCell>
                    <TableBodyCell>You can live without it, but it's important</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Camera</TableBodyCell>
                    <TableBodyCell>20</TableBodyCell>
                    <TableBodyCell>Nice feature a lot don't have</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Wifi</TableBodyCell>
                    <TableBodyCell>20</TableBodyCell>
                    <TableBodyCell>Somewhat a necessity nowdays</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Remote Access</TableBodyCell>
                    <TableBodyCell>20</TableBodyCell>
                    <TableBodyCell>Somewhat a necessity nowdays</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Touchscreen</TableBodyCell>
                    <TableBodyCell>20</TableBodyCell>
                    <TableBodyCell>Somewhat a necessity nowdays</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Enclosure</TableBodyCell>
                    <TableBodyCell>20</TableBodyCell>
                    <TableBodyCell>Nice feature a lot don't have</TableBodyCell>
                  </TableBodyRow>
                  <TableBodyRow>
                    <TableBodyCell>Open Source</TableBodyCell>
                    <TableBodyCell>25</TableBodyCell>
                    <TableBodyCell>Nice to have but most are not</TableBodyCell>
                  </TableBodyRow>
                </TableBody>
            </Table>

            <P align="center" style="margin-top:15px">Price: (110/(price+5))*100</P>
            <Label>Try it</Label>
            <Input bind:value={testprice} type="number" style="display:inline-block;width:15vw"/>
            <P style="display:inline-block;">{(110/(parseInt(testprice)+5))*100}</P>

            <P align="center" style="margin-top:15px">Speed: (0.025*log(speed)*(2+speed)+10)/2 (only /2 for script)</P>
            <Label>Try it (mm/s)</Label>
            <Input bind:value={testspeed} type="number" style="display:inline-block;width:15vw"/>
            <P style="display:inline-block;">{(0.025*Math.log(parseInt(testspeed))*(2+parseInt(testspeed))+10)/2}</P>

            <P align="center" style="margin-top:15px">Size: round(∛(volume)/8.5)</P>
            <Label>Try it (mm)</Label>
            <Input bind:value={testsizex} type="number" style="display:inline-block;width:10vw"/>
            <Input bind:value={testsizey} type="number" style="display:inline-block;width:10vw"/>
            <Input bind:value={testsizez} type="number" style="display:inline-block;width:10vw"/>
            <P style="display:inline-block;">{Math.round(Math.cbrt((parseInt(testsizex)*parseInt(testsizey)*parseInt(testsizez)))/8.5)}</P>

            <P align="center" style="margin-top:15px">acceleration = round(acceleration/255)</P>
            <Label>Try it (mm/s)</Label>
            <Input bind:value={testacceleration} type="number" style="display:inline-block;width:10vw"/>
            <P style="display:inline-block;">{Math.round(parseInt(testacceleration)/255)}</P>

            <br>
            <Button style="margin-top:15px" href="https://www.desmos.com/calculator/xqnqpahn8o" target="_blank">Desmos</Button>
        </div>
    </Modal>
</Footer>
