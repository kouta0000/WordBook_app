<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import TestBackground1 from './TestBackground1.svelte';
    import TestBackground2 from './TestBackground2.svelte';
    import type { Action } from 'svelte/action';
    import {onMount} from "svelte";
    onMount(()=>{
        displayNewWords();
        showdisplays=true;
    })
    //変数宣言
    let { wordslist, user_or_library } = $props();
    
    let progress:number = $state(0);
    let main_display: Word | string = $state("Loading...");
    let subdisplays: Array<Word> = $state([]);
    let showcurtain: boolean = $state(true);
    let showarrow: boolean = $state(false);
    let t_start_x: number = $state(0);
    let t_end_x: number = $state(0);
    const swipeLength: number = 50;
    let showdisplays: boolean = $state(false);
    let testend: boolean = $state(false);
    let isCorrect: boolean = $state(false);
    let isWrong: boolean = $state(false);
    let showContinue: boolean = $state(false);
    let toContinue:boolean = $state(false);
    const corrects= [10,20,30,40,50];
    let showAnswers = $state(false)
    let isDisabled = $state(false);
    interface Word {
        "term": string;
        "meaning": string;

    };
    //関数宣言
    //テスト開始画面
    
    //単語のランダム選択ロジック。
    const getRandom4Words = (words: Array<Word>) => {
        const al: number = words.length;
        const indices: Set<number> = new Set();
        const result: Array<Word> = [];
        if (al < 4) {
            return words;
        };
        while (indices.size < 4) {
            const n = Math.floor(Math.random()*al);
            indices.add(n);
        }
        for (const i of indices) {
            result.push(words[i]);
        }
        return result;
    };

    const showArrow = () => {
        showarrow = true;
    }
    //選択した単語をdisplay変数に代入
    const displayNewWords = () => {
        subdisplays = [];
        const words: Array<Word> = getRandom4Words(wordslist);
        const wl = words.length;
        if (wl < 4) {
            main_display = "単語の数が不足しています";
            subdisplays = [{"term":"", "meaning":""}, {"term":"", "meaning":""}, {"term":"", "meaning":""}, {"term":"", "meaning":""}];
        } else {
            for (let i=0; i<4; i++) {
                subdisplays.push(words[i]);
            };
            const n = Math.floor(Math.random()*4);
            main_display = words[n];
        };
        showdisplays = true;
    };
    const checkAnswer = (a:string):void => {
        if (a == (typeof main_display == "string" ? main_display : main_display.meaning)) {
            isCorrect=true;
            isWrong=false;
        } else {
            isWrong=true;
            isCorrect=false;
        }
    }

    //スワイプ操作処理
    const handleOnTouchStart = (e: TouchEvent) => {
        t_start_x = e.touches[0].clientX;
    };
   /* const handleOnTouchMove = (e: TouchEvent) => {
        const t_acctualx: number = e.touches[0].clientX;
        if (t_start_x-t_acctualx >= 0) {
            arrowx = (t_start_x-t_acctualx);
        }

    };*/

    const handleOnTouchEnd = (e: TouchEvent) => {
            t_end_x = e.changedTouches[0].clientX;
        if (t_start_x-t_end_x >= swipeLength) {
            showarrow = false;
            showdisplays = false;
            toContinue=false;
            if (isCorrect) progress++;
            showAnswers=false;
            isDisabled=false;
            isCorrect = false;
            isWrong = false;
        };

        
        
    };
</script>

