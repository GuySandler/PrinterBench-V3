<script lang="ts">
    import { Spinner, P } from "flowbite-svelte";
    import StarRating from 'svelte-star-rating';

    import { getData } from "$lib/firebase"
    let rating = 2.5;

    let config = {
        readOnly: false,
        countStars: 7,
        range: {min: 0, max: 7},
        score: rating,
        showScore: true,
        scoreFormat: function(){ return `(${this.score.toFixed(0)}/${this.countStars})` },
        starConfig: {
            size: 500,
            fillColor: '#FFFFFF',
            strokeColor: "#FFFFFF",
            unfilledColor: '#FFFFFF',
            strokeUnfilledColor: '#FFFFFF'
        }
    }
    function LeaderBoardClick(number) {
        console.log(number);
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
        background-color: #f0f0f0;
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
            </button>
        {/each}
    {:catch error}
        <P style="color: red">{error.message}</P>
    {/await}
</center></div>
