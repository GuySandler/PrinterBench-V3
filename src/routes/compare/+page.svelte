<script>
    import { P, Card, Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Spinner, Button, A } from "flowbite-svelte";
    import { GetLeaderboard, GetDashboardDocs } from "$lib/firebase";

    let update = false;
    $: update = !update;

    let printers = ["Mk3s+", "printer2", "printer3", "printer4", "printer5"];
    let selections = ["", ""];
    let maxitems = 4

    function addSelection() {
        if (selections.length < maxitems) {
            selections = [...selections, ""];
        }
    }
    let compareBool = false;
    async function compare() {
        compareBool = true;
        let data = [];
        for (let i = 0; i < selections.length; i++) {
            data.push(await GetLeaderboard("", selections[i]));
        }
        console.log(data);
        return data;
    }
    async function GetPrinters() {
        printers = await GetDashboardDocs("approved")
    }
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    
    inject({ mode: dev ? 'development' : 'production' });
</script>
<style>

</style>
<div>
    <P align="center" size="2xl">Compare Printers</P>
    {#await GetPrinters()}
        <Spinner size={8} />
    {:then}
        <div>
            {#each selections as selection, index}
                <Select style="display:inline-block;width:25vw;margin:7px" bind:value={selections[index]}>
                    {#each printers as item}
                        {#if !selections.includes(item) || selections[index] === item}
                            <option value={item}>{item}</option>
                        {/if}
                    {/each}
                </Select>
            {/each}
            {#if selections.length < maxitems}
                <button style="display:inline-block;position:relative;top:7px" on:click={addSelection}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                    </svg>
                </button>
            {/if}
        </div>
    {:catch}
        <P style="color:red">Error</P>
    {/await}
    <Button style="margin:10px" on:click={compare}>Compare</Button>
    {#if compareBool}
        {#await compare()}
            <Spinner size={8} />
        {:then data}
            <div style="width:75%;margin-top:10px;margin-bottom:10px">
                <Table>
                    <TableHead>
                        <TableHeadCell></TableHeadCell>
                        {#each selections as selection, i}
                            <TableHeadCell>{selection}</TableHeadCell>
                        {/each}
                    </TableHead>

                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell>Brand</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].brand}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Price</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>${data[i].price}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Points</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].points}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Rating</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].rating} / 5</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <!-- <TableBodyRow>
                            <TableBodyCell>Multicolor Price</TableBodyCell>
                        </TableBodyRow> -->
                        <TableBodyRow>
                            <TableBodyCell>Speed</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].speed} mm/s</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Acceleration</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].acceleration} mm/s</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Size (mm)</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].sizex} x {data[i].sizey} x {data[i].sizez}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Type</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].type}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Auto Z Offset</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].autoZOffset}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Auto Bed Leveling</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].autoBedLeveling}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Air Purifier</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].airPurifier}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Camera</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].camera}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Enclosure</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].enclosure}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Filament Run Out Sensor</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].filamentRunOutSensor}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Input Shaping</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].inputShaping}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Power Loss Recovery</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].powerLossRecovery}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Remote Access</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].remoteAccess}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Touchscreen</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].touchscreen}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Wifi</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].wifi}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Multicolor</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].multicolor}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Multicolor Price</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>{data[i].multicolorPrice}</TableBodyCell>
                            {/each}
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Link To Shop</TableBodyCell>
                            {#each selections as selection, i}
                                <TableBodyCell>
                                    {#if data[i].link.includes("https://")}
                                        <A href="{data[i].link}">Shop</A>
                                    {:else}
                                        <A href="https://{data[i].link}">Shop</A>
                                    {/if}
                                </TableBodyCell>
                            {/each}
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
        {:catch error}
            <P style="color:red">{error.message}</P>
        {/await}
    {/if}
</div>