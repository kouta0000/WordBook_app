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
    "inset-0 rounded-xl absolute z-8 flex transition-all duration-300 bg-slate-300":true, "opacity-0":isClicked}}  onclick={() => {isClicked = !isClicked; setTimeout(()=>isClicked = !isClicked, 2000)}}>
{#if i == 0}
<p class="m-auto text-white font-black blink opacity-0">タッチ</p>
{/if}
</div>
{/if}
<style>
  @keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.blink {
  animation: blink 1s linear 3;
}

</style>