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
            <a href="./4taku" class="btn btn-base border-none shadow-sm rounded-3xl">4択テスト</a>
            <a href="./input" class="btn btn-base border-none shadow-sm rounded-3xl">入力テスト</a>
            </div>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <button onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 lg:h-20 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true, "hidden":!isChecked, "block":isChecked}}>
                <p class="text-white">削除</p>
            </button>
            
            {#each wordsc as word,i (word.id)}
            <IntersectionObserver element={cards[i]} on:observe={(e) => {shows[i] = false;showPhrases[i]=false}}>
            <div bind:this={cards[i]} out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-9/10 sm:grow flex flex-col justify-center items-start relative">
                <div class="flex justify-center w-full shadow-lg bg-white shadow-sm rounded-t-xl relative">
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
                        <div class="flex w-full p-1 h-7">
                        {#if shows[i]}
                        <div style={parent_style}>
                        <p use:fit={{min_size:5, max_size:15}} transition:fade={{duration:300}} class="text-gray-500 text-left pl-8 font-sans">
                        {isFlipped? word.term: word.meaning}
                        </p>
                        </div>
                        {/if}
                        </div>
                    </div>  
                    <div class="flex flex-col border-l-1 border-indigo-300 justify-center items-center w-1/10 z-2">
                        <AudioButton word={word.term} language={language} />
                        <button class="w-full aspect-square bg-indigo-400 text-sm text-white text-bold" onclick={() => {shows[i] = !shows[i]}}>
                        {"意味"}
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
                        <button class={{"self-end btn btn-xs  w-1/3 rounded-3xl btn-primary text-xs text-bold btn-outline":true}} onclick={()=> displays[i]=fetchtext(word.term, currentviews[i],word.id,true)}>再生成</button>
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
