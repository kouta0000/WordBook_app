<script lang="ts">
    import {fade} from "svelte/transition";
    let isClicked: boolean = $state(false);
    let { i, hide } = $props();
</script>

{#if !hide}
<div transition:fade={{duration:150}} class="inset-0 opacity-0 bg-white absolute">
</div>
{:else}
<div transition:fade={{duration:150}} class={{
    "inset-0 rounded-xl absolute z-8 flex transition-all duration-300 bg-stone-300":true, "opacity-0":isClicked}}  onclick={() => {isClicked = !isClicked; setTimeout(()=>isClicked = !isClicked, 2500)}}>
<p class="m-auto text-white font-bold">show</p>
</div>
{/if}
