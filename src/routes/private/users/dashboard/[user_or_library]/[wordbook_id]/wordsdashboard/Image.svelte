<script lang="ts">
    import {scale, fade} from "svelte/transition";
    import EasyCamera from "@cloudparker/easy-camera-svelte";
    import {createWorker} from "tesseract.js";
    import {onMount} from 'svelte';
    import {enhance} from "$app/forms";
    import type { SubmitFunction } from '@sveltejs/kit';
    import { goto } from "$app/navigation";
    interface Word {
    WordText: string;
    Left: number;
    Top: number;
    Height: number;
    Width: number;
  }
    let cameras: MediaDeviceInfo[] = $state([]);
    let errorMessage:string=$state("");
    let inputedWords:string[] = $state([]);
    let isClickeds:boolean[] =$state([])
    let {language,wordbook_id, onend}:{language:string,wordbook_id:string,onend:()=>void} = $props();
    let innerWidth:number = $state(0);
    let width = $derived(innerWidth<1000? Math.floor(innerWidth*0.99):300);
    let currentCameraDeviceId: string =$state("");
    let istaken:boolean = $state(false)
	let camera: EasyCamera | undefined = $state();
	let mirrorDisplay = $state(false);
    let image:string = $state("");
    let text:string = $state("");
    let canvas:HTMLCanvasElement|undefined=$state();
    const getCleanWords = (sentence: string): string[] => {
    const words = sentence.match(/[\p{L}\p{N}]+/gu);
    if (!words) {
        return [];
    }
    const filteredWords = words.filter(word => word.length >= 4);
    return filteredWords;
};
    let textarray:string[] = $state([])
    const getLanguageCode= (language:string) => {
        const languageMap = [
    { name: '英語', code: 'eng' },
    { name: '日本語', code: 'jpn' },
    { name: '中国語（簡体字）', code: 'chs' }, // ★変更: chi_sim -> chs
    { name: '中国語（繁体字）', code: 'cht' }, // ★変更: chi_tra -> cht
    { name: '韓国語', code: 'kor' },
    { name: 'フランス語', code: 'fre' },
    { name: 'ドイツ語', code: 'ger' }, // ★変更: deu -> ger (これもOCR.spaceの一般的なコード)
    { name: 'イタリア語', code: 'ita' },
    { name: 'スペイン語', code: 'spa' },
    { name: 'ロシア語', code: 'rus' },
    { name: 'アラビア語', code: 'ara' },
    { name: 'ポルトガル語', code: 'por' },
    { name: 'オランダ語', code: 'dut' }, // ★変更: nld -> dut
    { name: 'スウェーデン語', code: 'swe' },
    { name: 'ポーランド語', code: 'pol' },
    { name: 'トルコ語', code: 'tur' },
    { name: 'ベトナム語', code: 'vie' },
    { name: 'タイ語', code: 'tha' },
    { name: 'インドネシア語', code: 'ind' },
    // ヒンディー語はOCR.spaceの無料APIプランでは直接サポートされていないか、
    // 追加のデータセットが必要な場合があります。
    // 必要であれば、OCR.spaceのドキュメントでヒンディー語のサポート状況を確認してください。
    // { name: 'ヒンディー語', code: 'hin' } // ヒンディー語はOCR.spaceでは直接 'hin' としてはない可能性あり
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
        console.log(image)
        camera?.close();
		setTimeout(()=>istaken=false,300);
        } else {
            console.log("error");
        }
	};

    let currentView = $state("file");
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
    const drawImageOnCanvas= (img:any) => {
    if (!canvas) {
      console.error('キャンバス要素が見つかりません。');
      return;
    }
    const ctx = canvas.getContext('2d');

    const maxWidth = width;
    const maxHeight = 600;

    let w = img.width;
    let h = img.height;

    // 比率を維持しながらリサイズ
    if (w > maxWidth) {
      h = h * (maxWidth / w);
      w = maxWidth;
    }
    if (h > maxHeight) {
      width = w * (maxHeight / h);
      h = maxHeight;
    }

    canvas.width = w;
    canvas.height = h;

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(img, 0, 0, w, h);

    console.log(`画像をキャンバスに描画しました。サイズ: ${w}x${h}`);
  }
    
    const handleSwitchCamera = async() => {
        if (!camera) return;
        cameras = await camera.getCameraDevices();
        if (cameras.length <= 1) {
			console.log('切り替え可能なカメラが他にありません。');
			return;
		}

		// 現在のカメラのインデックスを見つける
		const currentIndex = cameras.findIndex(
			(dev) => dev.deviceId === currentCameraDeviceId
		);

		let nextCameraIndex = 0;
		if (currentIndex !== -1) {
			// 次のカメラのインデックスを計算（ループバック）
			nextCameraIndex = (currentIndex + 1) % cameras.length;
		}

		const nextCamera = cameras[nextCameraIndex];

		if (nextCamera) {
			try {
				await camera.switchCamera(nextCamera.deviceId);
				currentCameraDeviceId = nextCamera.deviceId;
				console.log(`カメラを ${nextCamera.label || '不明なカメラ'} に切り替えました。`);
			} catch (error) {
				console.error('カメラの切り替えに失敗しました:', error);
			}
		}
    }
    const handleChange = async(event:any) => {
        const file = event.target.files[0]; // 選択された最初のファイルを取得

    if (!file) {
      console.log("ファイルが選択されていません。")
      return;
    }

    // 画像ファイル以外が選択された場合の簡易チェック
    if (!file.type.startsWith('image/')) {
      console.log("画像ファイルではありません。")
      return;
    }
   
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image(); 
      img.onload = () => {
        
        drawImageOnCanvas(img); 
      };
      img.src = e.target?.result as string; // FileReaderで読み込んだData URLを画像のソースに設定
    };

    reader.onerror = (e) => {
      console.error('ファイルの読み込み中にエラーが発生しました:', e);
      alert('ファイルの読み込みに失敗しました。');
    };
    reader.readAsDataURL(file);
    }
    const CanvastoWords = async(canvas:HTMLCanvasElement) => {
        step = 2;
        console.log(canvas)
        const language_code = getLanguageCode(language as string);
        const worker = await createWorker(language_code);
        const res = await worker.recognize(canvas);
        await worker.terminate();
        text = res.data.text;
        textarray=getCleanWords(text);
        console.log(textarray)
        step=3;
    }
    const handleSubmit: SubmitFunction = async ({}) => {
        step=2;
        return async ({ result }) => {
            if (result.type === 'success') {
                const responseData = result.data as { fullText?: string; words?: { WordText: string }[]; error?: string };
                if (responseData.error) {
                    errorMessage = "error"
                    step=1;
                } else {
                    textarray = responseData.words?.map(v=>v.WordText)??[];
                    step=3;
                }
            } else if (result.type === 'failure') {
                errorMessage = result.data?.error || 'サーバーエラーが発生しました。';
                step=1;
                console.error('Server failure:', result.data);
            } else if (result.type === 'error') {
                errorMessage = `予期せぬエラー: ${result.error?.message || '不明'}`;
                step=1;
                console.error('Unexpected error:', result.error);
            }
        };
    };
    </script>
    <svelte:window bind:innerWidth={innerWidth} />
    <div transition:scale class="flex flex-col items-center justify-between absolute top-15 bottom-15 bg-slate-100 w-full p-10 z-2">
        {#if step == 1}
        {#if currentView=="file"}
        <div class="max-w-[90vw] rounded-xl p-[{istaken? 0:2}px] mt-10 mx-auto">
            <canvas class="w-full"  style="border-radius:{45}px;" bind:this={canvas} ></canvas>
        </div>
        {:else if currentView=="image"}
        <div class="rounded-3xl p-[{istaken? 0:2}px] mt-10">
            <EasyCamera bind:width  style="border-radius:{45}px;" bind:this={camera}  autoOpen bind:mirrorDisplay />
        </div>
        {/if}
        <div class="flex w-full lg:w-2/5 flex-col items-center gap-5">
        {#if currentView=="file"}
        <form class="flex flex-col items-center  gap-3 w-full" enctype="multipart/form-data" method="post" action="?/ocr" use:enhance={handleSubmit}>
        <input accept="image/*" onchange={handleChange} type="file" name="file" class="file-input file-input-primary rounded-xl" />
        <input type="hidden" name="language" value={getLanguageCode(language)} />
        <button type="submit" class="btn btn-primary btn-active w-full">文字抽出</button>
        </form>
        {:else if currentView=="image"}
        <form enctype="multipart/form-data"  method="post" action="?/ocr" use:enhance={handleSubmit}>
            <input type="hidden" value={image} name="file" class="file-input file-input-primary rounded-xl" />
            <input type="hidden" name="language" value={getLanguageCode(language)} />
            <button type="submit" class="btn btn-primary btn-active">文字抽出</button>
        </form>
        <div class="flex gap-1">
        <button class="btn btn-primary btn-active" type="button" onclick={() => camera?.open()}>再撮影</button>
        <button class="btn btn-primary btn-active" type="button" onclick={handleSwitchCamera}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
        </button>
        <button class="btn btn-primary btn-active" type="button" onclick={()=>handleImage()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
        </button>
        </div>
        
        {/if}
        <div class="flex gap-1 w-9/10 lg:w-3/5">
            <button class="btn btn-info grow {currentView=="file"? "btn-active": "btn-outline"}" type="button" onclick={() => currentView='file'}>アップロード</button>
            <button class="btn btn-info grow {currentView=="image"? "btn-active": "btn-outline"}" type="button" onclick={() => currentView='image'}>撮影</button>
        </div>
        </div>
        {:else if step==2}
        <div class="text-center self-center mt-50">
            抽出中<span class="loading loading-spinner"></span>
        </div>
        {:else if step==3}
        <div class="w-full lg:w-2/5 h-full flex flex-col items-center gap-10">
        <div class="bg-indigo-200 rounded-xl overflow-y-auto h-9/10 w-full p-4">
            <h1 class="text-center text-teal-400 text-xl font-bold mb-5">追加したい単語をタッチ</h1>
            <div class="flex flex-wrap justify-between bg-white p-1">
                {#each textarray as t,i}
                    <button transition:fade={{delay:i*20, duration:50}} onclick={()=> isClickeds[i]=!isClickeds[i]} class="text-center {isClickeds[i]? "border-1 border-indigo-700 bg-indigo-300 rounded-xl":""} p-1">
                        {t}
                    </button>
                {/each}
            </div>
        </div>
        
        <form method="post" action="?/createWordWithTranslation" use:enhance={() => {
            step = 4
            return async({update}) =>{
                update();
                step=1;
                
            }
        }} class="flex justify-end w-full lg:w-2/5 gap-2 items-center">
        {#each textarray as w,i}
        {#if isClickeds[i]}
        <input type="hidden" name="term" value={w} />
        {/if}
        {/each}
        <input type="hidden" name="language" value={language} />
        <input type="hidden" name="wordbook_id" value={wordbook_id} />
        <button type="submit" class="btn btn-primary btn-active rounded-xl grow">
            送信
        </button>
        <button class="p-1 rounded-xl bg-indigo-200 self-end text-indigo-800" onclick={()=>{console.log("llll");onend();}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
        </button>
        </form>
        </div>
        {:else if step==4}
        <div class="text-center self-center mt-50">
            追加中<span class="loading loading-spinner"></span>
        </div>
        {/if}
    </div>
