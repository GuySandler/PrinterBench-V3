<script>
    import { Button, P, Select, Spinner } from "flowbite-svelte";
    import { getSubCollection, getCollections, DeleteDoc } from "$lib/firebase"

    let GetDataOption = "";
    let GetDataType = "";
    let PrinterSelect = "";
    let PendingSelect = "";
</script>
<center>
    <div style="float:left;margin:20px;padding:20px;border-radius:5px" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
        <P>Get Data</P>
        <Select bind:value={GetDataOption} style="width:25vw;margin-bottom:15px">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="reviews">Reviews</option>
        </Select>
        <P>Data Type</P>
        <Select bind:value={GetDataType} style="width:25vw;margin-bottom:15px">
            <option value="id">Id</option>
            <option value="data">Data</option>
        </Select>
    </div>
    {#if GetDataOption != "" && GetDataType != ""}
        <div style="float:right;margin:20px;padding:20px;border-radius:5px;width:65vw;" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
            {#await getCollections(GetDataOption, GetDataType)}
                <Spinner size={8} />
            {:then Data}
                {#if GetDataOption == "approved"}
                    <Select bind:value={PrinterSelect} style="width:25vw;margin-bottom:15px">
                        {#each Data as item}
                            <option value={item}>{item}</option>
                        {/each}
                    </Select>
                    {#await getSubCollection("approved", PrinterSelect)}
                        <Spinner size={8} />
                    {:then SubData}
                        <P>{Data}</P>
                        <P>{SubData}</P>
                    {/await}
                {:else}
                    <Select bind:value={PendingSelect} style="width:25vw;margin-bottom:15px">
                        {#each Data as item, i}
                            <option value={i}>{item}</option>
                        {/each}
                    </Select>
                    <P>Got Data</P>
                    <P>{Data[PendingSelect]}</P>
                {/if}
                <Button>Update</Button>
                <Button>Move</Button>
                <Button on:click={DeleteDoc(GetDataOption, Data)}>Delete</Button>
            {/await}
        </div>
    {/if}
</center>