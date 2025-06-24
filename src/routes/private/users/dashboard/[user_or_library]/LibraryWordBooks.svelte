
<script lang="ts">
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
let animaux = $state(["/images/comodo.png", "/images/monkey.png", "/images/turtle.png", "/images/penguin.png", "/images/camereon.png", "/images/tasma.png", "/images/frog.png", "/images/aligator.png", "/images/lezard.png"])
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
            { id: 1, name: '英語', nativeName: 'English', data:english },
            { id: 2, name: '中国語', nativeName: '中文', data:chinese },
            { id: 3, name: '韓国語', nativeName: '한국어', data:korean },
            { id: 4, name: 'ドイツ語', nativeName: 'Deutsch', data:german },
            { id: 5, name: 'フランス語', nativeName: 'Français', data:french },
            { id: 6, name: 'ロシア語', nativeName: 'Русский', data:russian },
        ];

</script>
    
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <div class="tabs tabs-border tabs-xs md:tabs-lg  bg-white/80 rounded-b-3xl overflow-x-auto overflow-y-hidden flex-nowrap fixed absolute top-15 py-2 h-15 w-full flex flex-row justify-center items-center overflow-x-auto gap-1 z-10">
            {#each languages as language (language.id)}
            
            <input onchange={()=> currentLang=language.name} type="radio" aria-label={language.name} id={language.id} name="language" class="tab">
            
            {/each}
        </div>
        <h1 class="text-3xl mb-10 mt-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">ライブラリー</h1>
        
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            {#each languages as language}
            {#if currentLang==language.name}
            {#each language.data as wordbook, id (wordbook.id)}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-9/10 sm:grow rounded-xl bg-white relative">
                <a href="./library/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class="flex w-full justify-start items-center">
                    <div class="avatar w-1/5 aspect-square self-center">
                        <div class="mask mask-squircle size-full relative">
                            <div class="absolute inset-0 bg-radial from-indigo-400/20 to-indigo-100/20"></div>
                          <img class="" src={animaux[(id+1)*(language.id)%(animaux.length)]} />
                        </div>
                    </div>
                    <div class="w-3/5 flex flex-col justify-center p-3">
                    <h1 class="text-xl text-center">{wordbook.wb_name}</h1>
                    </div>
                    <div class="absolute bottom-0 right-0 p-2">
                        <p class="text-right text-indigo-400 text-md">{wordbook.word_number? `${wordbook.word_number}語`: ""}</p> 
                    </div>
                </div>
                
            </div>
            {/each}
            {/if}
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
