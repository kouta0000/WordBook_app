
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
let currentLang=$state("フランス語")  
const english:Array<Wordbook> = [];
const french:Array<Wordbook> = [];
const german:Array<Wordbook> = [];
const russian:Array<Wordbook> = [];
const chinese:Array<Wordbook> = [];
const korean:Array<Wordbook> = [];
const oldjap:Array<Wordbook> = [];
for (const wordbook of wordbooks) {
    if (wordbook.language=="英語") english.push(wordbook)
    else if (wordbook.language=="フランス語") french.push(wordbook)
    else if (wordbook.language=="ドイツ語") german.push(wordbook)
    else if (wordbook.language=="ロシア語") russian.push(wordbook)
    else if (wordbook.language=="中国語") chinese.push(wordbook)
    else if (wordbook.language=="韓国語") korean.push(wordbook)
    else if (wordbook.language=="古文") oldjap.push(wordbook)
}

</script>
    
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <h1 class="text-3xl mb-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">ライブラリー</h1>
        <div class="flex overflow-auto mb-10 py-2">
            <button onclick={() => currentLang="フランス語"} class="btn rounded-3xl bg-indigo-100">フランス語</button>
            <button onclick={()=>currentLang="英語"} class="btn rounded-3xl bg-indigo-100">英語</button>
            <button onclick={()=>currentLang="ドイツ語"} class="btn rounded-3xl bg-indigo-100">ドイツ語</button>
            <button onclick={()=>currentLang="ロシア語"} class="btn rounded-3xl bg-indigo-100">ロシア語</button>
            <button onclick={()=>currentLang="中国語"} class="btn rounded-3xl bg-indigo-100">中国語</button>
            <button onclick={()=>currentLang="韓国語"} class="btn rounded-3xl bg-indigo-100">韓国語</button>
            <button onclick={()=>currentLang="古文"} class="btn rounded-3xl bg-indigo-100">古文</button>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            {#if currentLang=="英語"}
            {#each english as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {:else if currentLang=="フランス語"}
            {#each french as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {:else if currentLang=="ドイツ語"}
            {#each german as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {:else if currentLang=="ロシア語"}
            {#each russian as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {:else if currentLang=="中国語"}
            {#each chinese as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {:else if currentLang=="韓国語"}
            {#each korean as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {:else if currentLang=="古文"}
            {#each oldjap as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {/if}
        </div>
        <div class="w-full h-50"></div>
    </div>