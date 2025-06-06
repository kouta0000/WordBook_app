<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {enhance} from"$app/forms";
    let { words, wb_name, wordbook_id, user_or_library} = $props();
    let dialog: HTMLDialogElement | undefined = $state();
    let dialogs: Array<HTMLDialogElement> = $state([]);
    let isChecked: boolean = $state(false);
    let updatings: boolean[] = $state([]);
    let updatings2: boolean[] =$state([]);
    let deleting:boolean =$state(false);
    let creating:boolean = $state(false);
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    let wordidstoadd: Array<number> = $state([0]);
    let index:number = $state(1);
    </script>


    
<div class="bg-slate-100/80 px-4 flex justify-end items-center fixed absolute top-12 pt-4 lg:top-15 lg:h-15 w-full flex flex-row flex-wrap gap-10 mb-10 z-16">
{#if user_or_library == "user"}
<a href="../../../dashboard/user" class="active:scale-80 btn bg-indigo-100 rounded-3xl w-1/3 w-min basis-0 text-black">
   <p class="whitespace-nowrap text-indigo-400 font-bold">戻る</p>
</a>
{:else}
<a href="../../../dashboard/library" class="active:scale-80 btn bg-indigo-100 btn-success rounded-3xl w-1/3 w-min basis-0 text-black">
    <p class="whitespace-nowrap text-indigo-400 font-bold">戻る</p>
</a>
{/if}
</div>
    <div class="w-full pt-16 pb-15 md:pb-20 flex flex-col min-h-screen gap-2 items-center ">
        <div class="text mt-23 mb-4 lg:mt-20 w-full flex justify-center items-center realtive h-20">
            <h1 class="border-stone-300 shadow-lg p-4 border-1 rounded-3xl bg-white">{wb_name}</h1>
        </div> 
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-x-0 items-center place-items-center relative">
            <div class="w-full px-4 w-4/5 lg:w-1/2 flex gap-3 justify-end items-center absolute fixed bottom-17 md:bottom-22 md:right-20 z-20">
                {#if creating}
                <div out:fade={{delay:800}} class="btn bg-indigo-500 rounded-3xl flex gap-1">
                    <p class="font-bold text-base text-white">追加中</p>
                    <span class="loading loading-dots loading-sm text-white"></span>
                    <span class="loading loading-dots loading-sm text-white"></span>
                    <span class="loading loading-dots loading-sm text-white"></span>
                </div>
                {/if}
                {#if deleting}
                <div class="btn flex gap-1 bg-indigo-500 rounded-3xl" out:fade={{delay:500}}>
                    <p class="font-bold text-base text-white">削除中</p>
                    <span class="loading loading-dots loading-sm text-white"></span>
                    <span class="loading loading-dots loading-sm text-white"></span>
                    <span class="loading loading-dots loading-sm text-white"></span>
                </div>
                {/if}
                <button type="button" onclick={() => {isChecked=!isChecked;updatings.fill(false)}} class={{"btn btn-active rounded-3xl  w-min basis-0 opacity-90":true,"bg-indigo-500":!isChecked, "bg-linear-to-br from-indigo-500 to-sky-500":isChecked}}>
                    <p class="whitespace-nowrap text-white text-base font-bold">{ !isChecked? "選択": "元に戻す"}</p>
                </button>
                <svg onclick={()=> dialog?.showModal()} xmlns="http://www.w3.org/2000/svg" class="active:scale-80" viewBox="0 0 64 64" width="50" height="50">
                    <!-- 楕円形の背景（空色） -->
                    <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-indigo-500" />
                    <!-- 中心の白い横線 -->
                    <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
                    <!-- 中心の白い縦線 -->
                    <rect x="30" y="22" width="4" height="20" ry="2" fill="#FFFFFF" />
                </svg>  
            </div>

            {#each words as word, id (word.id)}
            <dialog bind:this={dialogs[id]} class="modal w-full">
                <div class="modal-box bg-slate-100 flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>本当に削除しますか？</p>
                    <form use:enhance={()=>{
                        deleting=true;
                        return async ({update}) => {
                            update();
                            deleting=false;
                        }
                    }} transition:fade={{duration:150}}  method="POST" action="?/deleteWords" class="w-1/3 flex flex-col gap-3">
                        <input type="hidden" name="word_id" value={word.id}>
                        <button type="submit" class="btn btn-base" onclick={() => {dialogs[id]?.close()}}>はい</button>
                        <button type="button" class="btn btn-base" onclick={() => {dialogs[id]?.close()}}>いいえ</button>
                    </form>
                </div>
            </dialog>
            <div out:slide={{duration:300}} in:fly={{duration:300, y:20}} class="w-4/5 sm:grow flex flex-col justify-center items-start relative">
                {#if updatings[id]}
                <form method="POST" action="?/updateWord" use:enhance={() => {
                    updatings[id]=false;
                    updatings2[id]=true;
                    return async ({update}) => {
                        update();
                        updatings2[id]=false;
                  }
                }} class={{"absolute inset-0 flex flex-col justifry-center items-start z-2":true}}>
                    <span  class="pl-2 pr-2 py-1 flex border-stone-300 shadow-sm rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1 bg-white">
                        <label class="input input-ghost rounded-xl">
                        <p class="text-xs text-stone-300">変更</p>
                        <input type="text" placeholder="変更" id="term" name="term" value={word.term} class="m-auto font-semibold font-sans text-xl">
                        </label>
                        <button type="button" onclick={()=>{isChecked=!isChecked;updatings[id] = false}} class="btn btn-base rounded-full my-auto btn-sm">
                            戻る
                        </button>
                        <button type="submit" class="btn btn-base rounded-full my-auto btn-sm">
                            保存
                        </button>
                    </span>
                    <div class="px-2 flex w-full shadow-sm border-stone-300 rounded-xl relative bg-white">
                        <label class="input input-ghost rounded-xl my-2 py-2 max-w-9/10 font-sans text-lg mx-auto">
                        <p class="text-xs text-stone-300">変更</p>
                        <input type="text" id="meaning" name="meaning" value={word.meaning}>
                        </label>
                    </div>
                    <input type="hidden" id="id" name="id" value={word.id}>
                </form>
                {/if}
                {#if updatings2[id]}
                <div class={{"absolute inset-0 flex flex-col justifry-center items-start z-5":true}}>
                <span out:fade={{delay:1000}} class="pl-2 pr-2 flex border-1 border-stone-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1 skeleton">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl opacity-0">{word.term}</p>
                </span>
                <div out:fade={{delay:1000}} class="px-2 flex w-full border-1 border-stone-300 rounded-xl relative skeleton">
                    <p class="mx-auto my-4 max-w-9/10 font-sans text-lg opacity-0">Loading...</p>
                </div>
                </div>
                {/if}
                
                <span class="flex bg-white  border-stone-300 shadow-sm rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{word.term}</p>
                </span>
                <div class="flex w-full border-stone-300 shadow-sm rounded-xl bg-white relative">
                    <p class="mx-auto my-4 max-w-9/10 font-sans text-lg">{word.meaning}</p>
                    {#if isChecked}
                    <div transition:fade={{duration:150}} class="flex items-center w-1/5 absolute right-0 rounded-3xl top-1/2 -translate-y-1/2 bg-white/80 aspect-ratio-1/2 z-2">
                    <button  class="h-full aspect-ration-1/1" onclick={() => dialogs[id]?.showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" class="w-full h-full m-auto fill-none rounded-3xl">
                            <rect x="7" y="9" width="10" height="12" fill="none" stroke="gray" stroke-width="1"/>
                            <rect x="8" y="7" width="8" height="2" fill="none" stroke="gray" stroke-width="1"/>
                            <line x1="9" y1="11" x2="9" y2="19" stroke="gray" stroke-width="1"/>
                            <line x1="12" y1="11" x2="12" y2="19" stroke="gray" stroke-width="1"/>
                            <line x1="15" y1="11" x2="15" y2="19" stroke="gray" stroke-width="1"/>
                        </svg>
                    </button>
                    <button class="h-full aspect-ratio-1/1" onclick={() => {updatings[id]=true;isChecked=!isChecked}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" class="w-4/5 h-4/5 m-auto fill-none rounded-3xl">
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
                <hr class="w-full scale-70 h-2 mt-4 bg-indigo-200 border-0 rounded-sm md:mb-1 dark:bg-gray-700">
            </div>
            
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
    <dialog bind:this={dialog} id="my_modal2" class="modal modal-bottom md:modal-middle">
        <div class="modal-box flex flex-col items-center bg-slate-100 w-full md:w-1/2  max-w-none max-h-4/5 overflow-auto relative">
            <form method="post" use:enhance={()=>{
                dialog.close();
                creating=true;
                return async ({update}) => {
                    update();
                    creating=false;
                }
            }} action="?/createWord" class="w-full flex flex-col items-center gap-4">
                <h1>単語を追加しよう!</h1>
                
                <div class="w-9/10 flex lg:grid grid-cols-2 flex-col items-center gap-2">
                {#each wordidstoadd as wids,i (wids)}
                <div in:fly={{duration:200, y:20}} out:fly={{duration:200, y:-20}} class="bg-white rounded-xl w-full gap-2 p-2 border-1 border-stone-200 shadow-lg flex flex-col justify-center items-center">
                <input type="text" id="term" name="term" placeholder="単語" class="input shadow-md rounded-3xl w-9/10" required>
                <input type="text" id="meaning" name="meaning" placeholder="意味" class="input shadow-md rounded-3xl w-9/10" required>
                <input type="hidden" id="wordbook_id" name="wordbook_id" value={wordbook_id} class="invisible" required>
                </div>
                {/each}
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
