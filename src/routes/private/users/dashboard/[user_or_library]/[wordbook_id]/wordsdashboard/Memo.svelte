<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import {enhance} from"$app/forms";
    import Overlay from "./Overlay.svelte";
    import IntersectionObserver from "svelte-intersection-observer";
    import AudioButton from "./AudioButton.svelte";
    import { Transition } from "svelte-transition";
    let { words, wb_name, user_or_library, language} = $props();
    let wordsc = $state(words);
    let hide:boolean = $state(false)
    let shows: boolean[] = $state(Array(words.length).fill(false));
    let cards:HTMLDivElement[] = $state([]);
    let isChecked: boolean = $state(false);
    let isFlipped: boolean = $state(false);
    let soundmode: boolean = $state(false);
    let showPhrases: boolean[] = $state([]);
    let displays:Promise<string>[] = $state([]);
    let showButtons:boolean[] = $state(Array(words.length).fill(false));
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
    const fetchtext = async (word:string, type:string) => {
        const res = await fetch(`/api/text?language=${language}&type=${type}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text: word})
        });
        const response = await res.json();
        const text = response.result;
        return text.split("*").join('\n') as string
    }
    
    </script>
    
<div class="bg-slate-100/80 px-2 flex justify-center md:justify-end items-center fixed absolute top-15 py-2 lg:h-15 w-full flex flex-row flex-wrap gap-1 mb-10 z-11">
        <button class="active:scale-0.8 shadow-sm btn btn-sm bg-indigo-500 rounded-3xl w-min basis-0" onclick={() => shuffleWords(wordsc)}>
            <p class="whitespace-nowrap text-white font-bold">混ぜる</p>
        </button>
        <button class="active:scale-0.8 shadow-sm btn btn-sm bg-indigo-500 rounded-3xl w-min basis-0" onclick={() => isFlipped = !isFlipped}>
            <p class="whitespace-nowrap text-white font-bold">反転</p>
        </button>
        <button class="active:scale-0.8 shadow-sm btn btn-sm bg-indigo-500 rounded-3xl w-min basis-0" onclick={() => soundmode = !soundmode}>
            <p class="whitespace-nowrap text-white font-bold">{!soundmode? "音": "視覚"}</p>
        </button>
        {#if user_or_library == "user"}
            <a href="../../../dashboard/user" class="active:scale-80 shadow-sm btn btn-sm bg-indigo-200 rounded-full w-min basis-0">
               <p class="whitespace-nowrap text-indigo-400 font-bold">戻る</p>
            </a>
        {:else}
            <a href="../../../dashboard/library" class="active:scale-80 shadow-sm btn btn-sm bg-indigo-200 rounded-full w-min basis-0 text-black">
                <p class="whitespace-nowrap text-indigo-400 font-extrabold">戻る</p>
            </a>
        {/if}
    </div>
    
    <div class="w-full pt-16 pb-15 md:pb-20 flex flex-col min-h-screen gap-2 items-center">
        <div class="mt-23 mb-10 lg:mt-20  w-full flex gap-5 justify-center items-center realtive h-20">
            <h1 class="shadow-lg p-6 text-white text-2xl max-w-3/5 rounded-3xl bg-linear-to-br from-indigo-500 to-sky-500">{wb_name}</h1>
            <div class="flex flex-col gap-2 justify-center">
            <a href="./4taku" class="btn btn-base border-none shadow-sm rounded-3xl">4択テスト</a>
            <a href="./input" class="btn btn-base border-none shadow-sm rounded-3xl">入力テスト</a>
            </div>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <button onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 lg:h-20 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true, "hidden":!isChecked, "block":isChecked}}>
                <p class="text-white">削除</p>
            </button>
            
            {#each wordsc as word,i (word.id)}
            <IntersectionObserver element={cards[i]} on:observe={(e) => {shows[i] = false;showPhrases[i]=false;showButtons[i]=false}}>
            <div bind:this={cards[i]} out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-4/5 sm:grow flex flex-col justify-center items-start relative">
                <div class="flex justify-center w-full shadow-lg bg-white shadow-sm rounded-t-xl relative">
                    <div class="grow flex flex-col max-w-7/8 relative">
                        <div style={parent_style} class="w-full">
                            <p use:fit={{min_size:10, max_size:22}} class="font-sans font-semibold pl-5 pr-1 pt-5 pb-1 text-2xl">{!soundmode? (isFlipped? word.meaning: word.term) : "📢"}</p>
                        </div>
                        <div class="flex w-full">
                        <div onclick={()=>{showButtons[i]=!showButtons[i];showPhrases[i]=false;}} class="w-1/8 aspect-square p-[10px]">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                
                                <g class="transition-all duration-200" transform={!showButtons[i]? "rotate(0)": "rotate(45,100,100)"}>
                                <polygon stroke-width="15" stroke="gray" points="100,20 90,100 110,100" />
                                <polygon stroke-width="15" stroke="gray" points="180,100 100,90 100,110" />
                                <polygon stroke-width="15" stroke="gray" points="100,180 90,100 110,100"  />
                                <polygon stroke-width="15" stroke="gray" points="20,100 100,90 100,110" />
                                </g>
                                <!-- 風車の中心 -->
                                <circle cx="100" cy="100" r="10" fill="gray" />
                              </svg>
                              
                              
                        </div>
                        {#if shows[i]}
                        <div style={parent_style}>
                        <p use:fit={{min_size:5, max_size:20}} transition:fade={{duration:300}} class="text-gray-500 text-right font-sans p-1 pr-2">
                        {isFlipped? word.term: word.meaning}
                        </p>
                        </div>
                        {/if}
                        </div>
                    </div>  
                    <div class="flex flex-col border-l-1 border-indigo-300 justify-center items-center w-1/8 z-2">
                        <AudioButton word={word} language={language} />
                        <button class="w-full aspect-square bg-indigo-400 text-sm text-white text-bold" onclick={() => {shows[i] = !shows[i]}}>
                        {"意味"}
                        </button>
                    </div>
                </div>
                
                    <div class="w-full bg-white relative transition-all duration-200 rounded-b-3xl">
                        {#if showButtons[i]}
                        <div transition:slide class="w-full rounded-b-3xl overflow-hidden flex self-start">
                            <button onclick={() => {showPhrases[i]=true;displays[i] = fetchtext(word.term,"synonym")}} class="btn btn-sm bg-red-300 text-white border-tr-white border-bl-black border-1 w-1/3 text-sm">
                                類語
                            </button>
                            <button onclick={() => {showPhrases[i]=true;displays[i] = fetchtext(word.term,"collocation")}} class="btn btn-sm bg-blue-300 text-white w-1/3 text-sm">
                                表現
                            </button>
                            <button onclick={() => {showPhrases[i]=true;displays[i] = fetchtext(word.term, "phrase")}} class="btn btn-sm bg-green-300 text-white w-1/3 text-sm">
                                例文
                            </button>
                        </div>
                        {/if}
                {#if showPhrases[i]}
                <div transition:slide class={{"w-full overflow-hidden bg-white rounded-3xl flex flex-col transition-all duration-200":true}}>
                    <div class="w-full p-5 pt-10 flex flex-col">
                    <div class="bg-gray-100 rounded-xl w-full p-3 overflow-y-auto">
                        {#await displays[i]}
                        <p>生成中</p><p class="loading loading-dots"></p>
                        {:then value}
                        <p  style="white-space: pre-line;">{value}</p>
                        {:catch error}
                        <p>通信エラー：もう一度試してください</p>
                        {/await}
                    </div>
                    <button onclick={() => showPhrases[i] = false} class="text-lg btn btn-xs btn-netural btn-outline self-end aspect-square mt-3">☓</button>
                    </div>
                </div>
                {/if}
                </div>
            </div>
            </IntersectionObserver>
            {/each}
            
        </div>
        <div class="w-full h-50"></div>
    </div>
    <style>
        .container {
            width:10px;
        }
    </style>
