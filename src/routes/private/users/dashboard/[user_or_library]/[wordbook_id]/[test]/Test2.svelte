<script lang="ts">
    import Fuse from 'fuse.js';
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
    let { wordslist, wb_name, language, user_or_library, user_info } = $props();
    let main_input:HTMLInputElement | null = $state(null);
    let wordslength = $state(wordslist.length);
    let count = $state(0)
    let testStarted = $state(false);
    let length = $state(10);
    let message = $state("");
    let questions:Word[] = $state([]);
    let isQuizComplete = $state(false);
    let main_display = $state("");
    let currentWord:Word = $state({id:0, term:"", meaning:"", sentence:""})
    let questionIndex = $state(-1);
    let score =$state(0);
    let inputedAnswer = $state("");
    let answerWord = $state("");
    let showResult = $state(false);
    let isCorrect = $state(true);

    let audio: HTMLAudioElement | undefined = $state();
    let beforeInput:string[] = $state([]);
    let afterInput:string[]= $state([]);
    let isfetching:boolean = $state(false);

    interface Word {
        id:number;
        term: string;
        meaning: string;
        sentence:string;

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
    const fetchsentence = async (delay=500, retries=5):Promise<{examples:{example:string, translation:string}[]}> => {
        isfetching=true;
        try {
        const res = await fetch(`/api/text?language=${language}&type=${"sentence"}&id=${currentWord.id}&regenerate=""`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text: currentWord.term})
        });
        isfetching=false;
        const response = await res.json();
        return response
    } catch (error) {
        if (retries<=0) {
            throw new Error('通信環境が不安定です。時間を置いて再度ロードしてください。' + error.message);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchsentence(delay,retries-1);
    };
    }
    const getCleanWords = (sentence: string): string[] => {
 
 const words = sentence.match(/[\p{L}\p{N}']+/gu);
 return words ? words : []; // Return an empty array if no matches
};
    const showQuestion = async () => {
        questionIndex++;
        if (questionIndex<length) {
            currentWord = questions[questionIndex];
            if (currentWord.sentence) {
            const examples:{examples:{example:string, translation:string}[]} = JSON.parse(currentWord.sentence)
            const list = examples.examples?.[0].example;
            const baf = getCleanWords(list);
            const options = {// 検索対象のキーを指定
                keys:[""],
                threshold: 1.0,           // 類似度の閾値を設定
                shouldSort: true,
                includeScore:true          // スコア順に結果を並べ替える
            };
            const fuse = new Fuse(baf, options);
            const result = fuse.search(currentWord.term);
            const answerword=result[0].item;
            const parts = examples.examples?.[0].example.split(answerword,2);
            answerWord = answerword;
            beforeInput = parts[0].split(" ");
            afterInput = parts[1].split(" ");
            main_display = currentWord.meaning
            } else {
                const res = await fetchsentence();
                const list = res.examples?.[0].example;
                const baf = getCleanWords(list);
                const options = {// 検索対象のキーを指定
                keys:[""],
                threshold: 1.0,           // 類似度の閾値を設定
                shouldSort: true,
                includeScore:true          // スコア順に結果を並べ替える
            };
                const fuse = new Fuse(baf, options);
               
                const result = fuse.search(currentWord.term);
                const answerword=result[0].item;
                const parts = res.examples?.[0].example.split(answerword,2);
                answerWord = answerword;
                beforeInput=getCleanWords(parts[0]);
                afterInput=getCleanWords(parts[1]);
                main_display=currentWord.meaning;
            }
            playAudio(answerWord);
            await tick();
            setTimeout(()=> main_input?.focus(), 50);            
        } else {
            isQuizComplete = true;
        }

    }
    const clearInfo = () => {
        count=0;
        showResult = false;
        answerWord = "";
        inputedAnswer=""
        audio = undefined;
        beforeInput=[];
        afterInput=[];
        main_display="";
        currentWord={id:0, meaning:"", term:"", sentence:""};
    }
    const checkAnswer = async () => {
        if (inputedAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == answerWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ) {
            isCorrect = true;
            if(!count) score++;
            count++
            showResult = true;
            audio = undefined;
            await playAudio(beforeInput.join(" ")+" " + answerWord+ " " + afterInput.join(" "));
            setTimeout(()=>{nextQuestion()}, 1500);
        } else {
            count++;
            inputedAnswer="";
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
    const playAudio = async (word:string) => {
        if (!audio) {
        const res = await fetch(`/api/speak?language=${language}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text:word})
        });
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);
    }
        await audio.play();
        await new Promise<void>((resolve) => {
            if(audio) audio.onended = () => resolve();
        });
    }
</script>


<div id="displays" class="w-full  bg-linear-to-br from-slate-100 to-slate-200 h-screen p-4 flex gap-4 overflow-auto absolute z-20 relative">
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
                終了
            </button>
            <button onclick={()=>{clearInfo();questions = [];createQuestions(wordslist);questionIndex=-1;showQuestion();isQuizComplete=false;score=0;}} class="rounded-2xl font-bold btn btn-lg btn-active btn-primary">
            もう一回
            </button>
            </div>
        </div>
    </div>
    {/if}
    {#if !isQuizComplete}
    <div class="w-full md:w-4/5 lg:w-3/10 mx-auto  lg:h-full flex flex-col bg-slate-100 rounded-2xl shadow-xl">
        <div class="border-5 border-double border-indigo-300/50 shadow-lg shadow-slate-100 bg-white rounded-2xl text-gray-600 font-bold px-2 flex flex-col items-center">
            <div class="w-4/5">
                <progress class="progress progress-primary h-3 bg-slate-200 my-3" value={questionIndex*(100/length)} max="100"></progress>
            </div>
            <div class="w-full flex items-center justify-between py-1 px-5">
                <div class="flex items-center gap-1">
                    <h1 class="text-xs max-w-4/5 whitespace-nowrap">{wb_name}</h1>
                </div>
                <div class="text-right">
                    <div class="text-sm font-bold">
                        {`${questionIndex}/${length}`}
                    </div>
                </div>
                
            </div>
            <hr class="h-1 bg-gray-200 mt-1 mb-1 mx-auto">
            <div class="w-full mt-1 px-4">
                <form class="flex flex-wrap gap-1 items-center justify-center text-indigo-800/80 ">
                    {#if isfetching}
                    <span class="loading loading-spinner"></span>
                    {:else}
                    {#each beforeInput as b}
                    <span class="py-2 text-xl">{b}</span>
                    {/each}
                    <span>
                    <span style={parent_style}>
                        <input use:fit={{min_size:10, max_size:20}} bind:this={main_input} class="text-center focus:outline-none border-none p-1 py-2 w-40 text-2xl rounded-lg bg-gray-100 text-gray-900" type="text" bind:value={inputedAnswer} placeholder={!isCorrect? answerWord:""}>
                    </span>
                    </span>
                    {#each afterInput as a}
                    <span class="text-xl py-2">{a}</span>
                    {/each}
                    {/if}
                <button onclick={checkAnswer} class="hidden" type="submit"></button>
                </form>
            </div>
            
            <div class={{"transition-all duration-200 w-full flex justify-end":true,"opacity-0":!showResult}}>
                <div class={{
                    "text-center w-1/2 gap-2 px-6 py-1 lg:mb-2 rounded-full font-bold mb-1":true,
                    "bg-green-100 text-green-800":isCorrect,
                    "bg-red-100 text-red-800":!isCorrect}}>
                    {isCorrect? "✔正解":"✗不正解"}    
                </div>
            </div>
            
        </div>
        
        <div class="p-8 grow flex flex-col">
            <div class="text-center">
                <div class="bg-indigo-100 rounded-2xl mb-4 relative">
                    <div style={parent_style}>
                        <div use:fit={{min_size:5, max_size:20}} class="p-8 lg:p-5 text-wrap font-[650] text-gray-800/95">
                            {main_display}
                        </div>
                    </div>
                    <div onclick={()=>playAudio(currentWord.term)} class="mask mask-circle bg-white mb-1 p-2 absolute right-0 bottom-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                            <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                          </svg>                          
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>
   

