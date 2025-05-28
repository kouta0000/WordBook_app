<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {enhance} from"$app/forms";
    let { words, wb_name, wordbook_id, user_or_library } = $props();
    let dialog: HTMLDialogElement | undefined = $state();
    let dialogs: Array<HTMLDialogElement> = $state([]);
    let isChecked: boolean = $state(false);
    let updating: boolean = $state(false);
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    let wordidstoadd: Array<number> = $state([0]);
    let index:number = $state(1);
    </script>


    


    <div class="w-full pt-18 pb-15 md:pb-20 flex flex-col min-h-screen gap-5 items-center ">
        <div class="text mt-25 lg:mt-20 mb-2 w-full flex justify-center items-center realtive h-20">
            <h1>{wb_name}</h1>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <div class="w-full px-4 w-4/5 lg:w-1/2 flex gap-3 justify-center items-center absolute fixed bottom-22 lg:right-5 z-20">
                {#if isChecked}
                <button type="submit" class="btn btn-active bg-sky-500 rounded-3xl grow w-min basis-0">
                    <p class="text-white">削除</p>
                </button>
                {/if}
                <button type="button" onclick={() => isChecked=!isChecked} class="btn btn-active bg-sky-300 rounded-3xl grow w-min basis-0 opacity-90">
                    <p class="whitespace-nowrap text-white">{ !isChecked? "選択": "元に戻す"}</p>
                </button>
                {#if !isChecked}
                <button type="button" class="btn btn-active bg-sky-400 rounded-3xl grow w-min basis-0 opacity-90" onclick={() => dialog?.showModal()}>
                    <p class="whitespace-nowrap text-white">追加</p>
                </button>
                {/if}
            </div>

            {#each words as word, id (word.id)}
            <dialog bind:this={dialogs[id]} class="modal w-full">
                <div class="modal-box flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>本当に削除しますか？</p>
                    <form use:enhance transition:fade={{duration:150}}  method="POST" action="?/deleteWords" class="w-1/3 flex flex-col gap-3">
                        <input type="hidden" name="word_id" value={word.id}>
                        <button type="submit" class="btn btn-base" onclick={() => {dialogs[id]?.close()}}>はい</button>
                        <button type="button" class="btn btn-base" onclick={() => {dialogs[id]?.close()}}>いいえ</button>
                    </form>
                </div>
            </dialog>
            <div out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-4/5 sm:grow flex flex-col justify-center items-start relative">
                <span  class="flex bg-white border-1 border-sky-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{word.term}</p>
                </span>
                <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-sky-300 relative">
                    <p class="mx-auto my-4 max-w-9/10 font-sans text-lg">{word.meaning}</p>
                    {#if isChecked}
                    <div class="flex absolute right-2 top-0 bottom-0 p-2">
                    <button  class={{"h-full w-full flex":true}} onclick={() => dialogs[id]?.showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full m-auto bg-white">
                            <rect x="7" y="6" width="10" height="12" fill="none" stroke="gray" stroke-width="1"/>
                            <rect x="8" y="4" width="8" height="2" fill="none" stroke="gray" stroke-width="1"/>
                            <line x1="9" y1="8" x2="9" y2="16" stroke="gray" stroke-width="1"/>
                            <line x1="12" y1="8" x2="12" y2="16" stroke="gray" stroke-width="1"/>
                            <line x1="15" y1="8" x2="15" y2="16" stroke="gray" stroke-width="1"/>
                        </svg>
                    </button>
                    <button onclick={() => updating=true}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full h-full m-auto bg-white">
                            <g transform="translate(32,32) scale(1.6) rotate(-45) translate(-32,-32)">
                              <!-- 鉛筆の先端（尖った部分） -->
                              <polygon points="18,28 12,32 18,36" fill="#808080" />
                              <!-- 鉛筆の本体（太めで角を丸く） -->
                              <rect x="18" y="28" width="28" height="8" rx="3" ry="3" fill="#808080" />
                              <!-- 消しゴム部分（可愛らしい丸みをプラス） -->
                              <rect x="46" y="28" width="6" height="8" rx="1.5" ry="1.5" fill="#808080" />
                            </g>
                          </svg>
                          
                    </button>
                    </div>
                     {/if}         
                </div>
            </div>
            
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
    <dialog bind:this={dialog} id="my_modal2" class="modal modal-bottom md:modal-middle">
        <div class="modal-box flex flex-col items-center bg-stone-50 w-full md:w-1/2  max-w-none max-h-4/5 overflow-auto">
            <form method="post" use:enhance action="?/createWord" class="w-full flex flex-col items-center gap-4">
                <h1>単語を追加しよう!</h1>
                <button type="button" class="w-9/10 btn  shadow-lg" onclick={() => wordidstoadd.push(index++)}>ふやす</button>
                <button type="button" class="w-9/10 btn shadow-lg" onclick={() => wordidstoadd.pop()}>へらす</button>
                <div class="w-9/10 flex lg:grid grid-cols-2 flex-col items-center gap-2">
                {#each wordidstoadd as wids,i (wids)}
                <div in:fly={{duration:200, y:20}} out:fly={{duration:200, y:-20}} class="bg-white rounded-xl w-full gap-2 p-2 border-1 border-stone-200 shadow-lg flex flex-col justify-center items-center">
                <input type="text" id="term" name="term" placeholder="単語" class="input shadow-md rounded-3xl w-9/10" required>
                <input type="text" id="meaning" name="meaning" placeholder="意味" class="input shadow-md rounded-3xl w-9/10" required>
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