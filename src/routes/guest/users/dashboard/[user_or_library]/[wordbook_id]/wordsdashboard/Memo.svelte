<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import {enhance} from"$app/forms";
    import Overlay from "./Overlay.svelte";
    let { words, wb_name, user_or_library} = $props();
    let wordsc = $state(words);
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
    
    </script>
    
    <div class="bg-slate-200/80 px-2 flex justify-center md:justify-end items-center fixed absolute top-15 py-2 lg:h-15 w-full flex flex-row flex-wrap gap-1 mb-10 z-11">
        
        <button class="active:scale-0.8 shadow-sm btn bg-indigo-500 rounded-3xl  w-min basis-0" onclick={()=> {hide=!hide}}>
            <p class="whitespace-nowrap text-white font-bold">{!hide? "隠す":"元に戻す"}</p>
        </button>
        <button class="active:scale-0.8 shadow-sm btn bg-indigo-500 rounded-3xl w-min basis-0" onclick={() => shuffleWords(wordsc)}>
            <p class="whitespace-nowrap text-white font-bold">シャッフル</p>
        </button>
        <button class="active:scale-0.8 shadow-sm btn bg-indigo-500 rounded-3xl w-min basis-0" onclick={() => isFlipped = !isFlipped}>
            <p class="whitespace-nowrap text-white font-bold">フリップ</p>
        </button>
        {#if user_or_library == "user"}
            <a href="../../../dashboard/user" class="active:scale-80 shadow-sm btn bg-indigo-100 rounded-full w-min basis-0">
               <p class="whitespace-nowrap text-indigo-400 font-bold">戻る</p>
            </a>
        {:else}
            <a href="../../../dashboard/library" class="active:scale-80 shadow-sm btn bg-indigo-100 rounded-full w-min basis-0 text-black">
                <p class="whitespace-nowrap text-indigo-400 font-extrabold">戻る</p>
            </a>
        {/if}
    </div>
    
    <div class="w-full pt-16 pb-15 md:pb-20 flex flex-col min-h-screen gap-2 items-center">
        <div class="mt-23 mb-4 lg:mt-20  w-full flex justify-center  items-center realtive h-20">
            <h1 class="border-1 bg-white shadow-lg border-stone-300 rounded-3xl p-4 font-sans">{wb_name}</h1>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-x-0 items-center place-items-center relative">
            <button onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 lg:h-20 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true, "hidden":!isChecked, "block":isChecked}}>
                <p class="text-white">削除</p>
            </button>
            
            {#each wordsc as word,i (word.id)}
            <div out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-4/5 sm:grow flex flex-col justify-center items-start">
                <div class="flex bg-white shadow-sm border-stone-300 rounded-xl z-9 -translate-x-3 translate-y-1 z-1">
                    <div style={parent_style}>
                    <p use:fit={{min_size:10, max_size:20}} class="px-7 py-3 font-semibold font-sans text-xl">{isFlipped ? word.meaning: word.term}</p>
                    </div>                
                </div>
                <div class="flex w-full border-stone-300 shadow-sm rounded-xl bg-white relative">
                    <Overlay i={i} hide={hide}/> 
                    <p class="mx-auto my-4 max-w-9/10 font-sans text-lg">{isFlipped? word.term: word.meaning}</p>
                </div>
                <hr class="w-full scale-70 h-2 mt-4 bg-indigo-200 border-0 rounded-sm md:mb-1 dark:bg-gray-700">
            </div>
            {/each}
            
        </div>
        <div class="w-full h-50"></div>
    </div>
    <style>
        .container {
            width:10px;
        }
    </style>
