<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import {enhance} from"$app/forms";
    import Overlay from "./Overlay.svelte";
    import IntersectionObserver from "svelte-intersection-observer";
    import AudioButton from "./AudioButton.svelte";
    import { Transition } from "svelte-transition";
    let { words,wb_id, wb_name, user_or_library, language} = $props();
    let wordsc = $state(words);
    let hide:boolean = $state(false)
    let shows: boolean[] = $state(Array(words.length).fill(false));
    let cards:HTMLDivElement[] = $state([]);
    let isChecked: boolean = $state(false);
    let isFlipped: boolean = $state(false);
    let soundmode: boolean = $state(false);
    let regenerate:boolean = $state(false);
    let showPhrases: boolean[] = $state([]);
    let formToChecks:HTMLButtonElement[] =$state([])
    let displays:Promise<{examples:Array<{example:string,translation:string}>}>[] = $state([]);
    let currentviews:string[] = $state(Array(words.length).fill(false));
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
    const fetchtext = async (word:string, type:string, id:number, regenerate:boolean) => {
        const res = await fetch(`/api/text?language=${language}&type=${type}&id=${id}&regenerate=${regenerate? "yes":""}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text: word})
        });
        const response = await res.json();
        return response
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
            <h1 class="shadow-lg p-6 text-indigo-700 text-xl max-w-3/5 rounded-3xl bg-linear-to-br from-indigo-100 to-gray-100">{wb_name}</h1>
            <div class="flex flex-col gap-2 justify-center">
            <a href="./4taku" class="btn btn-base border-none shadow-sm rounded-3xl">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>
                4択テスト
            </a>
            <a href="./input" class="btn btn-base border-none shadow-sm rounded-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  入力テスト
                </a>
            </div>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <button onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 lg:h-20 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true, "hidden":!isChecked, "block":isChecked}}>
                <p class="text-white">削除</p>
            </button>
            
            {#each wordsc as word,i (word.id)}
            <IntersectionObserver element={cards[i]} on:observe={(e) => {shows[i] = false;showPhrases[i]=false}}>
            <div bind:this={cards[i]} out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-9/10 sm:grow flex flex-col justify-center items-start relative">
                <div class="flex justify-center w-full shadow-lg bg-white shadow-sm rounded-t-xl rounded-r-xl relative">
                    <div class="grow flex flex-col max-w-9/10 relative">
                        <!--
                        <div class="absolute top-0 right-0 w-1/7">
                        <form method="POST"class="p-3" use:enhance action="?/checked">
                            <input name="checked" value={word.checked} type="hidden">
                            <input type="hidden" value={word.id} name="id">
                            <button type="submit" class={{"btn aspect-square btn-warning btn-xs":true, "btn-outline":!word.checked, "btn-active":word.checked}}>{word.checked?"✔":" "}</button>
                        </form>
                        </div>
                    -->
                        <div style={parent_style} class="w-full">
                            <p use:fit={{min_size:10, max_size:22}} class="font-sans font-semibold pl-5 pr-1 pt-5 pb-1 text-2xl">{!soundmode? (isFlipped? word.meaning: word.term) : "📢"}</p>
                        </div>
                        <div class="flex w-full p-1 h-9">
                        {#if shows[i]}
                        <div style={parent_style}>
                        <p use:fit={{min_size:15, max_size:25}} transition:fade={{duration:300}} class="text-gray-500 text-right font-sans p-1 pr-2">
                        {isFlipped? word.term: word.meaning}
                        </p>
                        </div>
                        {/if}
                        </div>
                    </div>  
                    <div class="flex flex-col bg-indigo-200 rounded-r-xl justify-center items-center w-1/10 z-2">
                        <AudioButton word={word.term} language={language} />
                        <button class="w-full aspect-square text-sm p-2" onclick={() => {shows[i] = !shows[i]}}>
                            {#if !shows[i]}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-full">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                            {:else}
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-full">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                              </svg>
                            {/if}                          
                        </button>
                    </div>
                </div>
                
                    <div class="w-full relative transition-all duration-200 rounded-b-3xl">
                        <div transition:slide class=" w-9/10 rounded-b-3xl overflow-hidden flex self-start">
                            <button onclick={() => {showPhrases[i]=true;currentviews[i]="synonym"; displays[i] = fetchtext(word.term,"synonym",word.id,false)}} class="btn  btn-sm bg-gray-200 text-indigo-700  w-1/3">
                                類語
                            </button>
                            <button onclick={() => {showPhrases[i]=true;currentviews[i]="collocation";displays[i] = fetchtext(word.term,"collocation",word.id,false)}} class="btn btn-sm bg-gray-300/80 text-indigo-700  w-1/3">
                                表現
                            </button>
                            <button onclick={() => {showPhrases[i]=true;currentviews[i]="sentence";displays[i] = fetchtext(word.term, "sentence", word.id,false)}} class="btn btn-sm bg-gray-300 text-indigo-700  w-1/3">
                                例文
                            </button>
                        </div>
                {#if showPhrases[i]}
                <div transition:slide class={{"w-full overflow-hidden bg-white rounded-3xl flex flex-col transition-all duration-200":true}}>
                    <div class="w-full p-5 flex flex-col gap-3">
                        <button class={{"self-end btn btn-xs  w-1/3 rounded-3xl btn-primary text-xs text-bold btn-outline":true}} onclick={()=> displays[i]=fetchtext(word.term, currentviews[i],word.id,true)}>
                            再生成
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-3 size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                              </svg>
                            </button>
                    <div class={{"rounded-xl w-full gap-3":true, "flex flex-col":currentviews[i] == "sentence", "grid grid-cols-2":currentviews[i] != "sentence"}}>
                        
                        
                        {#await displays[i]}
                        <p class="loading loading-dots"></p>
                        {:then value}
                        {#each value.examples as ex,index (index)}
                            <div class="bg-gray-100 rounded-xl w-full p-5 pt-6 flex flex-col relative">
                            <p>{ex.example}</p>
                            <p>({ex.translation})</p>
                            <div class={{"absolute bottom-0 right-0":true, "w-1/11":currentviews[i]=="sentence", "w-1/5":currentviews[i] != "sentence"}}>
                                <AudioButton word={ex.example} language={language}/>
                            </div>
                            </div>
                        {/each}
                        {:catch error}
                        <p>通信エラー：もう一度試してください</p>
                        {/await}
                    </div>
                    <button onclick={() => showPhrases[i] = false} class="self-end aspect-square mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                          </svg>
                        </button>
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
