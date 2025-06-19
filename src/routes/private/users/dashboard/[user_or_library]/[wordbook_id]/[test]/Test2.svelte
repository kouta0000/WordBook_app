<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import TestBackground1 from './TestBackground1.svelte';
    import TestBackground2 from './TestBackground2.svelte';
    import type { Action } from 'svelte/action';
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import {onMount} from "svelte";
    import Test from './Test.svelte';
    import { goto } from '$app/navigation';
    import {tick} from "svelte";
    import { stringFromBase64URL } from '@supabase/ssr';

    //変数宣言
    let { wordslist, wb_name, language, user_or_library } = $props();
    let main_input:HTMLInputElement | null = $state(null);
    let wordslength = $state(wordslist.length);
    let count = $state(0)
    let testStarted = $state(false);
    let length = $state(10);
    let message = $state("");
    let questions:Word[] = $state([]);
    let isQuizComplete = $state(false);
    let main_display = $state("");
    let currentWord:Word = $state({id:0, term:"", meaning:"", examples: {example:"", translation:""}})
    let questionIndex = $state(-1);
    let score =$state(0);
    let answer = $state("");
    let showResult = $state(false);
    let isCorrect = $state(true);


    let beforeInput:string = $state("");
    let afterInput:string= $state("");
    let isfetching:boolean = $state(false);

    interface Word {
        id:number;
        term: string;
        meaning: string;
        examples:{example:string, translation:string};

    };
    const startGame = () => {
        if(typeof length != "number" || length<1 || length > 50) {
            message = "問題数が不正です";
            return
        }
        testStarted = true;
        createQuestions(wordslist);
        showQuestion();
    }
    const getRandomWord = (words:Word[]):Word => {
        const randomIndex = Math.floor(Math.random()*wordslength);
        const result = words[randomIndex];
        return result
    }
    const createQuestions = (words:Array<Word>) => {
        for (let i=0;i<length;i++) {
            questions.push(getRandomWord(words));
        }
    }
    const fetchsentence = async ():Promise<{examples:{example:string, translation:string}[]}> => {
        isfetching=true;
        const res = await fetch(`/api/text?language=${language}&type=${"sentence"}&id=${currentWord.id}&regenerate=""`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text: currentWord.term})
        });
        const response = await res.json();
        return response
    }
    const showQuestion = async () => {
        questionIndex++;
        if (questionIndex<length) {
            currentWord = questions[questionIndex];
            beforeInput = currentWord.examples?.example.split(`${currentWord.term}`, 2)[0];
            afterInput = currentWord.examples?.example.split(`${currentWord.term}`, 2)[1];
            main_display = currentWord.examples?.translation;
            await tick();
            setTimeout(()=> main_input?.focus(), 50);            
        } else {
            isQuizComplete = true;
        }

    }
    const clearInfo = () => {
        count=0;
        showResult = false;
        answer = "";
        currentWord={id:0, meaning:"", term:"", examples:{example:"", translation:""}};
    }
    const checkAnswer = async () => {
        if (answer == currentWord.term) {
            isCorrect = true;
            if(!count) score++;
            count++
            showResult = true;
            setTimeout(()=>{nextQuestion()}, 1500);
        } else {
            count++;
            answer="";
            isCorrect = false;
            showResult = true;
            await tick();
            setTimeout(()=> main_input?.focus(),50);
            setTimeout(()=>showResult=false, 1500);
            
            
        }
    }
    
    const nextQuestion = () => {
        clearInfo();
        showQuestion();
    }

</script>


