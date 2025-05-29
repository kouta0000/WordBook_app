<script lang="ts">
import {fly, fade} from "svelte/transition";
import {enhance} from "$app/forms";
import {elasticOut} from "svelte/easing";
interface Props {
    wordbooks: Wordbook[];
}
interface Wordbook {
    wb_name: any;
    id: any;
}
    let { wordbooks }: Props = $props();
    let isChecked: boolean = $state(false);
    let dialogs: Array<HTMLDialogElement> = $state([]);
    let forms:Array<HTMLFormElement> = $state([]);
    let deleting: boolean = $state(false);
    let dialog: HTMLDialogElement | undefined = $state();
</script>
   
<dialog bind:this={dialog} id="my_modal" class="modal">
    <div class="modal-box flex flex-col items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
        <form method="post" use:enhance action="?/add" class="w-full flex flex-col items-center gap-8">
            <label for="wb_name" class="label-base">単語帳の名前を決めよう!</label>
            <input type="text" id="wb_name" name="wb_name" placeholder="wordbook_name" class="input shadow-lg rounded-3xl w-9/10" required>
            <button class="btn w-9/10" type="submit" onclick={()=>dialog?.close()}>作成</button>
        </form>
        <div class="flex-grow"></div>
        <div class="modal-action">
        <form method="dialog" class="mb-3">
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
</dialog>
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <h1 class="text mb-10 mx-auto">あなたの単語帳</h1>
        <div class="w-full px-4 w-4/5 lg:w-1/2 flex gap-3 justify-end items-center absolute fixed bottom-17 lg:bottom-22 lg:right-5 z-20">
            <button type="button" onclick={() => isChecked=!isChecked} class={{"btn btn-lg btn-active rounded-3xl  w-min basis-0 opacity-90":true,"bg-sky-500":!isChecked, "bg-indigo-500":isChecked}}>
                <p class="whitespace-nowrap text-white font-bold text-base">{ !isChecked? "選択": "元に戻す"}</p>
            </button>
            <svg onclick={()=> dialog?.showModal()} xmlns="http://www.w3.org/2000/svg" class="active:scale-80" viewBox="0 0 64 64" width="56" height="56">
                <!-- 楕円形の背景（空色） -->
                <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-sky-500" />
                <!-- 中心の白い横線 -->
                <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
                <!-- 中心の白い縦線 -->
                <rect x="30" y="22" width="4" height="20" ry="2" fill="#FFFFFF" />
            </svg>  
        </div>
        
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            {#each wordbooks as wordbook, id (wordbook.id)}
            <dialog bind:this={dialogs[id]} class="modal">
                <div class="modal-box flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>本当に削除しますか？</p>
                    <button class="btn btn-base" onclick={() => {deleting=true;dialogs[id]?.close()}}>はい</button>
                    <button class="btn btn-base" onclick={() => {deleting=false;dialogs[id]?.close()}}>いいえ</button>
                </div>
            </dialog>
           
            <div in:fly={{duration:300, y:20}} out:fade class="shadow-lg active:bg-sky-100 transition-all duration-200 flex w-4/5 sm:grow rounded-3xl bg-white border-1 border-stone-300 relative">
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
                }} transition:fade={{duration:150}}  method="POST" action="?/delete" class={{"absolute z-2 top-0 right-0 bottom-0 aspect-square rounded-3xl":true}}>
                    <button type="submit" class={{"h-full w-full flex":true}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-2/3 h-2/3 m-auto bg-white">
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
                <div class={{"w-1/12 aspect-ratio-1/1/ m-1 mask mask-hexagon bg-sky-500":true}}>
                </div>
                <p class="mx-auto pr-10 my-4">{wordbook.wb_name}</p>
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>