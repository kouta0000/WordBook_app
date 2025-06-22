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
    let currentWord:Word = $state({id:0, term:"", meaning:"", sentence:""})
    let questionIndex = $state(-1);
    let score =$state(0);
    let inputedAnswer = $state("");
    let answerWord = $state("");
    let showResult = $state(false);
    let isCorrect = $state(true);
    let buttons:string[] = $state([]);
    let inputedphrase:string[] = $state([]);
    let answerphrase:string[] = $state([]);


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
    const fetchsentence = async ():Promise<{examples:{example:string, translation:string}[]}> => {
        isfetching=true;
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
    }
    const shuffle = (input: Array<string>) => {
        const length: number = input.length-1;
        let words:string[] = [...input];
        for (let i = length; i > 0; i--) {
            const random: number = Math.floor(Math.random()*(i+1));
            [words[i], words[random]] = [words[random], words[i]];
        }
        return words
    }
    const showQuestion = async () => {
        questionIndex++;
        if (questionIndex<length) {
            currentWord = questions[questionIndex];
            if (currentWord.sentence) {
            const examples:{examples:{example:string, translation:string}[]} = JSON.parse(currentWord.sentence)
            const list = examples.examples?.[0].example.split(" ");
            answerphrase = [...list.slice(0, -1), list[list.length-1].slice(0,-1)];
            buttons = shuffle(answerphrase);
            main_display=examples.examples?.[0].translation;
            } else {
                const res = await fetchsentence();
                const list = res.examples?.[0].example.split(" ");
                answerphrase = [...list.slice(0, -1), list[list.length-1].slice(0,-1)];
                buttons = shuffle(answerphrase);
                main_display=res.examples?.[0].translation;
            }         
        } else {
            isQuizComplete = true;
        }

    }
    const clearInfo = () => {
        count=0;
        showResult = false;
        inputedphrase=[];
        answerphrase=[];
        main_display="";
        currentWord={id:0, meaning:"", term:"", sentence:""};
    }
    const checkAnswer = async (input:string,i:number) => {
        if (answerphrase[inputedphrase.length]==input) {
            inputedphrase.push(input);
            if (inputedphrase.length==answerphrase.length) {
                isCorrect = true;
                if(!count) score++;
                count++
                showResult = true;
                setTimeout(()=>{nextQuestion()}, 1500);
            };
        } else {
            count++;
            isCorrect = false;
            showResult = true;
            setTimeout(()=>showResult=false, 500);
        }
    }
    
    const nextQuestion = () => {
        clearInfo();
        showQuestion();
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


    <!--実際のテスト画面-->
    {#if !isQuizComplete}
    <div class="w-full md:w-4/5 lg:w-2/5 mx-auto  lg:h-full flex flex-col bg-white rounded-2xl shadow-xl relative">
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
           
            <div class="p-1 grow flex flex-col">
                <div class="text-center">
                    <div class="bg-indigo-50 rounded-2xl mb-1 p-2">
                        <div style={parent_style}>
                            <div use:fit={{min_size:5, max_size:18}} class="p-8 lg:p-5 text-wrap font-[650] text-lg text-gray-800/95">
                                {main_display}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class={{"transition-all duration-200 w-full flex justify-end":true,"opacity-0":!showResult}}>
                <div class={{
                    "text-center gap-2 px-6 py-1 lg:mb-2 rounded-full font-bold mb-1":true,
                    "bg-green-100 text-green-800":isCorrect,
                    "bg-red-100 text-red-800":!isCorrect}}>
                    {isCorrect? "✔正解":"✗"}    
                </div>
            </div>
            
        </div>
        <div class="w-full mt-1 p-4 flex flex-col justify-evenly gap-5 h-full">
            <div class="flex flex-wrap bg-gray-100 rounded-xl p-5 justify-evenly">
                {#each answerphrase as a, i}
                <span class={{"text-indigo-800 font-bold border-b-2 border-dashed border-gray-400 m-2":true}}>
                    <p class={{"opacity-0":!inputedphrase[i]}}>{a}</p>
                </span>
                {/each}
            </div>
            <div class="w-full bg-gray-100 rounded-xl flex flex-wrap gap-1 p-5">
                {#each buttons as b,i}
                <button onclick={()=>checkAnswer(b,i)} class={{"text-indigo-800 bg-linear-to-br from-indigo-100 to-gray-100 p-2 my-1 px-6 text-lg font-bold rounded-3xl transition-all duration-200":true,"opacity-0 btn-disabled btn-sm":inputedphrase.includes(b,0)}}>
                    {b}
                </button>
                {/each}
            </div>
        </div>
        
    </div>
    {/if}
</div>
   
