<script lang="ts">
    import Fuse from 'fuse.js';
    import { fly, fade, scale } from 'svelte/transition';
    import type { Action } from 'svelte/action';
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import {onMount} from "svelte";
    import { goto } from '$app/navigation';
    import {tick} from "svelte";
    import { stringFromBase64URL } from '@supabase/ssr';
    import AudioButton from './AudioButton.svelte';

    //変数宣言
    let { wordslist,language , quest_id} = $props();
    let subdisplays: Array<Word> = $state([]);
    let main_input:HTMLInputElement | null = $state(null);
    let wordslength = $state(wordslist.length);
    let random = $state(0);
    let count = $state(0)
    let testStarted = $state(false);
    let length = $state(15);
    let message = $state("");
    let answer:string = $state("");
    let questions:Word[] = $state([]);
    let qcm_questions:Word[][] = $state([]);
    let isQuizComplete = $state(false);
    let main_display = $state("");
    let currentWord:Word = $state({id:0, term:"", meaning:"", sentence:""})
    let questionIndex = $state(-1);
    let score =$state(0);
    let inputedAnswer = $state("");
    let answerWord = $state("");
    let showResult = $state(false);
    let isCorrect = $state(true);
    let buttons:{id:string, value:string}[] = $state([]);
    let inputedphrase:{id:string,value:string}[] = $state([]);
    let answerphrase:string[] = $state([]);
    let isChecked:boolean = $state(false);
    let audio:HTMLAudioElement | undefined = $state();
    let currentView:number = $state(0);
    let answerInfo: boolean[] = $state(Array(4).fill(false));


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
        createQuestions(wordslist);
        showQuestion();
    }
    const getRandomWord = (words:Word[]):Word => {
        const randomIndex = Math.floor(Math.random()*words.length);
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
            questions.push(getRandomWord(words));
            qcm_questions.push(getRandom4Words(words));
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
    const shuffle = (input: Array<string>) => {
        const length: number = input.length-1;
        let words:string[] = [...input];
        for (let i = length; i > 0; i--) {
            const random: number = Math.floor(Math.random()*(i+1));
            [words[i], words[random]] = [words[random], words[i]];
        }
        return words
    }
    const playAudio = async (phrase:string) => {
        if (!audio) {
        const res = await fetch(`/api/speak?language=${language}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text: phrase})
        });
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);
    }
        await audio.play();
        await new Promise<void>((resolve) => {
            if(audio) audio.onended = () => resolve();
        });
        isChecked = false;
    }
    const getCleanWords = (sentence: string): string[] => {
    const words = sentence.match(/[\p{L}\p{N}']+/gu);
    return words ? words : []; // Return an empty array if no matches
};
    const showQuestion = async () => {
        questionIndex++;
        currentView = Math.floor(Math.random()*3+1)
        if (questionIndex<length) {
            currentWord = questions[questionIndex];
            if (currentView != 1)
                if (currentWord.sentence) {
                    const examples:{examples:{example:string, translation:string}[]} = JSON.parse(currentWord.sentence)
                    const list = examples.examples?.[0].example
                    answerphrase = getCleanWords(list);
                    const options = {
                        keys:[""],
                        threshold: 1.0,           // 類似度の閾値を設定
                        shouldSort: true,
                        includeScore:true          // スコア順に結果を並べ替える
                    };
                    const fuse = new Fuse(answerphrase, options);
                    const result = fuse.search(currentWord.term);
                    const answerword=result[0].item;
                    const parts = examples.examples?.[0].example.split(answerword,2);
                    answerWord = answerword;
                    beforeInput = parts[0].split(" ");
                    afterInput = parts[1].split(" ");
                    main_display = currentWord.meaning
                    const shuffledWords = shuffle(answerphrase);
                    buttons = shuffledWords.map((word, index) => ({
                    id: `${word}-${index}-${Math.random().toString(36).substring(2, 9)}`, // より確実にユニークなキー
                    value: word
                }));
                playAudio(answerphrase.join(" "));
            
                } else {
                    const res = await fetchsentence();
                    const list = res.examples?.[0].example;
                    answerphrase = getCleanWords(list);
                    const options = {
                        keys:[""],
                        threshold: 1.0,           // 類似度の閾値を設定
                        shouldSort: true,
                        includeScore:true          // スコア順に結果を並べ替える
                    };
                    const fuse = new Fuse(answerphrase, options);
                    const result = fuse.search(currentWord.term);
                    const answerword=result[0].item;
                    const parts = list.split(answerword,2);
                    answerWord = answerword;
                    beforeInput = parts[0].split(" ");
                    afterInput = parts[1].split(" ");
                    const shuffledWords = shuffle(answerphrase);
                    buttons = shuffledWords.map((word, index) => ({
                    id: `${word}-${index}-${Math.random().toString(36).substring(2, 9)}`, // より確実にユニークなキー
                    value: word
                }));
                main_display=res.examples?.[0].translation;
                playAudio(answerphrase.join(" "));
                await tick();
                setTimeout(()=> main_input?.focus(), 50);
            } else {
                const questionwords = qcm_questions[questionIndex];
                const main_word = getRandomWord(questionwords);
                random = Math.floor(Math.random()*2);
                main_display = random? main_word.term: main_word.meaning;
                for (let i=0;i<4;i++) {
                subdisplays[i] = questionwords[i];
            };
            playAudio(main_word.term);
            }
        } else {
            isQuizComplete = true;
            setTimeout(() => goto(`../${quest_id}`), 3000);
        }

    }
    const clearInfo = () => {
        count=0;
        showResult = false;
        inputedphrase=[];
        answerphrase=[];
        buttons=[];
        main_display="";
        currentWord={id:0, meaning:"", term:"", sentence:""};
        audio=undefined;
        answerInfo = Array(4).fill(false);
        answer = "";
        answerWord = "";
        inputedAnswer=""
        beforeInput=[];
        afterInput=[];
    }
    const checkAnswer3 = async (input:{id:string,value:string},i:number) => {
        if (answerphrase[inputedphrase.length]==input.value) {
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
    const checkAnswer1 = (a:string):Promise<void> => {
        answerInfo.forEach((item,i) => {
            if (!random? (subdisplays[i].meaning==main_display): subdisplays[i].term==main_display) {
                answerInfo[i]=true;
            }
        })
        if (a==main_display) score++;
        answer=a;
        showResult = true;
        
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve();
            }, 2000);
            
        });
    }
    const checkAnswer2 = async () => {
        if (inputedAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == answerWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ) {
            isCorrect = true;
            if(!count) score++;
            count++
            showResult = true;
            audio = undefined;
            await playAudio(beforeInput.join(" ")+answerWord+afterInput.join(" "));
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
</script>


<div id="displays" class="w-full  bg-linear-to-br from-slate-100 to-slate-200 h-screen p-4 flex gap-4 overflow-auto absolute z-20 relative">
    
   

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
        </div>
    </div>
    {/if}


    <!--実際のテスト画面-->
    {#if !isQuizComplete}
    {#if currentView == 0}
    <div class="absolute inset-0 bg-slate-100 flex justify-center items-center z-21">
        <div class="flex flex-col  gap-3 justify-between bg-white w-9/10 md:w-3/5 lg:w-3/10  p-8 rounded-2xl shadow-lg">
            <div class="mb-3">
                <h1 class="text-4xl text-center font-bold text-gray-800 mb-1">クエスト</h1>
            </div>
            <button onclick={startGame} class="btn self-center btn-active btn-primary w-2/3 rounded-2xl mt-5">
                ▶開始
            </button>
            <button onclick={()=> goto("../")} class="btn mx-auto w-1/2 btn-sm btn-outline font-bold rounded-2xl btn-primary">
                戻る
            </button>
        </div>
        </div>
    {:else if currentView == 1}
    <div class="w-full md:w-4/5 lg:w-3/10 mx-auto  lg:h-full flex flex-col bg-slate-100 rounded-2xl shadow-xl">
    <div class="text-center flex flex-col w-full p-10 bg-white rounded-xl gap-5">
        <div class="bg-linear-to-r from-indigo-100 to-gray-200 rounded-2xl p-1 relative">
            <div style={parent_style}>
            <div use:fit={{min_size:10, max_size:35}} class="px-5 py-8 max-h-40 lg:max-h-30 lg:py-5 text-wrap font-bold text-indigo-700">
                {main_display}
            </div>
            </div>
            <div onclick={()=>playAudio(main_display)} class="mask mask-circle bg-white mb-1 p-2 absolute right-0 bottom-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                  </svg>                          
            </div>
        </div>
            <div class={{"text-center self-end w-1/2 m-2":true,"opacity-0":!showResult}}>
                <div class={{
                    "w-full px-6 lg:py-1 lg:mb-2 py-3 rounded-full font-semibold mb-6":true,
                    "bg-green-100 text-green-800":answer==main_display,
                    "bg-red-100 text-red-800":!(answer==main_display)}}>
                {answer==main_display? "✔正解":"✗不正解"}    
                </div>
            </div>
    </div>
    <div class="grid grid-cols-2 lg:flex flex-col items-center p-10 bg-white rounded-xl w-full gap-4 mb-8">
        {#each subdisplays as subdisplay, i (i)}
        <div style={parent_style}>
        <button use:fit={{min_size:5, max_size:20}} disabled={showResult} onclick={() => {checkAnswer1(!random? subdisplay.meaning: subdisplay.term).then(() => {nextQuestion()});}} class={{
            "text-center w-full aspect-square lg:aspect-7/1 px-3 py-1 rounded-xl border-2 transition-all duration-300 font-medium":true,
            "border-slate-200 hover:border-blue-300 hober:bg-blue-50 bg-linear-to-r from-blue-50 to-gray-100 hover:shadow-md cursor-pointer":!showResult,
            "border-green-500 bg-green-100 text-green-800":showResult && answerInfo[i],
            "border-red-500 bg-red-100 text-red-800": showResult && !answerInfo[i] && (!random? (answer==subdisplay.meaning):(answer==subdisplay.term)),
            "border-slate-200 bg-linear-to-r from-blue-50 to-gray-100":showResult && !answerInfo[i] && (!random? !(answer== subdisplay.meaning): !(answer == subdisplay.term))}}>
        {random? subdisplay.meaning: subdisplay.term}
        </button>
        </div>
        {/each}
    </div>
    </div>
    {:else if currentView == 2}
    <div class="w-full h-full md:w-4/5 lg:w-3/10 mx-auto  lg:h-full flex flex-col bg-white rounded-2xl shadow-xl p-8">
        <div class="border-5 border-double border-indigo-300/50 shadow-lg shadow-slate-100 bg-white rounded-2xl text-gray-600 font-bold px-2 flex flex-col items-center">
            <div class="w-4/5">
                <progress class="progress progress-primary h-3 bg-slate-200 my-3" value={questionIndex*(100/length)} max="100"></progress>
            </div>
            <div class="w-full flex items-center justify-between py-1 px-5">
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
                <button onclick={checkAnswer2} class="hidden" type="submit"></button>
                </form>
            </div>
            
            <div class={{"mt-1 transition-all duration-200 w-full flex justify-end ":true,"opacity-0":!showResult}}>
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
    {:else if currentView ==3}
    <div class="w-full md:w-4/5 lg:w-3/10 mx-auto  lg:h-full flex flex-col bg-white rounded-2xl shadow-xl relative">
        <div class="border-5 border-double border-indigo-300/50 shadow-lg shadow-slate-100 bg-white rounded-2xl text-gray-600 font-bold px-2 flex flex-col items-center">
            <div class="w-4/5">
                <progress class="progress progress-primary h-3 bg-slate-200 my-3" value={questionIndex*(100/length)} max="100"></progress>
            </div>
            <div class="w-full flex items-center justify-between py-1 px-5">
                <div class="text-right">
                    <div class="text-sm font-bold">
                        {`${questionIndex}/${length}`}
                    </div>
                </div>
                
            </div>
            <hr class="h-1 bg-gray-200 mt-1 mb-1 mx-auto">
            <div class="mask mask-squircle bg-indigo-200 flex justify-center text-indigo-700 w-full p-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
                <path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clip-rule="evenodd" />
              </svg>
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
        <div class="w-full mt-1 p-8 flex flex-col justify-start gap-5 h-full">
            <div class="flex flex-wrap bg-gray-100 rounded-xl p-5 justify-evenly">
                {#if isfetching}
                <div class="loading loading-spinner self-center"></div>
                {/if}
                {#each answerphrase as a, i}
                <span class={{"text-indigo-800 font-bold border-b-2 border-dashed border-gray-400 m-2":true}}>
                    <p class={{"opacity-0":!inputedphrase[i], "loading loading-spinner":isfetching}}>{a}</p>
                </span>
                {/each}
            </div>
            <div class="w-full bg-gray-100 rounded-xl flex flex-wrap justify-start gap-1 p-5 relative">
                {#if isfetching}
                <div class="loading loading-spinner self-center"></div>
                {/if}
                {#each buttons as b,i (b.id)}
                <button onclick={()=>checkAnswer3(b,i)} class={{"text-indigo-800 bg-linear-to-br from-indigo-100 to-gray-100 p-2 my-1 px-3 text-lg font-bold rounded-xl transition-all duration-200":true,"opacity-0 btn btn-disabled":inputedphrase.includes(b,0)}}>
                    {b.value}
                </button>
                {/each}
                <div onclick={playAudio} class="absolute bottom-0 right-0 rounded-2xl mb-1 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                      </svg>                          
                </div>
            </div>
        </div>
       </div>
    {/if}
    
        
    
    {/if}
</div>
   
