<script>
    import { P, Card, Spinner, Modal, Input, Tabs, TabItem, TableHeadCell, A, TableHead, Table, TableBodyRow, TableBody, TableBodyCell, Label, Range, Textarea, Button, Avatar } from "flowbite-svelte";
    import { GetUserFavs, getSubCollection, GetLeaderboard, AddReview, GetReviews } from "$lib/firebase";
    import { profileImg, profileName, profileFavs, profileUid, profileImportant } from "../../stores";
    import StarRating from "svelte-star-rating";

    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    
    inject({ mode: dev ? 'development' : 'production' });

    let favs = [];
    let review = "";
    let rating = 2.5;
    profileFavs.subscribe((value) => {
        favs = value;
    });
    let name = "";
    profileName.subscribe((value) => {
        name = value;
    });
    let img = "";
    profileImg.subscribe((value) => {
        img = value;
    });
    let uid = "";
    profileUid.subscribe((value) => {
        uid = value;
    });
    let isUserImportant = false;
    profileImportant.subscribe((value) => {
        isUserImportant = value;
    });
    let modal = false;
    let modalNum = 0
    function LeaderBoardClick(number) {
        modalNum = number;
        modal = true;
    }
    let AddReviewModal = false;
    function AddReviewModalFunc() {
        AddReviewModal = !AddReviewModal;
    }
    async function AddReviewFunc(data) {
        await AddReview(data, {review: review, rating: rating, name: name, img: img, isImportant: isUserImportant, video: video});
        AddReviewModal = false;
        reviews(data)
    }
    let reviewsGot = []
    function reviews(data) {
        reviewsGot = []
        GetReviews(data).then(data => {
            reviewsGot = data;
        })
    }
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
    let video = "";
</script>
<style>
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
    <P align="center" size="2xl">Hello {name}</P>
    <P align="center" size="xl">Your Favorites</P>
    {#await GetUserFavs(uid)}
        <Spinner size={8} />
    {:then favs}
        {#if favs.length == 0}
            <p>you have no favorites</p>
        {:else}
            {#each favs as fav, i}
                {#await getSubCollection("approved", fav, "cases")}
                    <Spinner size={8} />
                {:then data}
                    <div>
                        <button on:click={() => LeaderBoardClick(data[0].name)} class="LeaderBoardElement bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 hover:dark:bg-gray-900 border-2 border-black dark:border-white">
                            <div style="float:left;margin-right:5px;width:2vw;height:2vw;min-width:20px;min-height:20px;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                                <P style="font-size: calc(5px + 1vw);">#{i+1}</P>
                            </div>
                            <P style="float:left;">{data[0].name}</P>
                            <!-- <div style="float:right;">
                                <Rating total={5} rating={GotData}>
                                    <P slot="text" class="ms-2 text-sm font-medium text-black dark:text-white">{GotData} / 5</P>
                                </Rating>
                            </div> -->
                        </button>
                    </div>
                {:catch error}
                    <p>{error.message}</p>
                {/await}
            {/each}
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
                                <div style="margin-top:15px;margin-bottom:15px" />
                                {#if reviewsGot.length == 0}
                                    <P>No Reviews, Go To the Leaderboard to Add Yours</P>
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
                                </center>
                        </TabItem>
                    </Tabs>
                    <svelte:fragment slot="footer">
                        {#if GotData.link.includes("https://")}
                            <Button href="{GotData.link}" target="_blank">Shop</Button>
                        {:else}
                            <Button href="https://{GotData.link}" target="_blank">Shop</Button>
                        {/if}
                        <!-- <a href={"https://"+GotData.link}>Shop</a> -->
                        <Button color="alternative" on:click={() => modal = false}>Close</Button>
                        {#await getSubCollection("approved", GotData.name, "cases")}
                            <Spinner size={8} />
                        {:then data}
                            <P align="right">This Printer Has {data.length} Submittion(s)</P>
                        {/await}
                    </svelte:fragment>
                </Modal>
            {:catch error}
                <P style="color: red">{error.message}</P>
            {/await}
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>