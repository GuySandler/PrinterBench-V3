<script>
    import { P, Card, Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Spinner, Button } from "flowbite-svelte";
    import { GetLeaderboard } from "$lib/firebase";

    let update = false;
    $: update = !update;

    let printers = ["Mk3s+", "printer2", "printer3", "printer4", "printer5", "printer6", "printer7", "printer8", "printer9", "printer10"];
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
        let data = await GetLeaderboard("", selections[0]);
        return data;
    }

</script>
<style>

</style>
<div>
    <P align="center" size="2xl">Comapre Printers</P>
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
    <Button style="margin:10px" on:click={compare}>Compare</Button>
    {#if compareBool}
        {#await compare()}
            <Spinner size={8} />
        {:then data}
            <div style="width:75%;margin-top:10px;margin-bottom:10px">
                <Table>
                    <TableHead>
                        <TableHeadCell></TableHeadCell>
                        {#each selections as selection, index}
                            <TableHeadCell>{selection}</TableHeadCell>
                        {/each}
                    </TableHead>

                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell>Brand</TableBodyCell>
                            <TableBodyCell>{data.brand}</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Price</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Points</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Rating</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Multicolor Price</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Speed</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Acceleration</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Size</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Type</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Auto Z Offset</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Auto Bed Leveling</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Air Purifier</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Camera</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Enclosure</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Filament Run Out Sensor</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Input Shaping</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>PowerLossRecovery</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>RemoteAccess</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Touchscreen</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Wifi</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Multicolor</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Multicolor Price</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Link To Shop</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
        {:catch error}
            <P style="color:red">{error.message}</P>
        {/await}
    {/if}
</div>