<div id="displays" class="w-full h-screen pt-30 lg:pt-35 pb-10 flex flex-col lg:flex-row gap-7 justify-center items-center overflow-clip z-19 relative">
    
    {#each corrects as i (i)}
    {#if progress==i && i<50 && !toContinue}
    <div out:fade={{delay:600}} in:scale={{duration:1000, opacity:0, start:0.1}} id="displays" class="w-full h-full flex absolute justify-center items-center  z-22 bg-stone-100/40">
        <div class="w-full md:w-3/5 flex flex-col  gap-7 justify-center items-center p-5 bg-slate-100 rounded-xl">
        <h1 class="text-4xl whitespace-nowrapt">{i}問正解🎉</h1>
        <p class="text-2xl">テストを続けますか</p>
        <button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {toContinue=true}}><p class="text-xl">続ける</p></button>
        <button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {testend=true; showdisplays=false; isCorrect=false; isWrong=false;showarrow=false;progress=0}}><p class="text-xl">終わる</p></button>
        </div>
    </div>
    {:else if progress==i && i==50}
    <div out:fade={{delay:600}} in:scale={{duration:1000, opacity:0, start:0.1}} id="displays" class="w-full h-full absolute flex justify-center items-center  z-22 bg-stone-100/40">
        <div class="w-full md:w-3/5 flex flex-col  gap-7 justify-center items-center p-5 bg-slate-100 rounded-xl">
        <h1 class="text-4xl whitespace-nowrapt">{i}問正解🎉</h1>
        <p class="text-2xl">テストを続けますか</p>
        <button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {progress=0}}><p class="text-xl">続ける</p></button>
        <button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {testend=true; showdisplays=false; isCorrect=false; showAnswers=false;toContinue=false;isDisabled=false;isWrong=false;showarrow=false;progress=0}}><p class="text-xl">終わる</p></button>
        </div>
    </div>
    {/if}
    {/each}
    <TestBackground2 />
    {#if showdisplays}
    
    <progress class="progress bg-slate-600 h-4 w-3/5 z-18 absolute top-10 mx-auto" value={(progress%10)*10} max="100"></progress>
        <div id="main_display" class={{
            "flex w-4/5 md:w-3/5 lg:w-2/5 lg:ml-5 rounded-xl bg-purple-100 shadow-lg shadow-purple-200 grow-2 mb-10 lg:mb-6 relative z-18":true,
            "border-stone-300 shadow-lg": true}} in:fly={{duration:300, x:300}} out:fly={{duration:400, x:-500}}>
            <h1 class="m-auto text-2xl sm:text-3xl md:text-6xl p-4 lg:p-15 font-bold ">{ typeof main_display == "string" ? main_display : main_display.term }</h1>
            <svg preserveAspectRatio="xMidYMidmeet" height="110" width="110" class={{"absolute -right-8 lg:right-10 -top-15 fill-none rotate-140":true, "opacity-0":!isCorrect}}>
                <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400 transition-all duration-500 ease-out" stroke-width="10" stroke-dasharray="314 315" style="stroke-dashoffset:{isCorrect? 0: 315};" />
            </svg>
            <svg preserveAspectRatio="xMidYMidmeet" height="110" width="110" class="absolute -right-8 lg:right-auto lg:left-10 -top-15 fill-none">
                <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-500 transition-all duration-200" stroke-width="10" stroke-dasharray="142" style="stroke-dashoffset:{isWrong? 0: 142};" />
                <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-500 transition-all delay-200 duration-200" stroke-width="10" stroke-dasharray="142" style="stroke-dashoffset:{isWrong? 0: 142};" />
            </svg>
        </div>
        
        <div class="w-4/5 md:w-3/5 lg:w-2/5 flex flex-col grow justify-center items-center gap-5 z-18">
            <div class={{
                "flex w-full  bg-purple-100 shadow-md shadow-purple-200 rounded-xl  grow-1 lg:mr-5 relative": true, 
                "border-stone-300 shadow-lg": true,
                "pointer-events-none":isDisabled}} in:fly={{duration:300, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {isDisabled=true;showArrow();showAnswers=true;checkAnswer(subdisplays[0].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[0]?.meaning }</h1>
                
                {#if subdisplays[0].meaning==(typeof main_display == "string" ? main_display : main_display.meaning)}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-1 bottom-1 left-1">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400" stroke-width="10">
                    </svg>
                </div>
                {/if}
                {:else}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-3 bottom-3 left-3">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10"/>
                        <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10" />
                    </svg>
                </div>
                {/if}
                {/if}
            </div>
            <div class={{
                "flex w-full bg-purple-100 shadow-md shadow-purple-200 rounded-xl  border-1 grow-1 lg:mr-5": true, 
                "border-stone-300 shadow-lg relative": true,
                "pointer-events-none":isDisabled}} in:fly={{duration:350, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {isDisabled=true;showArrow();showAnswers=true;checkAnswer(subdisplays[1].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[1].meaning }</h1>
                
                {#if subdisplays[1].meaning==(typeof main_display == "string" ? main_display : main_display.meaning)}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-1 bottom-1 left-1">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400" stroke-width="10">
                    </svg>
                </div>
                {/if}
                {:else}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-3 bottom-3 left-3">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10"/>
                        <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10" />
                    </svg>
                </div>
                {/if}
                {/if}
            </div>
            <div class={{
                "flex w-full bg-purple-100 shadow-md shadow-purple-200 rounded-xl  border-1 grow-1 lg:mr-5": true, 
                "border-stone-300 shadow-lg relative":true,
                "pointer-events-none":isDisabled}} in:fly={{duration:400, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {isDisabled=true;showArrow();showAnswers=true;checkAnswer(subdisplays[2].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[2].meaning }</h1>
               
                {#if subdisplays[2].meaning==(typeof main_display == "string" ? main_display : main_display.meaning)}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-1 bottom-1 left-1">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400" stroke-width="10">
                    </svg>
                </div>
                {/if}
                {:else}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-3 bottom-3 left-3">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10"/>
                        <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10" />
                    </svg>
                </div>
                {/if}
                {/if}
            </div>
            <div onoutroend={() => displayNewWords()} class={{
                "flex w-full bg-purple-100 shadow-md shadow-purple-200 rounded-xl  border-1 grow-1 lg:mr-5": true, 
                "border-stone-300 shadow-lg relative": true,
                "pointer-events-none":isDisabled}} in:fly={{duration:450, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {isDisabled=true;showArrow();showAnswers=true;checkAnswer(subdisplays[3].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[3].meaning }</h1>
              
                {#if subdisplays[3].meaning==(typeof main_display == "string" ? main_display : main_display.meaning)}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-1 bottom-1 left-1">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400" stroke-width="10">
                    </svg>
                </div>
                {/if}
                {:else}
                {#if showAnswers}
                <div in:fade class="absolute aspect-square top-3 bottom-3 left-3">
                    <svg preserveAspectRatio="xMidYMidmeet" viewBox="0 0 110 110" class="size-full fill-none">
                        <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10"/>
                        <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-600" stroke-width="10" />
                    </svg>
                </div>
                {/if}
                {/if}
            </div>
            <div class="w-full hidden lg:block h-3"></div>

            <div id="test_buttons" class="w-full flex flex-row gap-3 items-center mt-4 lg:mt-3 lg:mr-5 ">
                <a href="./wordsdashboard" class={{
                    "btn border-indigo-600 bg-indigo-600 text-white font-bold rounded-2xl lg:grow": true
                    }}>テスト終了</a>
                <button class={{
                    "btn border-indigo-600 hidden lg:block bg-indigo-600 font-bold text-white  rounded-2xl lg:grow": true, 
                    }} onclick={() => {showdisplays = false;if(isCorrect)progress++;showAnswers=false;isDisabled=false;toContinue=false;isCorrect=false;isWrong=false}}>次の問題</button>
            </div>
        </div>
    {/if}

    {#if showarrow}
    <div id="swipe_arrow" class="z-20 flex justify-center items-end lg:hidden w-1/3 h-full absolute right-10 bottom-0" 
    ontouchstart={handleOnTouchStart} ontouchend={handleOnTouchEnd}>
        <svg  viewBox="0 0 100 100" height="50" width="50" class="mb-65 animate-bounce opacity-10" >
            <polyline points="50,0 0,50 50,100" stroke-width="10" stroke-linecap="round"/>
            <polyline points="100,0 50,50 100,100" stroke-width="10" stroke-linecap="round"/>
        </svg>
    </div>
    {/if}
   
</div>
   
