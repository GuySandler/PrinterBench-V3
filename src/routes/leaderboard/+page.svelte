<script lang="ts">
    import { Spinner, P, Button, Modal, Rating, Tabs, TabItem, A, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Select, MultiSelect, Input, Avatar, Label, Range, Textarea } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';
    import { goto } from '$app/navigation';
    import { profileImg, profileName, profileFavs } from "../../stores";
    import { GetLeaderboard, GetReviews, AddReview, SetFavs, GetUserFavs } from "$lib/firebase"
    import { onMount } from 'svelte';

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
    async function AddReviewFunc(data) {
        await AddReview(data, {review: review, rating: rating, name: userinfo[0], img: userinfo[1]});
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
    let sortBy = "name"

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
            console.log(isFav);
            
        }
    }
    // }
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
</style>
<!-- <P>{featureFilterSelected}</P> -->
<div class="w-9/12"><center>
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
            <option value="price">Price</option>
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
                        <div style="float:left;margin-right:5px;width:2vw;height:2vw;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                            <P style="font-size:1vw">#{i+1}</P>
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
                        <div style="float:left;margin-right:5px;width:2vw;height:2vw;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                            <P style="font-size:1vw">#{i+1}</P>
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
            <Modal title={GotData.name+" by "+GotData.brand} bind:open={modal} size="lg">
                <Tabs>
                    <TabItem open title="Info" on:click={() => function(){}}>
                        <div style="float:left;display:flexbox;flex-wrap:warp;align-content:center;align-items:center;justify-content:center;width:100%;">
                            <Card style="width:155px;height:100px;display:inline-block">
                                <P style="text-align:center" size="2xl">Price</P>
                                <P style="text-align:center" size="lg">${GotData.price}</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block">
                                <P style="text-align:center" size="2xl">Type</P>
                                <P style="text-align:center" size="lg">{GotData.type}</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block">
                                <P style="text-align:center" size="2xl">Speed</P>
                                <P style="text-align:center" size="lg">{GotData.speed}mm/s</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block">
                                <P style="text-align:center" size="2xl">Accel</P>
                                <P style="text-align:center" size="lg">{GotData.acceleration}mm/s</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block;transform:translateY(-5px);">
                                <P style="text-align:center" size="2xl">Size (mm)</P>
                                <P style="text-align:center" size="sm">{GotData.sizex} x {GotData.sizey} x {GotData.sizez}</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block">
                                <P style="text-align:center" size="2xl">Accel</P>
                                <P style="text-align:center" size="lg">{GotData.acceleration}mm/s</P>
                            </Card>
                            <Card style="width:155px;height:100px;display:inline-block">
                                <P style="text-align:center" size="2xl">Points</P>
                                <P style="text-align:center" size="lg">{GotData.points}</P>
                            </Card>
                        </div>
                    </TabItem>
                    <TabItem title="Features">
                        <Table>
                            <TableHead>
                                <TableHeadCell>Features</TableHeadCell>
                            </TableHead>
                            <TableBody>
                                    <TableBodyRow>{#if GotData.autoZOffset}<TableBodyCell>autoZOffset</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.autoBedLeveling}<TableBodyCell>autoBedLeveling</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.powerLossRecovery}<TableBodyCell>powerLossRecovery</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.filamentRunOutSensor}<TableBodyCell>filamentRunOutSensor</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.airPurifier}<TableBodyCell>airPurifier</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.inputShaping}<TableBodyCell>inputShaping</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.camera}<TableBodyCell>camera</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.wifi}<TableBodyCell>wifi</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.remoteAccess}<TableBodyCell>remoteAccess</TableBodyCell>{/if}</TableBodyRow>
                                    <TableBodyRow>{#if GotData.touchscreen}<TableBodyCell>touchscreen</TableBodyCell>{/if}</TableBodyRow>
                            </TableBody>
                        </Table>
                    </TabItem>
                    <TabItem title="Reviews" on:click={() => reviews(GotData)}>
                        <center>
                            {#if userinfo[1] != undefined}
                                <button on:click={AddReviewModalFunc} style="padding:5px;border-radius:5px;transition:all 0.3s" class="hover:scale-110 border-2 border-black dark:border-white">
                                    <svg style="display:inline" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg> Add Review
                                </button>
                                <Modal title={GotData.name+" by "+GotData.brand} bind:open={AddReviewModal}>
                                    <Label>Review (will show your google account name and profile picture)</Label>
                                    <Textarea placeholder="Review" bind:value={review} maxlength="750" rows="4" />
                                    <P size="xs">{review.length} / 750</P>
                                    <Label for="brand">Overall Rating (0.00 - 5.00)</Label>
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
                                    <Card style="width:50vw;margin:10px;padding:10px;border-radius:5px" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
                                        <div style="float:right;display:inline-block">
                                            <Avatar src="{reviews.img}" size="sm" rounded style="display:inline-block;" />
                                            <P size="sm" style="display:inline-block;">{reviews.name}</P>
                                        </div>
                                        <P style="overflow-wrap: break-word;overflow-y:auto;">{reviews.review}</P>
                                    </Card>
                                {/each}
                            {/if}
                            </center>
                    </TabItem>
                </Tabs>
                <svelte:fragment slot="footer">
                    <A href={"https://"+GotData.link}>Shop</A>
                    <Button color="alternative" on:click={() => modal = false}>Close</Button>
                </svelte:fragment>
            </Modal>
        {:catch error}
            <P style="color: red">{error.message}</P>
        {/await}
    {:catch error}
        <P style="color: red">{error.message}</P>
    {/await}
</center></div>
