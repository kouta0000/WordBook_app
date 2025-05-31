
<script lang="ts">
import {fly, scale} from "svelte/transition";
import Gabyo2 from "./Gabyo2.svelte";
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
            <div in:fly={{duration:300, y:20}} out:fade class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute left-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <p class="mx-auto my-8">{wordbook.wb_name}</p>
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>