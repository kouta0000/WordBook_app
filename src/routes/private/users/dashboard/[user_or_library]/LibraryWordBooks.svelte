
<script lang="ts">
import Gabyo2 from "./Gabyo2.svelte";
interface Props {
	wordbooks: Wordbook[];
}
interface Wordbook {
    wb_name: any;
    id: any;
    language: any;
    word_number: any;
}
let { wordbooks}: Props = $props();
let currentLang=$state("英語")  
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
const languages = [
            { id: 'english', name: '英語', nativeName: 'English', data:english },
            { id: 'chinese', name: '中国語', nativeName: '中文', data:chinese },
            { id: 'korean', name: '韓国語', nativeName: '한국어', data:korean },
            { id: 'german', name: 'ドイツ語', nativeName: 'Deutsch', data:german },
            { id: 'french', name: 'フランス語', nativeName: 'Français', data:french },
            { id: 'russian', name: 'ロシア語', nativeName: 'Русский', data:russian },
        ];

</script>
    
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <div class="tabs tabs-border tabs-xs md:tabs-lg  bg-white/80 rounded-b-3xl overflow-x-auto overflow-y-hidden flex-nowrap fixed absolute top-15 py-2 h-15 w-full flex flex-row justify-center items-center overflow-x-auto gap-1 z-11">
            {#each languages as language (language.id)}
            
            <input onchange={()=> currentLang=language.name} type="radio" aria-label={language.name} id={language.id} name="language" class="tab">
            
            {/each}
        </div>
        <h1 class="text-3xl mb-10 mt-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">ライブラリー</h1>
        
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            {#each languages as language}
            {#if currentLang==language.name}
            {#each language.data as wordbook (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-4/5 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="w-1/8 absolute right-0 top-0 aspect-ratio-1/1">
                    <Gabyo2 />                                   
                </div>
                <h1 class="text-xl mb-2">{wordbook.wb_name}</h1>
                <p class="text-right text-indigo-400 text-lg">{wordbook.word_number? `${wordbook.word_number}語`: ""}</p>
                <hr class="h-2 w-full bg-indigo-300 rounded-3xl">
            </div>
            {/each}
            {/if}
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>