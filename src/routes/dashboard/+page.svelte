<script>
    import { Avatar, Button, P, Select, Spinner } from "flowbite-svelte";
    import { getSubCollection, Approve, DeleteDoc, GetDashboardDocs, GetDashboardDocsId} from "$lib/firebase"

    let GetDataOption = "";
    let GetDataType = "";
    let PrinterSelect = "";
    let PendingSelect = null;
    function GetField(data, i) {
        console.log(data[i].brand);
        // return data[i];
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
        <div style="float:right;margin:20px;padding:20px;border-radius:5px;width:65vw;" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
            {#await GetDashboardDocs(GetDataOption, "")}
                <Spinner size={8} />
            {:then Data}
                {#if GetDataOption == "approved"}
                    <Select bind:value={PrinterSelect} style="width:25vw;margin-bottom:15px">
                        {#each Data as item}
                            <option value={item}>{item}</option>
                        {/each}
                    </Select>
                    {#await GetDashboardDocs(GetDataOption, PrinterSelect)}
                        <Spinner size={8} />
                    {:then SubData}
                        {#if GetDataOption == "approved"}
                            <P>{GetField(SubData, GetDataType)}</P>
                        {:else if PendingSelect == "reviews"}
                            <P>{Data.name}</P>
                            <Avatar src={Data.img} />
                            <P>{Data.review}</P>
                            <P>{Data.rating}</P>
                        {/if}
                    {/await}
                {:else}
                <!-- <P>{Data[0].name}</P> -->
                    <Select bind:value={PendingSelect} style="width:25vw;margin-bottom:15px">
                        {#each Data as item, i}
                            <option value={i}>{item.name}</option>
                        {/each}
                    </Select>
                    <!-- <h1>{Data[PendingSelect]}</h1> -->
                    <!-- <button on:click={() => GetField(Data, PendingSelect)}>test</button> -->
                    {#if PendingSelect != null}
                        <P>{Data[PendingSelect].brand}'s {Data[PendingSelect].name}</P>
                        <P>{Data[PendingSelect].sizex} x {Data[PendingSelect].sizey} x {Data[PendingSelect].sizez}</P>
                        <P>${Data[PendingSelect].price}</P>
                        <P>{Data[PendingSelect].type}</P>
                        <P>speed: {Data[PendingSelect].speed} mm/s, accel: {Data[PendingSelect].acceleration}</P>
                        <P>Features</P>
                        <P>airPurifier: {Data[PendingSelect].airPurifier}</P>
                        <P>autoBedLeveling: {Data[PendingSelect].autoBedLeveling}</P>
                        <P>autoZOffset: {Data[PendingSelect].autoZOffset}</P>
                        <P>camera: {Data[PendingSelect].camera}</P>
                        <P>enclosure: {Data[PendingSelect].enclosure}</P>
                        <P>filamentRunOutSensor: {Data[PendingSelect].filamentRunOutSensor}</P>
                        <P>inputShaping: {Data[PendingSelect].inputShaping}</P>
                        <P>powerLossRecovery: {Data[PendingSelect].powerLossRecovery}</P>
                        <P>remoteAccess: {Data[PendingSelect].remoteAccess}</P>
                        <P>touchscreen: {Data[PendingSelect].touchscreen}</P>
                        <P>wifi: {Data[PendingSelect].wifi}</P>
                        <P>multicolor: {Data[PendingSelect].multicolor}</P>
                        {#if Data[PendingSelect].multicolor}
                            <P>multicolor Price: ${Data[PendingSelect].multicolorPrice}</P>
                        {/if}
                    {/if}
                {/if}
                <Button on:click={() => Approve(Data[PendingSelect].name, Data[PendingSelect])}>Approve</Button>
                <Button on:click={() => DeleteDocNew()}>Delete</Button>
            {/await}
        </div>
    {/if}
</center>