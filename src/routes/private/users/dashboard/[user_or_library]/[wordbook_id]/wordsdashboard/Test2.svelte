<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import TestBackground1 from './TestBackground1.svelte';
    import TestBackground2 from './TestBackground2.svelte';
    import type { Action } from 'svelte/action';

    //変数宣言
    let { wordslist, user_or_library } = $props();


    let progress:number = $state(0);
    let main_display: string = $state("Loading...");
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

    let blocks: Array<string> = $state([]);
    let answer:string = $state("")
    let inputedWord:string[] = $state([]);

    let toContinue:boolean = $state(false);
    let corrects = [10,20,30,40,50]
  
    interface Word {
        "term": string;
        "meaning": string;

    };
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
    const getBlocks = (word:string):Array<string> => {
        const blocks:Array<string> = Array(25).fill("")
        const length = word.length;
       
        const indices: Set<number> = new Set();
        while (indices.size < 25) {
            const n = Math.floor(Math.random()*(25));
            indices.add(n);
        }
        let wordarray=word.split("");
        for (const i of indices) {
            if (wordarray.length >0){
                blocks[i] = wordarray.pop()!;
            }
        }
        return blocks
    };

    const showArrow = () => {
        showarrow = true;
    }
    //選択した単語をdisplay変数に代入
    const displayNewWords = () => {
        const length = wordslist.length
        let index = Math.floor(Math.random()*(length));
        let word = wordslist[index];
        while (word.term.length>=25) {
            index = Math.floor(Math.random()*(length));
            word = wordslist[index];
        }
        blocks = getBlocks(word.term);
        main_display = word.meaning
        answer = word.term
        showdisplays = true;
    };
    const handleOnBlockClick = (block:string, i:number):void => {
        inputedWord.push(block);
        blocks[i]="";
    }
    const handleOnclickBack = ():void => {
        if (!inputedWord) return;
        let wordtoback = inputedWord.pop();
        while (wordtoback) {
            const randomIndex = Math.floor(Math.random()*25);
            if (!blocks[randomIndex]) {
                [blocks[randomIndex], wordtoback] = [wordtoback, ""]
            }
        }
    }
    const checkAnswer = (res:string[]):void => {
        const length = res.length;
        if (res.join("") == answer.slice(0,length)) {
            if (!blocks.join("")) {
                isCorrect = true;
                showarrow=true;
            } else {
                isWrong=false;
                return
            }           
        } else {
            console.log(answer)
            isWrong = true;
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
            if (isCorrect) progress++
            isCorrect = false;
            isWrong = false;
            inputedWord=[];
        };

        
        
    };
</script>



{#if showcurtain}
    <div id="start_curtain" out:scale={{duration:500, opacity:0, start:2}} onoutroend={displayNewWords} class="w-full h-screen fixed absolute pt-18 pb-15 md:pb-20 flex flex-col justify-center items-center gap-5 bg-stone-100 z-20">
        <button class="mt-10 btn bg-indigo-500 rounded-3xl w-9/10 md:w-1/2 lg:w-1/5 h-1/5" onclick={eraseCurtain}>
            <p class="text-white font-bold text-xl">４択問題</p>
        </button>
    </div>
{/if}
{#each corrects as i (i)}
{#if progress==i && i<50 && !toContinue}
<div out:fade={{delay:400}} in:scale={{duration:1000, opacity:0, start:0.1}} id="displays" class="w-full h-screen flex flex-col lg:flex-row gap-7 justify-center items-center  z-20 bg-stone-100 relative">
<h1 class="text-4xl whitespace-nowrapt">５０問達成🎉</h1>
<p class="text-2xl">テストを続けますか</p>
<button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {toContinue=true}}><p class="text-xl">続ける</p></button>
<button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {testend=true; showdisplays=false; isCorrect=false; isWrong=false;showarrow=false;progress=0}}><p class="text-xl">終わる</p></button>
</div>
{:else if progress==i && i==50}
    <div out:fade={{delay:400}} in:scale={{duration:1000, opacity:0, start:0.1}} id="displays" class="w-full h-screen flex flex-col lg:flex-row gap-7 justify-center items-center  z-20 bg-stone-100 relative">
        <h1 class="text-4xl whitespace-nowrapt">{i}問正解🎉</h1>
        <p class="text-2xl">テストを続けますか</p>
        <button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {progress=0}}><p class="text-xl">続ける</p></button>
        <button class="btn btn-base rounded-3xl shadow-lg" onclick={() => {testend=true; showdisplays=false; isCorrect=false; isWrong=false;showarrow=false;progress=0}}><p class="text-xl">終わる</p></button>
    </div>
{/if}
{/each}



