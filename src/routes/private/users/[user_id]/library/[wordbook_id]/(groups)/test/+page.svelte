<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    import type { Action } from 'svelte/action';
    import type { PageProps } from "./$types";

    //変数宣言
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
    let { data }: PageProps = $props();
    interface Word {
        "term": string;
        "meaning": string;

    };
    const wordslist: Array<Word> = data.data;
    //関数宣言
    //テスト開始画面
    const eraseCurtain = () => {
        testend = false;
        showcurtain=false;
    };
    const showCurtain = () => {
        showcurtain = true;
        showdisplays = false;
    };
    const startTest: Action = (node) => {
        node.addEventListener("click", () => eraseCurtain());
            return {
                destroy() {
                    displayNewWords();
                }
            };
        };
    const toNext: Action = (node) => {
        const b: HTMLElement | null = document.getElementById("tonext");
        b?.addEventListener("click", () => showdisplays = false )
            return {
                destroy() {
                    displayNewWords();
                }
            };
        };
    
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
            isCorrect = false;
            isWrong = false;
        };

        
        
    };
</script>
{#if showcurtain}
    <div id="start_curtain" out:scale={{duration:500, opacity:0, start:2}} onoutroend={displayNewWords} class="w-full h-screen fixed absolute pt-18 pb-15 md:pb-20 flex justify-center items-center bg-base-100 z-20">
        <button class="btn bg-emerald-400 rounded-xl w-9/10 md:w-1/2 lg:w-1/5 h-1/5" onclick={eraseCurtain}>
            <p class="text-white font-bold text-xl">テスト開始</p>
        </button>
    </div>
{/if}



<div id="displays" class="w-full h-screen pt-35 lg:pt-30 pb-35 md:pb-40 lg:pb-30 flex flex-col lg:flex-row gap-7 justify-spacearound items-center relative overflow-clip">
    {#if showdisplays} 
        <div id="main_display" class="flex w-4/5 md:w-3/5 lg:w-2/5 lg:ml-5 rounded-3xl bg-white border-1 border-emerald-300 grow-2 mb-10 lg:mb-6 relative" in:fly={{duration:300, x:300}} out:fly={{duration:400, x:-500}}>
            <h1 class="m-auto text-2xl sm:text-3xl md:text-6xl p-4 lg:p-15 font-bold ">{ typeof main_display == "string" ? main_display : main_display.term }</h1>
            <svg height="110" width="110" class="absolute -right-8 lg:right-10 -top-15 fill-none rotate-140">
                <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400 transition-all duration-500 ease-out" stroke-width="10" stroke-dasharray="314" style="stroke-dashoffset:{isCorrect? 0: 314};" />
            </svg>
            <svg height="110" width="110" class="absolute -right-8 lg:right-auto lg:left-10 -top-15 fill-none">
                <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-500 transition-all duration-200" stroke-width="10" stroke-dasharray="142" style="stroke-dashoffset:{isWrong? 0: 142};" />
                <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-500 transition-all delay-200 duration-200" stroke-width="10" stroke-dasharray="142" style="stroke-dashoffset:{isWrong? 0: 142};" />
            </svg>
        </div>
        
        <div class="w-4/5 md:w-3/5 lg:w-2/5 flex flex-col grow justify-center items-center gap-5">
        
            <div class="flex w-full rounded-3xl bg-white border-1 border-emerald-300 grow-1 lg:mr-5" in:fly={{duration:300, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {showArrow();checkAnswer(subdisplays[0].meaning)}}>
                <h1 class="m-auto p-3 lg-py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[0].meaning }</h1>
            </div>
            <div class="flex w-full rounded-3xl bg-white border-1 border-emerald-300 grow-1 lg:mr-5" in:fly={{duration:350, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {showArrow();checkAnswer(subdisplays[1].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[1].meaning }</h1>
            </div>
            <div class="flex w-full rounded-3xl bg-white border-1 border-emerald-300 grow-1 lg:mr-5" in:fly={{duration:400, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {showArrow();checkAnswer(subdisplays[2].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[2].meaning }</h1>
            </div>
            <div onoutroend={() => testend? showCurtain(): displayNewWords()} class="lg:mr-5 flex w-full rounded-3xl bg-white border-1 border-emerald-300 grow-1" in:fly={{duration:450, x:150}} out:fly={{duration:400, x:-500}} onclick={() => {showArrow();checkAnswer(subdisplays[3].meaning)}}>
                <h1 class="m-auto p-3 lg:py-4 text-sm sm:text-md md:text-xl lg:text-xl">{ subdisplays[3].meaning }</h1>
            </div>
            <div class="w-full hidden lg:block h-3"></div>
            <div id="test_buttons" class="w-full flex flex-row gap-3 items-center lg:mr-5 ">
                <button class="btn btn-soft btn-success rounded-2xl lg:grow" onclick={() => {testend=true; showdisplays=false; isCorrect=false; isWrong=false;showarrow=false}}>テスト終了</button>
                <button class="hidden lg:block btn btn-soft btn-success rounded-2xl grow" onclick={() => {showdisplays = false;isCorrect=false;isWrong=false}}>次の問題</button>
            </div>
        </div>
    {/if}

    {#if showarrow}
    <div id="swipe_arrow" class="flex justify-center items-center lg:hidden w-1/3 h-full absolute right-0 bottom-0" 
    ontouchstart={handleOnTouchStart} ontouchend={handleOnTouchEnd}>
        <svg  viewBox="0 0 100 100" height="50" width="50" class="mt-40 animate-bounce opacity-10" >
            <polyline points="50,0 0,50 50,100" stroke-width="10" stroke-linecap="round"/>
            <polyline points="100,0 50,50 100,100" stroke-width="10" stroke-linecap="round"/>
        </svg>
    </div>
    {/if}
   
</div>
   