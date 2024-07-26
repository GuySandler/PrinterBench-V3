<script>
    import { Avatar, Button, P, Select, Spinner } from "flowbite-svelte";
    import { getSubCollection, Approve, DeleteDoc, GetDashboardDocs, GetDashboardDocsId, RecalcPoints } from "$lib/firebase"

    let GetDataOption = "";
    let PrinterSelect = "";
    let PendingSelect = null;
    let InfoSelect = null;
    function DeleteDocNew(PendingSelect) {
        GetDashboardDocsId("pending").then(data =>
            DeleteDoc("pending", data[parseInt(PendingSelect)])
        )
        RedoAwait = !RedoAwait;
    }
    let RedoAwait = false;
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>
<center>
    <div style="float:left;margin:20px;padding:20px;border-radius:5px" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
        <P>Get Data</P>
        <Select bind:value={GetDataOption} style="width:25vw;margin-bottom:15px">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="reviews">Reviews</option>
        </Select>
    </div>

    {#if GetDataOption != ""}
        <div style="float:right;margin:20px;padding:20px;border-radius:5px;width:65vw;" class="bg-gray-300 dark:bg-gray-600 border-2 border-black dark:border-white">
            {#await GetDashboardDocs(GetDataOption, RedoAwait)}
                <Spinner size={8} />
            {:then Data}
                {#if GetDataOption == "approved" || GetDataOption == "reviews"}
                    <P>Select Printer</P>
                    <Select bind:value={PrinterSelect} style="width:25vw;margin-bottom:15px">
                        {#each Data as item}
                            <option value={item}>{item}</option>
                        {/each}
                    </Select>
                    {#if PrinterSelect != ""}
                        {#await getSubCollection("approved", PrinterSelect, ((GetDataOption == "approved") ? 'cases' : 'reviews'))}
                            <Spinner size={8} />
                        {:then SubData}
                            <Select bind:value={InfoSelect} style="width:25vw;margin-bottom:15px">
                                {#each SubData as item, i}
                                    <option value={i}>{i}</option>
                                {/each}
                            </Select>
                            {#if GetDataOption == "approved" && InfoSelect != null}
                                <P>{SubData[InfoSelect].brand}'s {SubData[InfoSelect].name}</P>
                                <P>{SubData[InfoSelect].sizex} x {SubData[InfoSelect].sizey} x {SubData[InfoSelect].sizez}</P>
                                <P>${SubData[InfoSelect].price}</P>
                                <P>{SubData[InfoSelect].type}</P>
                                <P>speed: {SubData[InfoSelect].speed} mm/s, accel: {SubData[InfoSelect].acceleration}</P>
                                <P>Features</P>
                                <P>airPurifier: {SubData[InfoSelect].airPurifier}</P>
                                <P>autoBedLeveling: {SubData[InfoSelect].autoBedLeveling}</P>
                                <P>autoZOffset: {SubData[InfoSelect].autoZOffset}</P>
                                <P>camera: {SubData[InfoSelect].camera}</P>
                                <P>enclosure: {SubData[InfoSelect].enclosure}</P>
                                <P>filamentRunOutSensor: {SubData[InfoSelect].filamentRunOutSensor}</P>
                                <P>inputShaping: {SubData[InfoSelect].inputShaping}</P>
                                <P>powerLossRecovery: {SubData[InfoSelect].powerLossRecovery}</P>
                                <P>remoteAccess: {SubData[InfoSelect].remoteAccess}</P>
                                <P>touchscreen: {SubData[InfoSelect].touchscreen}</P>
                                <P>wifi: {SubData[InfoSelect].wifi}</P>
                                <P>multicolor: {SubData[InfoSelect].multicolor}</P>
                                {#if SubData[InfoSelect].multicolor}
                                    <P>multicolor Price: ${SubData[InfoSelect].multicolorPrice}</P>
                                {/if}
                                {:else if GetDataOption == "reviews" && InfoSelect != null}
                                    <P>{SubData[InfoSelect].name}</P>
                                    <Avatar src={SubData[InfoSelect].img} alt={SubData[InfoSelect].name} />
                                    <P style="overflow-wrap: break-word;overflow-y:auto;">{SubData[InfoSelect].review}</P>
                            {/if}
                            <Button on:click={() => RecalcPoints(PrinterSelect, InfoSelect)}>Recalc Points</Button>

                        {:catch error}
                            <P>Probobly None Found</P>
                            <P>{error}</P>
                        {/await}
                    {/if}
                {:else}
                    <Select bind:value={PendingSelect} style="width:25vw;margin-bottom:15px">
                        {#each Data as item, i}
                            <option value={i}>{item.name}</option>
                        {/each}
                    </Select>
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
                        <Button on:click={() => Approve(Data[PendingSelect].name, Data[PendingSelect])}>Approve</Button>
                    {/if}
                {/if}
                <Button on:click={() => DeleteDocNew(PendingSelect)}>Delete</Button>
            {:catch error}
                <p style="color:red">{error.message}</p>
            {/await}
            <Button on:click={() => RedoAwait = !RedoAwait}>Refresh</Button>

        </div>
    {/if}
</center>