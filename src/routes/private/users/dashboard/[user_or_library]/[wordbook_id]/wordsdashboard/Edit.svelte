<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {enhance} from"$app/forms";
    let { words, wb_name, wordbook_id } = $props();
    let dialog: HTMLDialogElement | undefined = $state();
    let isChecked: boolean = $state(false)
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    let wordidstoadd: Array<number> = $state([0]);
    let index:number = $state(1);
    </script>


    


    <div class="w-full pt-18 pb-15 md:pb-20 flex flex-col min-h-screen gap-5 items-center ">
        <h1 class="text mt-25 lg:mt-25 mb-2">{wb_name}</h1> 
        <form method="POST" action="?/deleteWords" use:enhance={() => {
            isChecked = !isChecked;
            return async ({update}) => {
                await update();
            }
        }} class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <div class="w-full px-4 md:w-4/5 lg:w-1/2 flex gap-3 justify-center items-center absolute fixed bottom-22 lg:right-5 z-20">
                {#if isChecked}
                <button type="submit" class="btn btn-active btn-warning rounded-2xl grow w-min basis-0">
                    <p class="text-white">削除</p>
                </button>
                {/if}
                <button type="button" onclick={() => isChecked=!isChecked} class="btn btn-active bg-pink-300 rounded-2xl grow w-min basis-0 opacity-90">
                    <p class="whitespace-nowrap text-white">{ !isChecked? "選択": "元に戻す"}</p>
                </button>
                {#if !isChecked}
                <button type="button" class="btn btn-active bg-pink-300 rounded-2xl grow w-min basis-0 opacity-90" onclick={() => dialog?.showModal()}>
                    <p class="whitespace-nowrap text-white">追加</p>
                </button>
                {/if}
            </div>
            {#each words as word (word.id)}
            <div out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-4/5 sm:grow flex flex-col justify-center items-start">
                <span  class="flex bg-white border-1 border-sky-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{word.term}</p>
                </span>
                <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-sky-300 relative">
                    <p class="mx-auto my-4 max-w-9/10 font-sans text-lg">{word.meaning}</p>
                    <input type="checkbox" name="deletecheck" value={word.id} class={{"checkbox-xl my-auto mr-2 checkbox checkbox-warning z-10":true, "hidden":!isChecked, "block":isChecked}}>
                    
                </div>
            </div>
            {/each}
        </form>
        <div class="w-full h-50"></div>
    </div>
    <dialog bind:this={dialog} id="my_modal2" class="modal modal-bottom md:modal-middle">
        <div class="modal-box flex flex-col items-center bg-stone-50 w-full md:w-1/2  max-w-none max-h-4/5 overflow-auto">
            <form method="post" use:enhance action="?/createWord" class="w-full flex flex-col items-center gap-4">
                <h1>単語を追加しよう!</h1>
                <button type="button" class="w-9/10 btn btn-soft shadow-lg" onclick={() => wordidstoadd.push(index++)}>ふやす</button>
                <button type="button" class="w-9/10 btn btn-soft shadow-lg" onclick={() => wordidstoadd.pop()}>へらす</button>
                <div class="w-full flex lg:grid grid-cols-2 flex-col items-center gap-2">
                {#each wordidstoadd as wids,i (wids)}
                <div in:fly={{duration:200, y:20}} out:fly={{duration:200, y:-20}} class="bg-white w-full gap-2 p-2 border-1 border-stone-200 shadow-lg flex flex-col justify-center items-center">
                <input type="text" id="term" name="term" placeholder="単語" class="input input-neutral w-9/10" required>
                <input type="text" id="meaning" name="meaning" placeholder="意味" class="input input-neutral w-9/10" required>
                <input type="hidden" id="wordbook_id" name="wordbook_id" value={wordbook_id} class="invisible" required>
                </div>
                {/each}
                </div>
                <button class="btn w-9/10 mt-5 shadow-lg" type="submit" onclick={() => dialog?.close()}>追加</button>
            </form>
            <div class="flex-grow"></div>
            <div class="modal-action">
            <form method="dialog" class="mb-3">
                <button class="btn">Close</button>
            </form>
            </div>
        </div>
    </dialog>