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
    let forms:Array<HTMLFormElement> = $state([]);
    let sum =$state(0);
    for (const w of wordbooks) {
        sum+=w.word_number;
    }
    let deleting: boolean = $state(false);
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
                        <button class="btn bg-indigo-500 rounded-xl text-white font-bold w-3/5" type="submit" onclick={()=>dialog?.close()}>作成</button>          
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
        <div class="flex mb-10 justify-start w-full">
        <div class="gap-2 text-xl mask mask-squircle bg-white size-27 flex flex-col justify-center items-center">
            <p>単語帳数</p>
            <p>{wordbooks.length}</p>
        </div>
        <div class="gap-2 text-xl mask mask-squircle bg-white size-27 flex flex-col justify-center items-center">
            <p>総単語数</p>
            <p>{sum}</p>
        </div>
        </div>
        <h1 class="text-3xl mb-10 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 inline-block text-transparent bg-clip-text">単語帳</h1>
        <div class="w-full px-4 w-4/5 lg:w-1/2 flex gap-3 justify-end items-center absolute fixed bottom-17 lg:bottom-22 lg:right-5 z-20">
            <button type="button" onclick={() => isChecked=!isChecked} class={{"btn btn-lg btn-active rounded-3xl  w-min basis-0 opacity-90":true,"bg-indigo-500":!isChecked, "bg-linear-to-br from-indigo-500 to-sky-500":isChecked}}>
                <p class="whitespace-nowrap text-white font-bold text-base">{ !isChecked? "選択": "元に戻す"}</p>
            </button>
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
            <dialog bind:this={dialogs[id]} class="modal">
                <div class="modal-box flex bg-slate-100 flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>本当に削除しますか？</p>
                    <button class="btn btn-base" onclick={() => {deleting=true;dialogs[id]?.close()}}>はい</button>
                    <button class="btn btn-base" onclick={() => {deleting=false;dialogs[id]?.close()}}>いいえ</button>
                </div>
            </dialog>
           
            <div in:fly={{duration:300, y:20}} out:fade class="shadow-sm active:bg-indigo-100 transition-all duration-200 w-9/10 sm:grow p-7 flex flex-col gap-2 rounded-xl bg-white relative">
                <a href="./user/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
                {#if isChecked}
                <form use:enhance={ async (submitEvent) => {
                    dialogs[id]?.showModal();
                    const wait_dialog = () => {
                        return new Promise((resolve) => {
                            dialogs[id]?.addEventListener("close", () => {resolve("success")}, {once: true});
                        });
                    }
                    await wait_dialog();
                    if (!deleting) {
                        submitEvent.cancel();
                    } else {
                        return async ({ update }) => {
                            await update();
                            deleting=false;
                        }
                    };
                }} transition:fade={{duration:150}}  method="POST" action="?/delete" class={{"absolute z-2 top-0 right-0 size-20 aspect-square rounded-3xl":true}}>
                    <button type="submit" class={{"h-full w-full flex":true}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-1/3 aspect-ratio-1/1 my-auto ml-auto mr-2 bg-white/80">
                            <rect x="7" y="6" width="10" height="12" fill="none" stroke="gray" stroke-width="1"/>
                            <rect x="8" y="4" width="8" height="2" fill="none" stroke="gray" stroke-width="1"/>
                            <line x1="9" y1="8" x2="9" y2="16" stroke="gray" stroke-width="1"/>
                            <line x1="12" y1="8" x2="12" y2="16" stroke="gray" stroke-width="1"/>
                            <line x1="15" y1="8" x2="15" y2="16" stroke="gray" stroke-width="1"/>
                          </svg>
                    </button>
                    <input type="hidden" name="wordbook_id" value={wordbook.id}>
                </form>
                {/if}
                <div class="flex">
                    <div class="w-2/11 self-center mask mask-squircle p-4 flex justify-center items-center bg-radial from-indigo-600 to-sky-400/70 text-white font-black text-3xl aspect-square text-center">{wordbook.wb_name[0]}</div>
                    <div class="w-8/11 flex flex-col justify-center p-3">
                    <h1 class="text-xl text-center mb-3">{wordbook.wb_name}</h1>
                    <p class="text-right text-indigo-400 text-md">{wordbook.word_number? `${wordbook.word_number}語`: ""}</p>  
                    </div>
                </div>
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
