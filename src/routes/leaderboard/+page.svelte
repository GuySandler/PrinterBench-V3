<script lang="ts">
    import { Spinner, P, Button, Modal, Rating, Tabs, TabItem, A, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';
    import { goto } from '$app/navigation';

    import { getData } from "$lib/firebase"

    let modal = false;
    let modalNum = 0
    function LeaderBoardClick(number) {
        modalNum = number;
        modal = true;
    }
</script>
<style>
    .centerFlexBox {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
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
                        <P slot="text" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">{GotData[i][0].rating} / 5</P>
                    </Rating>
                </div>
            </button>
        {/each}
        <Modal title={GotData[modalNum][0].name+" by "+GotData[modalNum][0].brand} bind:open={modal}>
            <Tabs>
                <TabItem open title="Info" on:click={() => function(){}}>
                    <div style="float:left;display:flexbox;flex-wrap:warp;align-content:center;align-items:center;justify-content:center;width:100%;border:1px black solid">
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
            </Tabs>
            <svelte:fragment slot="footer">
                <A href={"https://"+GotData[modalNum][0].link}>Shop</A>
                <Button color="alternative">Close</Button>
            </svelte:fragment>
        </Modal>
    {:catch error}
        <P style="color: red">{error.message}</P>
    {/await}
</center></div>
