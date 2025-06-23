<script lang="ts">
import {fly, fade} from "svelte/transition";
import {enhance} from "$app/forms";
import Gabyo from "./Gabyo.svelte";
import Gabyo2 from "./Gabyo2.svelte";
import LanguageRadioGroup from "./LanguageRadioGroup.svelte";
import {onMount} from "svelte";

interface Props {
    wordbooks: Wordbook[];
}
interface Wordbook {
    wb_name: any;
    id: any;
    language: any;
    word_number:any;
}

    let { wordbooks }: Props = $props();
    let isChecked: boolean = $state(false);
    let dialogs: Array<HTMLDialogElement> = $state([]);
    let dialogs2:Array<HTMLDialogElement> = $state([]);
    let forms:Array<HTMLFormElement> = $state([]);
    let sum =$state(0);
    for (const w of wordbooks) {
        sum+=w.word_number;
    }
    let deleting: boolean = $state(false);
    let updating: boolean = $state(false);
    let dialog: HTMLDialogElement | undefined = $state();
    let animaux = $state(["/images/tlex.png", "/images/ptella.png", "/images/raptor.png", "/images/tri.png","/images/presio.png", "/images/black.png"])
    
    const shuffleImages = (images:string[]) => {
        const length: number = images.length-1;
        for (let i = length; i > 0; i--) {
            const random: number = Math.floor(Math.random()*(i+1));
            [images[i], images[random]] = [images[random], images[i]];
        }
    }
onMount(()=>{
    shuffleImages(animaux);
    })
</script>
   
<dialog bind:this={dialog} id="my_modal" class="modal">
    <div class="modal-box flex flex-col bg-slate-100 items-center w-full sm:w-3/5 md:w-2/5 max-w-none">
        <form method="post" use:enhance action="?/add" class="w-full flex flex-col items-center gap-8">
            <div class="carousel w-full">
                <div id="item1" class="carousel-item w-full">
                    <LanguageRadioGroup />
                </div>
                <div id="item2" class="carousel-item w-full flex bg-white rounded-lg flex-col justify-center items-center gap-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                            名前を決めよう！
                        </h2>
                        <input type="text" id="wb_name" name="wb_name" placeholder="名前" class="input shadow-lg border-indigo-500 rounded-xl w-3/5" required>
                        <button class="btn bg-indigo-500 rounded-xl text-white font-bold w-3/5" type="submit">作成</button>          
                </div>
              </div>
              <div class="flex w-full justify-center gap-2 py-2">
                <a href="#item1" class="btn btn-sm bg-indigo-500 text-white font-bold">戻る</a>
                <a href="#item2" class="btn btn-sm bg-indigo-500 text-white font-bold">次へ</a>
              </div>     
        </form>
        <div class="flex-grow"></div>
        <div class="modal-action">
        <form method="dialog" class="mb-3">
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
</dialog>

    <div class="w-full min-h-screen pt-20 flex flex-col items-center">
        <div class="flex mb-10 justify-start w-full p-1 px-5 gap-5">
        <div class="gap-2 text-sm text-indigo-900 mask mask-squircle bg-linear-to-r from-indigo-100 to-pink-50 size-20 flex flex-col justify-center items-center">
            <p>単語帳数</p>
            <p>{wordbooks.length}</p>
        </div>
        <div class="gap-2 text-sm text-indigo-900 mask mask-squircle bg-linear-to-r from-indigo-100 to-pink-50 size-20 flex flex-col justify-center items-center">
            <p>総単語数</p>
            <p>{sum}</p>
        </div>
        </div>
        <h1 class="text-3xl mb-10 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 inline-block text-transparent bg-clip-text">単語帳</h1>
        <div class="w-full px-4 w-4/5 lg:w-1/2 flex gap-3 justify-end items-center absolute fixed bottom-17 lg:bottom-22 lg:right-5 z-20">
            <svg onclick={()=> dialog?.showModal()} xmlns="http://www.w3.org/2000/svg" class="active:scale-80" viewBox="0 0 64 64" width="56" height="56">
                <!-- 楕円形の背景（空色） -->
                <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-indigo-500" />
                <!-- 中心の白い横線 -->
                <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
                <!-- 中心の白い縦線 -->
                <rect x="30" y="22" width="4" height="20" ry="2" fill="#FFFFFF" />
            </svg>  
        </div>
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            
            {#each wordbooks as wordbook, id (wordbook.id)}
            <!--削除だいあろぐ-->
            <dialog bind:this={dialogs[id]} class="modal">
                <div class="modal-box flex bg-slate-100 flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>本当に削除しますか？</p>
                    <form method="POST" action="?/delete" use:enhance={ async () => {
                        return async ({ update }) => {
                                await update();
                                deleting=false;
                            }}
                        }> 
                    <button class="btn btn-base" onclick={() => {deleting=true;dialogs[id]?.close()}}>はい</button>
                    <input type="hidden" name="wordbook_id" value={wordbook.id}>
                    </form>
                    <button class="btn btn-base" onclick={() => {dialogs[id]?.close()}}>いいえ</button>
                </div>
            </dialog>
            <!--更新だいあろぐ-->
            <dialog bind:this={dialogs2[id]} class="modal">
                <div class="modal-box flex bg-slate-100 flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>変更</p>
                    <form method="POST" action="?/update" use:enhance={ async () => {
                        return async ({ update }) => {
                                await update();
                                updating=false;
                            }}
                        } class="w-4/5 flex flex-col justify-center items-center gap-3">
                    <label class="input rounded-xl text-gray-500">
                        名前
                        <input type="text" class="text-center text-gray-900" name="wb_name" value={wordbook.wb_name} required>
                    </label>
                    <button class="btn btn-base" onclick={() => {updating=true;dialogs2[id]?.close()}}>送信</button>
                    <input type="hidden" name="wordbook_id" value={wordbook.id}>
                    </form>
                    <button class="btn btn-base" onclick={() => {dialogs2[id]?.close()}}>閉じる</button>
                </div>
            </dialog>
           
            <div class="shadow-sm active:bg-indigo-100 transition-all duration-200 w-9/10 sm:grow p-7 flex flex-col gap-2 rounded-xl bg-white relative">
                <a href="./user/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                <div class={{"absolute z-2 top-0 right-0 w-full py-1 px-2 flex gap-2  justify-end":true}}>
                    <button onclick={()=>dialogs[id]?.showModal()} class="text-gray-500 hover:text-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>                          
                    </button>
                    <button onclick={()=>dialogs2[id]?.showModal()} class="text-gray-500 hover:text-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>                     
                    </button>
                   
                </div>
                <div class="flex items-center">
                    <div class="w-2/13  mask mask-squircle p-4 flex justify-center items-center bg-radial from-indigo-600 to-sky-400/70 text-white font-black text-3xl aspect-square text-center">{wordbook.wb_name[0]}</div>
                    <div class="w-8/13 flex flex-col justify-center items-center">
                    <h1 class="text-xl text-center">{wordbook.wb_name}</h1>
                    </div>
                    <div class="absolute bottom-0 right-0 p-2">
                    <p class="text-right text-indigo-400 text-md">{wordbook.word_number? `${wordbook.word_number}語`: ""}</p>  
                    </div>
                </div>
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
