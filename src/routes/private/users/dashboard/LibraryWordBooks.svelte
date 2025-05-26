
<script lang="ts">
import {fly, scale} from "svelte/transition";
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
            <a href="./dashboard/library/{wordbook.id}/wordsdashboard" out:fly={{duration:500, y:300}}  class="transition-all duration-200 active:bg-emerald-100 shadow-lg flex w-4/5 sm:grow rounded-3xl bg-white border-1 border-emerald-500">
                <svg class="w-1/12 m-1" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="20" class="fill-emerald-500"/>
                </svg>
                <p class="mx-auto pr-10 my-4">{wordbook.wb_name}</p>
            </a>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>