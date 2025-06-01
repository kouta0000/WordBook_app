
<script lang="ts">
import Gabyo2 from "./Gabyo2.svelte";
interface Props {
	wordbooks: Wordbook[];
}
interface Wordbook {
    wb_name: any;
    id: any;
    language: any;
}
let { wordbooks}: Props = $props();  

</script>
    
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <h1 class="text-3xl mb-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">ライブラリー</h1> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
          
            {#each wordbooks as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-2xl mb-2">{wordbook.wb_name}</h1>
                <p class="text-stone-300 text-sm">言語：{wordbook.language?? "none"} ; 語数： ; 最終更新：</p>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>