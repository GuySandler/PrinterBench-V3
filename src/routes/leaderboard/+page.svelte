<script lang="ts">
    import { Spinner, P, Button, Modal, Rating, Tabs, TabItem, A, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Select, MultiSelect, Input } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';
    import { goto } from '$app/navigation';
    import { profileImg, profileName } from '../../stores';
    import { getData, GetReviews } from "$lib/firebase"

    let userinfo = [1];
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
    let reviewsGot = []
    function reviews(data) {
        userinfo = [];
        reviewsGot = []
        profileName.subscribe((value) => {
            userinfo.push(value);
        });
        profileImg.subscribe((value) => {
            userinfo.push(value);
        });
        reviewsGot = GetReviews(data);
        // console.log("ran")
    }

    let modal = false;
    let modalNum = 0
    function LeaderBoardClick(number) {
        modalNum = number;
        modal = true;
    }
    let featureFilterSelected = [];
    let featureFilter = [
        { value: 'AutoZOffset', name: 'Auto Z Offset' },
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
    let type = "bedslinger"
    let name = ""
    let brand = ""
    let sortBy = "points"
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
<div class="w-9/12"><center>
    <div style="width:100%;" class="centerFlexBox">
        <P style="">Filters</P>
    </div>
    <div style="width:100%;" class="centerFlexBox">
        <Select style="width:15vw;" bind:value={type}>
            <option value="bedslinger">Bedslinger</option>
            <option value="corexy">CoreXY</option>
            <option value="delta">Delta</option>
        </Select>
        <MultiSelect items={featureFilter} bind:value={featureFilterSelected} size="lg" />
        <Input placeholder="Printer Name" style="width:15vw" bind:value={name} />
        <Input placeholder="Brand" style="width:15vw" bind:value={brand} />
    </div>
    <div style="width:100%;" class="centerFlexBox">
        <P style="">Rank By</P>
    </div>
    <div style="width:100%;" class="centerFlexBox">
        <Select style="width:15vw;" bind:value={sortBy}>
            <option value="points">Points</option>
            <option value="speed">Speed</option>
            <option value="price">Price</option>
        </Select>
    </div>
    <div class="centerFlexBox"><Button on:click{}>Filter</Button></div>
    {#await getData("pending")}
        <Spinner size={8} />
    {:then GotData}
        {#each GotData as item, i}
            <button on:click={() => LeaderBoardClick(i)} class="LeaderBoardElement bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 hover:dark:bg-gray-900 border-2 border-black dark:border-white">
                <div style="float:left;margin-right:5px;width:2vw;height:2vw;" class="centerFlexBox bg-gray-400 dark:bg-gray-900 border-2 border-black dark:border-white">
                    <P style="font-size:1vw">#{i+1}</P>
                </div>
                <P style="float:left;">{GotData[i][0].name}</P>
                <div style="float:right;">
                    <Rating total={5} rating={GotData[i][0].rating}>
                        <P slot="text" class="ms-2 text-sm font-medium text-black dark:text-white">{GotData[i][0].rating} / 5</P>
                    </Rating>
                </div>
            </button>
        {/each}
        <Modal title={GotData[modalNum][0].name+" by "+GotData[modalNum][0].brand} bind:open={modal}>
            <Tabs>
                <TabItem open title="Info" on:click={() => function(){}}>
                    <div style="float:left;display:flexbox;flex-wrap:warp;align-content:center;align-items:center;justify-content:center;width:100%;">
                        <Card style="width:155px;height:100px;display:inline-block">
                            <P style="text-align:center" size="2xl">Price</P>
                            <P style="text-align:center" size="lg">${GotData[modalNum][0].price}</P>
                        </Card>
                        <Card style="width:155px;height:100px;display:inline-block">
                            <P style="text-align:center" size="2xl">Type</P>
                            <P style="text-align:center" size="lg">{GotData[modalNum][0].type}</P>
                        </Card>
                        <Card style="width:155px;height:100px;display:inline-block">
                            <P style="text-align:center" size="2xl">Speed</P>
                            <P style="text-align:center" size="lg">{GotData[modalNum][0].speed}mm/s</P>
                        </Card>
                        <Card style="width:155px;height:100px;display:inline-block">
                            <P style="text-align:center" size="2xl">Accel</P>
                            <P style="text-align:center" size="lg">{GotData[modalNum][0].acceleration}mm/s</P>
                        </Card>
                        <Card style="width:155px;height:100px;display:inline-block;transform:translateY(-5px);">
                            <P style="text-align:center" size="2xl">Size (mm)</P>
                            <P style="text-align:center" size="sm">{GotData[modalNum][0].sizex} x {GotData[modalNum][0].sizey} x {GotData[modalNum][0].sizez}</P>
                        </Card>
                        <Card style="width:155px;height:100px;display:inline-block">
                            <P style="text-align:center" size="2xl">Accel</P>
                            <P style="text-align:center" size="lg">{GotData[modalNum][0].acceleration}mm/s</P>
                        </Card>
                    </div>
                </TabItem>
                <TabItem title="Features">
                    <Table>
                        <TableHead>
                            <TableHeadCell>Features</TableHeadCell>
                        </TableHead>
                        <TableBody>
                                <TableBodyRow>{#if GotData[modalNum][0].autoZOffset}<TableBodyCell>autoZOffset</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].autoBedLeveling}<TableBodyCell>autoBedLeveling</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].powerLossRecovery}<TableBodyCell>powerLossRecovery</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].filamentRunOutSensor}<TableBodyCell>filamentRunOutSensor</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].airPurifier}<TableBodyCell>airPurifier</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].inputShaping}<TableBodyCell>inputShaping</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].camera}<TableBodyCell>camera</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].wifi}<TableBodyCell>wifi</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].remoteAccess}<TableBodyCell>remoteAccess</TableBodyCell>{/if}</TableBodyRow>
                                <TableBodyRow>{#if GotData[modalNum][0].touchscreen}<TableBodyCell>touchscreen</TableBodyCell>{/if}</TableBodyRow>
                        </TableBody>
                    </Table>
                </TabItem>
                <TabItem title="Reviews" on:click={() => reviews(GotData[modalNum][0])}>
                    <center>
                        {#if userinfo[1] != ""}
                            <button on:click={() => GetReviews(GotData[modalNum][0])} style="padding:5px;border-radius:5px;transition:all 0.3s" class="hover:scale-110 border-2 border-black dark:border-white">
                                <svg style="display:inline" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg> Add Review
                            </button>
                        {:else}
                            <P>Log In to Add a Review</P>
                        {/if}
                        <h1>{reviewsGot}</h1>
                        {#if reviewsGot.length == 0}
                            <P>No Reviews, Will You Be The First?</P>
                        {:else}
                            <!-- {#each reviewsGot as review}
                                <Card style="width:100%;margin-top:10px">
                                    <P>{review[0].name}</P>
                                    <StarRating rating={review[0].rating} total={5} />
                                    <P>{review[0].review}</P>
                                </Card>
                            {/each} -->
                        {/if}
                            </center>
                </TabItem>
            </Tabs>
            <svelte:fragment slot="footer">
                <A href={"https://"+GotData[modalNum][0].link}>Shop</A>
                <Button color="alternative" on:click={() => modal = false}>Close</Button>
            </svelte:fragment>
        </Modal>
    {:catch error}
        <P style="color: red">{error.message}</P>
    {/await}
</center></div>
