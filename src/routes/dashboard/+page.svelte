<script>
    import { Button, P, Select, Spinner } from "flowbite-svelte";
    import { getData, getCollections } from "$lib/firebase"

    let GetDataOption = "";
    let GetDataType = "";
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
                <P>Got Data</P>
                <P>{Data}</P>
                <Button>Update</Button>
                <Button>Move</Button>
                <Button>Delete</Button>

            <!-- {:catch}
                <P>Failed to get data</P> -->
            {/await}
        </div>
    {/if}
</center>