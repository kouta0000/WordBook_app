<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import TestBackground1 from './TestBackground1.svelte';
    import TestBackground2 from './TestBackground2.svelte';
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import type { Action } from 'svelte/action';
    import {onMount} from "svelte";
    import { goto } from '$app/navigation';
    //変数宣言
    let { wordslist, wb_name, user_or_library } = $props();
    let questions:Word[][] = $state([]);
    let questionIndex:number=$state(-1);
    let lengthdeciding =$state(true);
    let inputlength: number | null = $state(10)
    let message = $state("");
    
    let length:number = $state(20);
    let score:number = $state(0);
    let main_display: Word = $state({term:"", meaning:""});
    let subdisplays: Array<Word> = $state([]);
    let answerInfo: boolean[] = $state(Array(4).fill(false));
    let answer = $state("");
    let isQuizComplete = $state(false);
    let showResult:boolean = $state(false);
    let showsubdisplays = $state(false)
    interface Word {
        "term": string;
        "meaning": string;
    };
    //関数宣言
    //テスト開始画面
    
    //単語のランダム選択ロジック。
    const getRandomWord = (words:Word[]):Word => {
        const randomIndex = Math.floor(Math.random()*4);
        const result = words[randomIndex];
        return result
    }
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
    const createQuestions = (words:Array<Word>) => {
        for (let i=0;i<length;i++) {
            questions.push(getRandom4Words(words));
        }
    }
    const showQuestion = () => {
        questionIndex++;
        if (questionIndex<length) {
            const questionwords = questions[questionIndex];
            const main_word = getRandomWord(questionwords);
            main_display = main_word;
            for (let i=0;i<4;i++) {
                subdisplays[i] = questionwords[i];
            };
            
        } else {
            isQuizComplete = true;
        }

    }
    const startGame = () => {
        if(typeof inputlength != "number" || inputlength<1 || inputlength > 50) {
            message = "問題数が不正です";
            return
        }
        length = inputlength?? 20;
        lengthdeciding = false;
        createQuestions(wordslist);
        showQuestion();
    }
    const nextQuestion = () => {
        clearInfo();
        showQuestion();
    }
    const postAnswer = (a:string):Promise<void> => {
        answerInfo.forEach((item,i) => {
            if (subdisplays[i].meaning==main_display.meaning) {
                answerInfo[i]=true;
            }
        })
        if (a==main_display.meaning) score++;
        answer=a;
        showResult = true;
        
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve();
            }, 2000);
            
        });
    }
    const clearInfo = () => {
        showResult = false;
        answerInfo = Array(4).fill(false);
        answer = "";
    }
</script>
<div id="displays" class="w-full bg-linear-to-br from-white to-slate-100 h-screen p-4 flex gap-4 overflow-auto absolute z-20 relative">
    {#if lengthdeciding}
    <div class="absolute inset-0 bg-slate-100 flex justify-center items-center z-21">
    <div class="flex flex-col  gap-3 justify-between bg-white w-9/10 md:w-3/5 lg:w-3/10  p-8 rounded-2xl shadow-lg">
        <div class="mb-3">
            <h1 class="text-4xl text-center font-bold text-gray-800 mb-1">4択テスト</h1>
        </div>
        <h1 class="text-center text-xl text-gray-700  mb-5">問題数を決めてね！</h1>
        <label class="input validator w-2/3 mx-auto mx-auto text-lg text-gray-900 rounded-2xl bg-slate-100">
        <input type="number" min="1" max="50" bind:value={inputlength} class="text-center">
        問
        </label>
        <p class="text-right font-xs text-red-800">{message}</p>
        <p class="text-right font-xs text-gray-800">問題数は1~50問のあいだです
        </p>
        <button onclick={startGame} class="btn btn-active btn-primary rounded-2xl mt-5">
            ▶テスト開始
        </button>
        <button onclick={()=> goto("./wordsdashboard")} class="btn mx-auto w-1/2 btn-sm btn-outline font-bold rounded-2xl btn-primary">
            戻る
        </button>
    </div>
    </div>
    {/if}
    <div class="w-full md:w-4/5 lg:w-3/10 mx-auto flex flex-col bg-slate-50 rounded-2xl shadow-xl">
        <div class="bg-linear-to-br from-indigo-600 to-indigo-300 rounded-2xl text-white p-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <h1 class="text-2xl font-bold">{wb_name}</h1>
                </div>
                <div class="text-right">
                    <div class="text-sm opacity-90">進行度</div>
                    <div class="text-lg font-bold">
                        {`${questionIndex}/${length}`}
                    </div>
                </div>
            </div>
            <div class="w-full">
                <progress class="progress progress-primary h-2 bg-slate-50" value={questionIndex*(100/length)} max="100"></progress>
            </div>
        </div>
        <div class="p-8 grow flex flex-col">
            {#if !isQuizComplete}
            <div class="text-center">
                <div class="bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
                    <div style={parent_style}>
                    <div use:fit={{min_size:10, max_size:35}} class="px-5 py-8 max-h-40 lg:max-h-20 lg:py-3 text-wrap font-bold text-gray-800">
                        {main_display.term}
                    </div>
                    </div>
                </div>
                    <div class={{"text-center shrink mt-8":true,"opacity-0":!showResult}}>
                        <div class={{
                            "w-3/5 inline-flex items-center gap-2 px-6 lg:py-1 lg:mb-2 py-3 rounded-full font-semibold mb-6":true,
                            "bg-green-100 text-green-800":answer==main_display.meaning,
                            "bg-red-100 text-red-800":!(answer==main_display.meaning)}}>
                        {answer==main_display.meaning? "✔正解":"✗不正解"}    
                        </div>
                    </div>
            </div>
            <div class="flex flex-col items-center grow gap-4 mb-8">
                {#each subdisplays as subdisplay, i (i)}
                <button disabled={showResult} onclick={() => {postAnswer(subdisplay.meaning).then(() => {nextQuestion()});}} class={{
                    "w-full px-3 py-4 text-left rounded-xl border-2 transition-all duration-300 font-medium":true,
                    "border-slate-200 hover:border-blue-300 hober:bg-blue-50 bg-slate-100 hover:shadow-md cursor-pointer":!showResult,
                    "border-green-500 bg-green-100 text-green-800":showResult && answerInfo[i],
                    "border-red-500 bg-red-100 text-red-800": showResult && !answerInfo[i] && answer==subdisplay.meaning,
                    "border-slate-200 bg-slate-100":showResult && !answerInfo[i] && !(answer==subdisplay.meaning)}}>
                <span class="rounded-full bg-radial from-white to-slate-100 p-3 mr-4">{i}</span>
                {subdisplay.meaning}
                </button>
                {/each}
            </div>
            
            {:else}
            <div class="text-center">
                <div class="text-6xl mb-6">🎉</div>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">お疲れ様でした</h2>
                <div class="bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 mb-8">
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {score}/{length}
                    </div>
                    <div class="text-xl text-gray-600">
                        正答率：{Math.round((score / length)*100)}%
                    </div>
                </div>
                <div class="w-full flex gap-1 justify-center p-5">
                <button onclick={()=> goto("./wordsdashboard")} class="btn btn-lg btn-active font-bold rounded-2xl btn-primary">
                    勉強終了
                </button>
                <button onclick={()=>{clearInfo();createQuestions(wordslist);questionIndex=-1;showQuestion();isQuizComplete=false;score=0;}} class="rounded-2xl font-bold btn btn-lg btn-active btn-primary">
                もう一回勉強する
                </button>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>
   
