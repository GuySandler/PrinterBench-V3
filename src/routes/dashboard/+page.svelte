<script>
    import { Button, P, Select, Spinner } from "flowbite-svelte";
    import { getSubCollection, getCollections, DeleteDoc, GetDashboardDocs, GetDashboardDocsId} from "$lib/firebase"

    let GetDataOption = "";
    let GetDataType = "";
    let PrinterSelect = "";
    let PendingSelect = "";
    function GetField(data, i) {
        return data[i][0];
    }
    function DeleteDocNew() {
        GetDashboardDocsId().then(data =>
            DeleteDoc("pending", data[parseInt(PendingSelect)])
        )
    }
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
        <!-- <div style="float:right;margin:20px;padding:20px;border-radius:5px;width:65vw;" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
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
        </div> -->
        <div style="float:right;margin:20px;padding:20px;border-radius:5px;width:65vw;" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
            {#await GetDashboardDocs(GetDataOption)}
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
                            <option value={i}>{item[0].name}</option>
                        {/each}
                    </Select>
                    {#if PendingSelect != ""}
                        <P>{GetField(Data, PendingSelect).brand}'s {GetField(Data, PendingSelect).name}</P>
                        <P>{GetField(Data, PendingSelect).sizex} x {GetField(Data, PendingSelect).sizey} x {GetField(Data, PendingSelect).sizez}</P>
                        <P>${GetField(Data, PendingSelect).price}</P>
                        <P>{GetField(Data, PendingSelect).type}</P>
                        <P>speed: {GetField(Data, PendingSelect).speed} mm/s, accel: {GetField(Data, PendingSelect).acceleration}</P>
                        <P>Features</P>
                        <P>airPurifier: {GetField(Data, PendingSelect).airPurifier}</P>
                        <P>autoBedLeveling: {GetField(Data, PendingSelect).autoBedLeveling}</P>
                        <P>autoZOffset: {GetField(Data, PendingSelect).autoZOffset}</P>
                        <P>camera: {GetField(Data, PendingSelect).camera}</P>
                        <P>enclosure: {GetField(Data, PendingSelect).enclosure}</P>
                        <P>filamentRunOutSensor: {GetField(Data, PendingSelect).filamentRunOutSensor}</P>
                        <P>inputShaping: {GetField(Data, PendingSelect).inputShaping}</P>
                        <P>powerLossRecovery: {GetField(Data, PendingSelect).powerLossRecovery}</P>
                        <P>remoteAccess: {GetField(Data, PendingSelect).remoteAccess}</P>
                        <P>touchscreen: {GetField(Data, PendingSelect).touchscreen}</P>
                        <P>wifi: {GetField(Data, PendingSelect).wifi}</P>
                        <P>multicolor: {GetField(Data, PendingSelect).multicolor}</P>
                        {#if GetField(Data, PendingSelect).multicolor}
                            <P>multicolor Price: ${GetField(Data, PendingSelect).multicolorPrice}</P>
                        {/if}
                    {/if}
                {/if}
                <Button>Approve</Button>
                <Button on:click={() => GetDashboardDocsId().then(data => console.log(data))}>Move</Button>
                <Button on:click={() => DeleteDocNew()}>Delete</Button>
            {/await}
        </div>
    {/if}
</center>