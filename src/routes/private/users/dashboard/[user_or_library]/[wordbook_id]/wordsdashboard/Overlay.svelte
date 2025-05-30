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
    "inset-0 rounded-xl absolute z-8 flex transition-all duration-300":true,
    "bg-stone-200": (i % 6 == 0),
    "bg-stone-200 md:bg-sky-200": (i % 6 == 1),
    "bg-stone-200 md:bg-sky-100 lg:bg-sky-200": (i % 6 == 2),
    "bg-stone-200  ": (i % 6 == 3),
    "bg-stone-200 lg:bg-sky-100": (i % 6 == 4),
    "bg-stone-200 md:bg-sky-200 lg:bg-sky-100": (i % 6 == 5),
    "opacity-0":isClicked
}}  onclick={() => {isClicked = !isClicked; setTimeout(()=>isClicked = !isClicked, 2500)}}>
<p class="m-auto text-white font-bold">show</p>
</div>
{/if}
