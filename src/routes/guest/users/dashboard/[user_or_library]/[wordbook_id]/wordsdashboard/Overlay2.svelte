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
    "inset-0 absolute rounded-3xl z-9 transition-all duration-300 flex":true,
    "bg-emerald-500": (i % 6 == 0),
    "bg-emerald-300 md:bg-emerald-500": (i % 6 == 1),
    "bg-emerald-500 md:bg-emerald-300 lg:bg-emerald-500": (i % 6 == 2),
    "bg-emerald-300  ": (i % 6 == 3),
    "bg-emerald-500 lg:bg-emerald-300": (i % 6 == 4),
    "bg-emerald-300 md:bg-emerald-500 lg:bg-emerald-300": (i % 6 == 5),
    "opacity-0":isClicked
}}  onclick={() => {isClicked = !isClicked; setTimeout(() => isClicked = !isClicked, 2500)}}>
<p class="m-auto text-white">show</p>
</div>
{/if}