<script lang="ts">
    import { fly, fade, scale } from 'svelte/transition';
    import TestBackground1 from './TestBackground1.svelte';
    import TestBackground2 from './TestBackground2.svelte';
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import type { Action } from 'svelte/action';
    import {onMount} from "svelte";
    import { goto } from '$app/navigation';
    //変数宣言
    let { wordslist, wb_name, language, user_or_library, user_info } = $props();
    let questions:Word[] = $state([]);
    let questionIndex:number=$state(-1);
    let lengthdeciding =$state(true);
    let isCorrect:boolean=$state(false);
    let shuffledwords:WordWithAnswer[]=$state([]);
    let inputlength: number | null = $state(10);
    let message = $state("");
    let currentword:Word = $state({term:"",meaning:""});
    let selectedwords:WordWithAnswer[] =$state([])
    let length:number = $state(20);
    let score:number = $state(0);
    let isCheckeds:boolean[] = $state(Array(4).fill(false));
    
    let inputedanswer = $state("");
    let isQuizComplete = $state(false);
    let showResult:boolean = $state(false);
    let audios:(HTMLAudioElement | undefined)[] = $state([]);
    interface Word {
        "term": string;
        "meaning": string;
    };
    interface WordWithAnswer {
        "term": string;
        "meaning": string;
        "isAnswer":boolean
    };
    //関数宣言
    //テスト開始画面
    
    //単語のランダム選択ロジック。
    const getRandomWord = (words:Word[]):Word => {
        const randomIndex = Math.floor(Math.random()*words.length);
        const result = words[randomIndex];
        return result
    }
    const getRandom3Words = (words: Array<Word>, wordtoexclude:Word) => {
        const al: number = words.length;
        const indices: Set<number> = new Set();
        const result: Array<Word> = [];
        if (al < 3) {
            return words;
        };
        while (indices.size < 3) {
            const n = Math.floor(Math.random()*al);
            indices.add(n);
        }
        for (const i of indices) {
            if(words[i] != wordtoexclude) result.push(words[i]);
        }
        return result;
    };
    const createQuestions = (words:Array<Word>) => {
        for (let i=0;i<length;i++) {
            questions.push(getRandomWord(words));
        }
    }
    const showQuestion = () => {
        questionIndex++;
        if (questionIndex<length) {
            currentword = questions[questionIndex];
            selectedwords.push({...currentword, isAnswer:true});
            const threewords = getRandom3Words(wordslist,currentword);
            threewords.forEach(v=>{selectedwords.push({...v,isAnswer:false})});
            shuffledwords = shuffle(selectedwords);
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
    const checkAnswer = () => {
        
        if (inputedanswer==currentword.term) {
            score++;
            isCorrect=true;
            
        };
        showResult = true;
        setTimeout(nextQuestion,2000);
    }
    const clearInfo = () => {
        showResult = false;
        audios = [];
        isCheckeds=Array(4).fill(false);
        selectedwords=[];
        currentword={term:"", meaning:""};
        isCorrect=false;
        shuffledwords=[];
        inputedanswer = "";
    }
    const shuffle = (input: WordWithAnswer[]) => {
        const length: number = input.length-1;
        let words:WordWithAnswer[] = [...input];
        for (let i = length; i > 0; i--) {
            const random: number = Math.floor(Math.random()*(i+1));
            [words[i], words[random]] = [words[random], words[i]];
        }
        return words
    }
    const playAudio = async (word:string,i:number) => {
        if (!audios[i]) {
        const res = await fetch(`/api/speak?language=${language}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text:word})
        });
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audios[i] = new Audio(audioUrl);
    }
        await audios[i].play();
        await new Promise<void>((resolve) => {
            if(audios[i]) audios[i].onended = () => resolve();
        });
    }
</script>
<div id="displays" class="w-full bg-linear-to-br from-slate-100 to-slate-200 h-screen p-4 flex gap-4 overflow-auto absolute z-20 relative">
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
        <button onclick={startGame} class="w-2/3 self-center btn btn-active btn-primary rounded-2xl mt-5">
            ▶テスト開始
        </button>
        <button onclick={()=> goto("./wordsdashboard")} class="btn mx-auto w-1/2 btn-sm btn-outline font-bold rounded-2xl btn-primary">
            戻る
        </button>
    </div>
    </div>
    {/if}
    <div class="w-full md:w-4/5 lg:w-3/10 mx-auto flex flex-col bg-slate-50 rounded-2xl shadow-xl">
        <div class="border-5 border-double border-indigo-300 bg-gray-100 rounded-2xl text-gray-700 p-8">
            <div class="flex items-center justify-between">
                <div class="text-right">
                    <div class="text-lg font-bold">
                        {`${questionIndex}/${length}`}
                    </div>
                </div>
            </div>
            <div class="w-full p-2 text-indigo-800">
                <p class="text-lg text-center">{currentword.meaning}</p>
            </div>
            <div class="w-full">
                <progress class="bg-slate-200 progress progress-primary h-2 bg-slate-50" value={questionIndex*(100/length)} max="100"></progress>
            </div>
        </div>
        <div class="px-12 flex flex-col">
            {#if !isQuizComplete}
            <div class="text-center flex flex-col">
                
                    <div class={{"text-center self-end w-1/2 m-2":true,"opacity-0":!showResult}}>
                        <div class={{
                            "w-full px-6 lg:py-1 lg:mb-2 py-3 rounded-full font-semibold mb-6":true,
                            "bg-green-100 text-green-800":isCorrect,
                            "bg-red-100 text-red-800":!(isCorrect)}}>
                        {isCorrect? "✔正解":"✗不正解"}    
                        </div>
                    </div>
            </div>
            <div class="grid grid-cols-2 items-center w-full gap-4 mb-8 lg:mb-2">
                {#each shuffledwords as w, i (i)}
               
                <button disabled={showResult} onclick={() => {playAudio(w.term,i);inputedanswer=w.term;isCheckeds[i]=true;isCheckeds.forEach((v,j)=>{{if(j!=i)isCheckeds[j]=false}})}} class={{
                    "flex justify-center items-center text-center w-full aspect-square  p-5 lg:p-1 mask mask-circle transition-all duration-300 font-medium":true,
                    "text-teal-500":i==0,
                    "text-pink-500":i==1 ,
                    "text-amber-500":i==2 ,
                    "text-indigo-500":i==3,
                    "translate-z-5 -rotate-20 scale-1.1 -translate-y-1 bg-indigo-200": isCheckeds[i] && !showResult,
                    "border-slate-200  bg-linear-to-r from-blue-50 to-gray-100 hover:shadow-md cursor-pointer":!showResult && !isCheckeds[i],
                    "border-green-500 bg-green-200 text-green-800 -rotate-20":showResult && w.isAnswer,
                    "border-red-500 bg-red-200 text-red-800": showResult && !w.isAnswer && (inputedanswer==w.meaning),
                    "border-slate-200 bg-linear-to-r from-blue-50 to-gray-100":showResult && !w.isAnswer && !(inputedanswer==w.meaning)}}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                  </svg>   
                </button>
                {/each}
            </div>
            <div class="w-full flex justify-center items-center">
            <button onclick={checkAnswer} class="btn btn-primary btn-active  rounded-3xl p-2 w-full">決定</button>
            </div>
            {:else}
            <div class="text-center">
                <div class="text-6xl mb-6">🎉</div>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">お疲れ様です！</h2>
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
   
