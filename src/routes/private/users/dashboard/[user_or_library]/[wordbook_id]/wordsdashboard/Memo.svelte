<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {enhance} from"$app/forms";
    import Overlay from "./Overlay.svelte";
    import Overlay2 from "./Overlay2.svelte";
    let { words, wb_name, user_or_library } = $props();
    let overlays = $state([])
    let wordsl = $state(words);
    let hide:boolean = $state(false)
    let isChecked: boolean = $state(false);
    let isFlipped: boolean = $state(false);
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    const shuffleWords = (words: Array<Word>) => {
        const length: number = words.length-1;
        for (let i = length; i > 0; i--) {
            const random: number = Math.floor(Math.random()*(i+1));
            [words[i], words[random]] = [words[random], words[i]];
        }
    }
    let length = $derived(words.length)
    
    </script>
    
    <div style="background-color: rgba(250, 250, 249, 0.75);" class="flex justify-center items-center fixed absolute top-18 pt-2 lg:h-15 w-full flex flex-row flex-wrap gap-3 mb-10 z-11">
        {#if user_or_library == "user"}
        <button class="btn btn-outline btn-info rounded-2xl grow w-min basis-0" onclick={()=> {hide=!hide}}>
            <p class="whitespace-nowrap">{!hide? "隠すモード":"元に戻す"}</p>
        </button>
        
        <button class="btn btn-outline btn-info rounded-2xl grow w-min basis-0" onclick={() => isFlipped = !isFlipped}>
            <p class="whitespace-nowrap">フリップ</p>
        </button>
        {:else if user_or_library == "library"}
        <button class="btn btn-outline btn-success rounded-2xl grow w-min basis-0" onclick={()=> {hide=!hide}}>
                <p class="whitespace-nowrap">{!hide? "隠すモード":"元に戻す"}</p>
        </button>
        <button class="btn btn-outline btn-success rounded-2xl grow w-min basis-0" onclick={() => shuffleWords(wordsl)}>
            <p class="whitespace-nowrap ">シャッフル</p>
        </button>
        <button class="btn btn-outline btn-success rounded-2xl grow w-min basis-0" onclick={() => isFlipped = !isFlipped}>
            <p class="whitespace-nowrap ">フリップ</p>
        </button>
        {/if}
        
    </div>
    
    <div class="w-full pt-18 pb-15 md:pb-20 flex flex-col min-h-screen gap-5 items-center">
        <h1 class="text mt-25 lg:mt-25 mb-2">{wb_name}</h1> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <button onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 lg:h-20 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true, "hidden":!isChecked, "block":isChecked}}>
                <p class="text-white">削除</p>
            </button>
            
            {#if user_or_library == "user"}
            {#each words as word,i (word.id)}
            <div out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-4/5 sm:grow flex flex-col justify-center items-start">
                <span  class="flex bg-white border-1 border-sky-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{isFlipped ? word.meaning: word.term}</p>
                </span>
                <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-sky-300 relative">
                    <Overlay i={i} hide={hide}/> 
                    <p class="mx-auto my-4 max-w-9/10 font-sans text-lg">{isFlipped? word.term: word.meaning}</p>
                </div>
            </div>
            {/each}
            
            {:else if user_or_library == "library"}

            {#each wordsl as word, i (word.id)}
            <div in:fly={{duration:300, y:300}} class="w-4/5 sm:grow flex flex-col justify-center items-start">
                <span class="flex bg-white border-1 border-emerald-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{isFlipped ? word.meaning: word.term}</p>
                </span>
                <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-emerald-300 relative">
                    <Overlay2 hide={hide} i={i} />
                    <p class="mx-auto my-4 max-w-9/10 font-sans teext-lg">{isFlipped? word.term: word.meaning}</p>
                </div>
            </div>
            {/each}
            {/if}
        </div>
        <div class="w-full h-50"></div>
    </div>
    