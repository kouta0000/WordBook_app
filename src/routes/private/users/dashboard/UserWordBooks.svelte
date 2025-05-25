<script lang="ts">
import {fly, fade} from "svelte/transition";
import {enhance} from "$app/forms";
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
    let pending: boolean = $state(true);
    let deleting: boolean = $state(false);

    const handleSubmit = (id:number) => {
        forms[id].submit();
        dialogs[id]?.close();
  }
</script>
   
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <h1 class="text mb-10 mx-auto">あなたの単語帳</h1>
        {#if !isChecked}
        <button onclick={() => isChecked = true} class={{"w-4/5 md:w-2/5 lg:w-1/5 md:h-20 lg:h-15 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true}}>
            <p class="text-white">削除</p>
        </button>
        {:else}
        <button onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 md:h-20 lg:h-15 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true}}>
            <p class="text-white">元に戻す</p>
        </button>
        {/if}
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            {#each wordbooks as wordbook, id (wordbook.id)}
            <dialog bind:this={dialogs[id]} class="modal">
                <div class="modal-box flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>本当に削除しますか？</p>
                    <button class="btn btn-base" onclick={() => {deleting=true;dialogs[id]?.close()}}>はい</button>
                    <button class="btn btn-base" onclick={() => {deleting=false;dialogs[id]?.close()}}>いいえ</button>
                </div>
            </dialog>
           
            <div in:fly={{duration:300, y:20}} out:fade class="shadow-lg flex w-4/5 sm:grow rounded-3xl bg-white border-1 border-sky-300 relative">
                <a href="./dashboard/user/{wordbook.id}/wordsdashboard" class="absolute inset-0 z-1"></a>
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
                <svg class={{"w-1/12 m-1":true}} viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="20" class="fill-sky-500"/>
                </svg>
                <p class="mx-auto pr-10 my-4">{wordbook.wb_name}</p>
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>