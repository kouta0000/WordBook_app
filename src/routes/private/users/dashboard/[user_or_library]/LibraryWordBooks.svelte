
<script lang="ts">
import {fly, scale} from "svelte/transition";
import {elasticOut} from "svelte/easing";
interface Props {
	wordbooks: Wordbook[];
}
interface Wordbook {
    wb_name: any;
    id: any;
}
let { wordbooks }: Props = $props();  

</script>
    
    <div class="w-full min-h-screen pt-30 flex flex-col">
        <h1 class="text mb-10 mx-auto">ライブラリー</h1> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
          
            {#each wordbooks as wordbook (wordbook.id)}
            <a href="./library/{wordbook.id}/wordsdashboard" out:fly={{duration:500, y:300}}  class="transition-all duration-200 active:bg-emerald-100 shadow-lg flex  w-4/5 sm:grow rounded-3xl bg-white border-1 border-stone-300">
                <div class="w-1/12 m-1 mb-2 mask mask-pentagon bg-sky-500 aspect-ratio-1/1">
                </div>
                <p class="mx-auto pr-10 my-4">{wordbook.wb_name}</p>
            </a>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>