<div id="displays" class="w-full  bg-linear-to-br from-white to-slate-100 h-screen p-4 flex gap-4 overflow-auto absolute z-20 relative">
    {#if !testStarted}
    <div class="absolute inset-0 bg-slate-100 flex justify-center items-center z-21">
    <div class="flex flex-col  gap-3 justify-between bg-white w-9/10 md:w-3/5 lg:w-3/10  p-8 rounded-2xl shadow-lg">
        <div class="mb-3">
            <h1 class="text-4xl text-center font-bold text-gray-800 mb-1">単語入力テスト</h1>
        </div>
        <h1 class="text-center text-xl text-gray-700 mb-5">問題数を決めてね！</h1>
        <label class="input validator w-2/3 mx-auto rounded-2xl mx-auto text-lg text-gray-900 rounded-2xl bg-slate-100">
        <input type="number" min="1" max="50" bind:value={length} class="text-center ">
        問
        </label>
        <p class="text-right font-xs text-red-800">{message}</p>
        <p class="text-right font-xs text-gray-800 ">問題数は1~50問のあいだです
        </p>
        <button onclick={startGame} class="btn self-center btn-active btn-primary w-2/3 rounded-2xl mt-5">
            ▶テスト開始
        </button>
        <button onclick={()=> goto("./wordsdashboard")} class="btn mx-auto w-1/2 btn-sm btn-outline font-bold rounded-2xl btn-primary">
            戻る
        </button>
    </div>
    </div>
    {/if}
    {#if isQuizComplete}
    <div class="absolute inset-0 bg-slate-100 flex justify-center items-center z-21">
        <div class="flex flex-col  gap-3 justify-between bg-white w-9/10 md:w-3/5 lg:w-1/5  p-8 rounded-2xl shadow-lg">
            <div class="mb-3">
                <h1 class="text-3xl text-center font-bold text-gray-800 mb-1">テスト完了🎉</h1>
                <p class="text-gray-600 text-center">お疲れ様でした</p>
            </div>
            <div class="mb-5 p-6  rounded-xl">
            <div class="bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 mb-8">
                <h1 class="font-semibold text-gray-800 mb-3">結果</h1>
                <div class="text-5xl font-bold text-blue-600 mb-2">
                    {score}/{length}
                </div>
                <div class="text-xl text-gray-600">
                    正答率：{Math.round((score / length)*100)}%
                </div>
            </div>
            </div>
            <div class="w-full flex gap-1 justify-center p-5">
            <button onclick={()=> goto("./wordsdashboard")} class="btn btn-lg btn-active font-bold rounded-2xl btn-primary">
                勉強終了
            </button>
            <button onclick={()=>{clearInfo();questions = [];createQuestions(wordslist);questionIndex=-1;showQuestion();isQuizComplete=false;score=0;}} class="rounded-2xl font-bold btn btn-lg btn-active btn-primary">
            もう一回勉強する
            </button>
            </div>
        </div>
    </div>
    {/if}
    {#if !isQuizComplete}
    <div class="w-full md:w-4/5 lg:w-3/10 mx-auto h-1/2 lg:h-full flex flex-col bg-slate-50 rounded-2xl shadow-xl">
        <div class=" shadow-lg shadow-slate-100 bg-linear-to-br from-indigo-400 to-indigo-300 rounded-2xl text-gray-100 font-bold p-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <h1 class="text-sm max-w-4/5">{wb_name}</h1>
                </div>
                <div class="text-right">
                    <div class="text-sm opacity-90 whitespace-nowrap">進行度</div>
                    <div class="text-lg font-bold">
                        {`${questionIndex}/${length}`}
                    </div>
                </div>
                
            </div>
            <div class="w-full p-3">
                <form class="flex flex-wrap gap-3 items-center justify-center">
                    {#if isfetching}
                    <span class="loading loading-spinner"></span>
                    {:else if beforeinput || afterinput}
                    <span class="text-xl">{beforeinput}</span>
                    <span>
                        <input bind:this={main_input} class="focus:outline-none w-20 border-none p-2 rounded-xl bg-gray-100 text-gray-900" type="text" bind:value={answer} placeholder={!isCorrect? currentWord.term:""}>
                    </span>
                    <span class="text-xl">{afterinput}</span>
                    {/if}
                <button onclick={checkAnswer} class="hidden" type="submit"></button>
                </form>
            </div>
            
            <div class={{"transition-all duration-200 text-center shrink":true,"opacity-0":!showResult}}>
                <div class={{
                    " w-3/5 inline-flex items-center gap-2 px-6 py-1 lg:mb-2 rounded-full font-semibold mb-3":true,
                    "bg-green-100 text-green-800":isCorrect,
                    "bg-red-100 text-red-800":!isCorrect}}>
                    {isCorrect? "✔正解":"✗不正解"}    
                </div>
            </div>
            <div class="w-full">
                <progress class="progress progress-primary h-2 bg-slate-50" value={questionIndex*(100/length)} max="100"></progress>
            </div>
        </div>

        <div class="p-8 grow flex flex-col">
            <div class="text-center">
                <div class="bg-indigo-100 rounded-2xl mb-4">
                    <div style={parent_style}>
                        <div use:fit={{min_size:5, max_size:25}} class="px-5 py-5 max-h-25 lg:max-h-20 lg:py-3 text-wrap font-bold text-gray-800">
                            {main_display}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>
   
<style>
 @keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.blink {
  animation: blink 1s steps(2, start) infinite;
}
.screen::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 4px,
                rgba(0, 255, 0, 0.1) 4px,
                rgba(0, 255, 0, 0.1) 6px
            );
            pointer-events: none;
        }
.screen2::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 4px,
                rgba(0, 255, 0, 0.1) 4px,
                rgba(0, 255, 0, 0.1) 6px
            );
            pointer-events: none;
        }
</style>
