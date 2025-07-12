
<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import Fuse from "fuse.js";
    import {enhance} from"$app/forms";
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    interface Props {
        wordbook_id:number,
        onend:()=>void,
        word:Word
    }
    let {wordbook_id, onend,word}:Props = $props();
    let dialog: HTMLDialogElement | undefined = $state();
    let dialog2:HTMLDialogElement | undefined = $state();
    let updating:boolean = $state(false);
    let deleting:boolean = $state(false);
</script>
<dialog bind:this={dialog} class="modal w-full">
    <div class="modal-box bg-slate-100 flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
        <p>削除しますか？</p>
        <form use:enhance={()=>{
            deleting=true;
            return async ({update}) => {
                
                await update();
                deleting=false;
                onend();
            }
        }} transition:fade={{duration:150}}  method="POST" action="?/deleteWords" class="w-1/3 flex flex-col gap-3">
            <input type="hidden" name="word_id" value={word.id}>
            <button type="submit" class="btn btn-base" onclick={() => {dialog?.close()}}>はい</button>
            <button type="button" class="btn btn-base" onclick={() => {dialog?.close()}}>いいえ</button>
        </form>
    </div>
</dialog>

<dialog bind:this={dialog2} class="modal w-full">
    <div class="modal-box bg-slate-100 flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
        <p>変更</p>
        <form method="POST" action="?/updateWord" use:enhance={() => {
            updating=true;
            return async ({update}) => {
                update();
                updating=false;
                onend();
        }
        }} class={{"w-full bg-white rounded-xl flex flex-col items-center gap-2 justify-center p-3  z-2":true}}>
        
            <div class="w-full">
                <label class="input rounded-xl text-gray-600 text-sm">
                    単語                       
                <input type="text" id="term" name="term" value={word.term} class="pb-1 font-semibold font-sans text-xl text-black">
                </label>
            </div>
            <div class="w-full">
                <label class="input rounded-xl text-gray-600 ">
                    意味                                 
                <input type="text" id="meaning" name="meaning" class="text-black" value={word.meaning}>
                </label>
                
                <input type="hidden" id="id" name="id" value={word.id}>
        </div>
        <div class="flex gap-1 justify-center w-full mt-3">
        <button type="button" onclick={()=>dialog2?.close()} class="btn btn-base rounded-full my-auto  text-gray-900">
            キャンセル                                   
        </button>
        <button type="submit" onclick={()=>dialog2?.close()} class="btn btn-base rounded-full my-auto  text-gray-900">
            送信                                   
        </button>
       
        </div>
        </form>
    </div>
</dialog>

<div class="flex justify-center items-center z-2 p-1">
    <button  class="h-full aspect-ration-1/1" onclick={() => dialog?.showModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>                                               
    </button>
    <button class="h-full aspect-ratio-1/1" onclick={() => {dialog2?.showModal();}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
          </svg>                         
    </button>
</div>