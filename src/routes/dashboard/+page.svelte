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
                    {#if PrinterSelect != ""}
                        {#await getSubCollection("approved", PrinterSelect, "cases")}
                            <Spinner size={8} />
                        {:then SubData}
                            <P>{SubData[0].brand}'s {SubData[0].name}</P>
                            <P>{SubData[0].sizex} x {SubData[0].sizey} x {SubData[0].sizez}</P>
                            <P>${SubData[0].price}</P>
                            <P>{SubData[0].type}</P>
                            <P>speed: {SubData[0].speed} mm/s, accel: {SubData[0].acceleration}</P>
                            <P>Features</P>
                            <P>airPurifier: {SubData[0].airPurifier}</P>
                            <P>autoBedLeveling: {SubData[0].autoBedLeveling}</P>
                            <P>autoZOffset: {SubData[0].autoZOffset}</P>
                            <P>camera: {SubData[0].camera}</P>
                            <P>enclosure: {SubData[0].enclosure}</P>
                            <P>filamentRunOutSensor: {SubData[0].filamentRunOutSensor}</P>
                            <P>inputShaping: {SubData[0].inputShaping}</P>
                            <P>powerLossRecovery: {SubData[0].powerLossRecovery}</P>
                            <P>remoteAccess: {SubData[0].remoteAccess}</P>
                            <P>touchscreen: {SubData[0].touchscreen}</P>
                            <P>wifi: {SubData[0].wifi}</P>
                            <P>multicolor: {SubData[0].multicolor}</P>
                            {#if SubData[0].multicolor}
                                <P>multicolor Price: ${SubData[0].multicolorPrice}</P>
                            {/if}
                            <!-- add a thing to go across cases -->
                            <!-- <P>{SubData[0].brand}</P> -->
                        {/await}
                    {/if}
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
            {:catch error}
                <p style="color:red">{error.message}</p>
            {/await}
        </div>
    {/if}
</center>