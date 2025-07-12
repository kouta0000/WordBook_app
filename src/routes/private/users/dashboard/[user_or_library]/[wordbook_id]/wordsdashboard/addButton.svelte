<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import Fuse from "fuse.js";
    import {enhance} from"$app/forms";
    interface Props {
        wordbook_id:number,
        onend:()=>void,
    }
    let {wordbook_id, onend}:Props = $props();
    let dialog: HTMLDialogElement | undefined = $state();
    let creating:boolean = $state(false);
    let wordidstoadd: Array<number> = $state([0]);
    let index:number = $state(1);
</script>
{#if creating}
<div  class="bg-white/10 absolute w-[100vw] h-[100vh] z-20 flex justify-center items-center">
    <div>
    <p class="font-bold text-base text-white">追加中</p>
    <span class="loading loading-dots loading-sm text-white"></span>
    <span class="loading loading-dots loading-sm text-white"></span>
    <span class="loading loading-dots loading-sm text-white"></span>
    </div>
</div>
{/if}

<svg onclick={()=> dialog?.showModal()} xmlns="http://www.w3.org/2000/svg" class="active:scale-80" viewBox="0 0 64 64" width="56" height="56">
    <!-- 楕円形の背景（空色） -->
    <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-indigo-500" />
    <!-- 中心の白い横線 -->
    <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
    <!-- 中心の白い縦線 -->
    <rect x="30" y="22" width="4" height="20" ry="2" fill="#FFFFFF" />
</svg>  





<dialog bind:this={dialog} id="my_modal2" class="modal modal-bottom md:modal-middle">
    <div class="modal-box flex flex-col items-center bg-slate-100 w-full md:w-1/2  max-w-none max-h-4/5 overflow-auto relative">
        <form method="post" use:enhance={()=>{
            dialog?.close();
            creating=true;
            return async ({update}) => {
                await update();
                creating=false;
                onend();
            }
        }} action="?/createWord" class="w-full flex flex-col items-center gap-4">
            <h1>単語を追加しよう!</h1>
            
            <div class="w-9/10 flex lg:grid grid-cols-2 flex-col items-center gap-2">
            {#each wordidstoadd as wids,i (wids)}
            <div in:fly={{duration:200, y:20}} out:fly={{duration:200, y:-20}} class="bg-white rounded-xl w-full gap-2 p-2 border-1 border-stone-200 shadow-lg flex flex-col justify-center items-center">
            <input type="text" id="term" name="term" placeholder="単語" class="input shadow-md rounded-3xl w-9/10" required>
            <input type="text" id="meaning" name="meaning" placeholder="意味" class="input shadow-md rounded-3xl w-9/10" required>
            </div>
            {/each}
            <input type="hidden" id="wordbook_id" name="wordbook_id" value={wordbook_id} class="invisible" required>
            </div>
            <button class="btn bg-indigo-500 rounded-3xl text-white font-bold w-9/10 mt-5 shadow-lg" type="submit">追加</button>
        </form>
        <div class="flex-grow"></div>
        <div class="modal-action">
            <div class="flex items-center w-full gap-2">
                <form method="dialog" class="basis-1 w-1/4 grow mr-4">
                    <button class="btn">Close</button>
                </form>
                <button type="button" class="w-10 aspect-ratio-1/1" onclick={() => wordidstoadd.pop()}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="active:scale-80 " viewBox="0 0 64 64">
                        <!-- 楕円形の背景（空色） -->
                        <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-indigo-500" />
                        <!-- 中心の白い横線 -->
                        <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
                    </svg>  
                </button>
            <button type="button" class="w-10 aspect-ratio-1/1" onclick={() => wordidstoadd.push(index++)}>
                <svg xmlns="http://www.w3.org/2000/svg" class="active:scale-80" viewBox="0 0 64 64">
                    <!-- 楕円形の背景（空色） -->
                    <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-indigo-500" />
                    <!-- 中心の白い横線 -->
                    <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
                    <!-- 中心の白い縦線 -->
                    <rect x="30" y="22" width="4" height="20" ry="2" fill="#FFFFFF" />
                </svg>  
            </button>
            </div>
        </div>
    </div>
</dialog>