<div id="displays" class="w-full h-screen pt-30 lg:pt-35 pb-30 lg:pb-35 flex flex-col lg:flex-row gap-7 justify-center items-center overflow-clip z-19 relative">
    <TestBackground1 />
    {#if showdisplays}
    
        <div  class="absolute left-auto right-auto top-3 w-full gap-1 flex justify-center items-center p-2 z-18">
            <div class="radial-progress bg-white text-indigo-500 border-indigo-400 border-1" style="--value:{(progress%10)*10};--size:3rem;" role="progressbar">
                {progress}
            </div>
        </div> 
        <div onoutroend={() => testend? showCurtain(): displayNewWords()} id="main_display" class="bg-linear-to-br from-gray-950 via-emerald-950 to-gray-950 shadow-2xl shadow-emerald-500 inset-shadow-2xl flex w-4/5 md:w-3/5 lg:w-2/5 lg:ml-5 rounded-3xl border-1 border-emerald-300 text-emerald-500 mb-10 lg:mb-6 relative z-18" in:fly={{duration:300, x:300}} out:fly={{duration:400, x:-500}}>
            <h1 class="text-shadow-sm text-emerald-300 text-shadow-emerald-300/80 m-auto text-2xl md:text-6xl p-7 lg:p-15">{ main_display }</h1>
            <svg preserveAspectRatio="xMidYMidmeet" height="110" width="110" class={{"absolute -right-8 lg:right-10 -top-15 fill-none rotate-140":true, "opacity-0":!isCorrect}}>
                <circle cx="55" cy="55" r="50" stroke-linecap="round" class="overflow-visible stroke-red-400 transition-all duration-500 ease-out" stroke-width="10" stroke-dasharray="314 315" style="stroke-dashoffset:{isCorrect? 0: 315};" />
            </svg>
            <svg preserveAspectRatio="xMidYMidmeet" height="110" width="110" class="absolute -right-8 lg:right-auto lg:left-10 -top-15 fill-none">
                <line x1="105" y1="5" x2="5" y2="105" stroke-linecap="round" class="stroke-sky-500 transition-all duration-200" stroke-width="10" stroke-dasharray="142" style="stroke-dashoffset:{isWrong? 0: 142};" />
                <line x1="5" y1="5" x2="105" y2="105" stroke-linecap="round" class="stroke-sky-500 transition-all delay-200 duration-200" stroke-width="10" stroke-dasharray="142" style="stroke-dashoffset:{isWrong? 0: 142};" />
            </svg>
        </div>
        <div id="main_input" class="bg-linear-to-br from-gray-950 via-emerald-950 to-gray-950 shadow-2xl shadow-emerald-500 inset-shadow-2xl flex  w-4/5 md:w-3/5 lg:w-2/5 lg:ml-5 rounded-3xl border-1 border-emerald-300 text-emerald-500 mb-3 lg:mb-6 relative z-18" in:fly={{duration:300, x:300}} out:fly={{duration:400, x:-500}}>
            <h1 class="text-shadow-sm text-emerald-300 text-shadow-emerald-300/80 m-auto text-2xl md:text-6xl p-3 lg:p-15">{inputedWord.join("")}<span class="">|</span></h1>
            <button onclick={()=>{handleOnclickBack();checkAnswer(inputedWord)}} class="btn btn-outline text-xl absolute top-0 bottom-0 rounded-3xl right-0 aspect-square">＜</button>
        </div>
        <div class="w-4/5 lg:w-3/10 aspect-square grid grid-cols-5 z-18">
        {#each blocks as block, i (i)}
        <div onclick={() => {handleOnBlockClick(block, i);checkAnswer(inputedWord)}} class="flex justify-center items-center bg-linear-to-r from-gray-950 via-emerald-950 to-gray-950 aspect-square border-1 border-emerald-300 shadow-2xl inset-shadow-2xl shadow-emerald-500 bg-black">
            {#if !(block=="")}<p out:fly={{duration:200, y:-300}} in:fade class="text-shdow-lg text-shadow-emerald-300/80 text-emerald-200 text-5xl">{block === "\u0020"? "sp": block}</p>{/if}
        </div>
        {/each}
        </div>
        
    {/if}

    {#if showarrow}
    <div id="swipe_arrow" class="z-20 flex justify-center items-end lg:hidden w-1/3 h-full absolute right-10 bottom-0" 
    ontouchstart={handleOnTouchStart} ontouchend={handleOnTouchEnd}>
        <svg  viewBox="0 0 100 100" height="50" width="50" class="mb-65 animate-bounce opacity-90" >
            <polyline points="50,0 0,50 50,100" class="fill-emerald-300" stroke-width="10" stroke-linecap="round"/>
            <polyline points="100,0 50,50 100,100" class="fill-emerald-300" stroke-width="10" stroke-linecap="round"/>
        </svg>
    </div>
    {/if}
   
</div>
   
