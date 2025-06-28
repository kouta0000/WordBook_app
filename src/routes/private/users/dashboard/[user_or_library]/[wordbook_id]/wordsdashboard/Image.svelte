<script lang="ts">
    import {scale, fade} from "svelte/transition";
    import EasyCamera from "@cloudparker/easy-camera-svelte";
    import {createWorker} from "tesseract.js";
    import {createEventDispatcher} from 'svelte';
    let {language, onend}:{language:string,onend:()=>void} = $props();
    let innerWidth:number = $state(0);
    let width = $derived(innerWidth<1000? Math.floor(innerWidth*0.99):300);
    let istaken:boolean = $state(false)
	let camera: EasyCamera | undefined = $state();
	let mirrorDisplay = $state(false);
    let image:string |ImageData|null = $state("");
    let text:string = $state("");
    const getCleanWords = (sentence: string): string[] => {
        const words = sentence.match(/[\p{L}\p{N}']+/gu);
        return words ? words : []; // Return an empty array if no matche
    };
    let textarray:string[] = $state([])
    const getLanguageCode= (language:string) => {
  const languageMap = [
    { name: '英語', code: 'eng' },
    { name: '日本語', code: 'jpn' },
    { name: '中国語（簡体字）', code: 'chi_sim' },
    { name: '中国語（繁体字）', code: 'chi_tra' },
    { name: '韓国語', code: 'kor' },
    { name: 'フランス語', code: 'fra' },
    { name: 'ドイツ語', code: 'deu' },
    { name: 'イタリア語', code: 'ita' },
    { name: 'スペイン語', code: 'spa' },
    { name: 'ロシア語', code: 'rus' },
    { name: 'アラビア語', code: 'ara' },
    { name: 'ポルトガル語', code: 'por' },
    { name: 'オランダ語', code: 'nld' },
    { name: 'スウェーデン語', code: 'swe' },
    { name: 'ポーランド語', code: 'pol' },
    { name: 'トルコ語', code: 'tur' },
    { name: 'ベトナム語', code: 'vie' },
    { name: 'タイ語', code: 'tha' },
    { name: 'インドネシア語', code: 'ind' },
    { name: 'ヒンディー語', code: 'hin' }
  ];

  const foundLanguage = languageMap.find(item => item.name === language);
  return foundLanguage ? foundLanguage.code : "eng";
}


	const handleImage = async () => {
        if (!camera) return;
        istaken=true;
		let imageData = await camera.captureImage();
        if (typeof imageData == "string") {
        image = imageData;
        camera?.close();
		setTimeout(()=>istaken=false,300);
        } else {
            console.log("error");
        }
	};

    let currentView = $state("");
    let resIndex:number = $state(0);
    let scroll:HTMLDivElement | undefined = $state();
    let step=$state(1);
    let messages:{q:string, r:string}[] =$state([
        {q:"どんなテーマが好き？",r:""},
        {q:"単語のレベルはどのくらいが良い？",r:""},
        {q:"どんな目的で勉強してる？",r:""},
        {q:"単語は何個作って欲しい？",r:""},
        {q:"答えてくれありがとう！",r:""}
    ]);
    let message_display:{q:string, r:string}[] = $state([messages[0]]);
    const res_choices:string[][] = [
        ["科学","美術","文学","時事","日常"],
        ["入門","初級","中級","上級","無制限"],
        ["試験","趣味","大学","学術"],
        ["10","20","30","40","50"],
        [],
    ];
    const ImagetoWords = async(image:string) => {
        step = 2;
        const language_code = getLanguageCode(language as string);
        const worker = await createWorker(language_code);
        const res = await worker.recognize(image);
        await worker.terminate();
        text = res.data.text;
        textarray=getCleanWords(text);
        console.log(textarray)
        step=3;
    }
        
    </script>
    <svelte:window bind:innerWidth={innerWidth} />
    <div transition:scale class="flex flex-col items-center justify-between absolute top-15 bottom-15 bg-slate-100 w-full p-10 z-2">
        {#if step == 1}
        <div class="bg-indigo-900 rounded-3xl p-[{istaken? 0:2}px] mt-10">
            <EasyCamera bind:width  style="border-radius:{45}px;" bind:this={camera} useFrontCamera={false} autoOpen bind:mirrorDisplay />
        </div>
        <div class="flex gap-1">
        <button class="btn btn-primary btn-active" type="button" onclick={() =>{if (image)ImagetoWords(image)}}>生成</button>
        <button class="btn btn-primary btn-active" type="button" onclick={() => camera?.open()}>再撮影</button>
        <button class="btn btn-primary btn-active" type="button" onclick={()=>handleImage()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
        </button>
        </div>
        {:else if step==2}
        <div class="text-center self-center mt-50">
            抽出中<span class="loading loading-spinner"></span>
        </div>
        {:else if step==3}
        <div class="w-full lg:w-2/5 h-full flex flex-col items-center gap-10">
        <div class="bg-indigo-200 rounded-xl overflow-y-auto h-9/10 w-full p-2 pt-4">
            <div class="flex flex-col justify-center gap-2">
                {#each textarray as t,i}
                <div class="w-full p-3 rounded-xl flex items-center justify-center gap-1 items-center">
                <div class="text-center grow bg-white rounded-xl p-2">
                    {t}
                </div>
                <div class="aspect-square" onclick={()=>textarray.splice(i,1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      
                </div>
                </div>
                {/each}
            </div>
        </div>
        
        <div class="flex justify-end w-full gap-2 items-center">
        <button class="btn btn-primary btn-active rounded-xl grow">
            送信
        </button>
        <button class="p-1 rounded-xl bg-indigo-200 self-end text-indigo-800" onclick={()=>{console.log("llll");onend();}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
        </button>
        </div>
        </div>
        {/if}
    </div>