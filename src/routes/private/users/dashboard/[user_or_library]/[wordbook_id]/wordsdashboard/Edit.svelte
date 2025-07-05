<script lang="ts">
    import {fly, slide, fade} from "svelte/transition";
    import {fit, parent_style} from "@leveluptuts/svelte-fit";
    import Fuse from "fuse.js";
    import {enhance} from"$app/forms";
    import IntersectionObserver from "svelte-intersection-observer";
    let { words, wb_name, wordbook_id, user_or_library} = $props();
    let dialog: HTMLDialogElement | undefined = $state();
    let dialogs: Array<HTMLDialogElement> = $state([]);
    let isChecked: boolean = $state(false);
    const terms:string[] = words.map(v=>v.term);
    let wordsc = $state(words);
    let cards:HTMLDivElement[] = $state([]);
    let searchresults:string[] = $state(["","","","","",""]);
    let searchinput = $state("");
    let updatings: boolean[] = $state([]);
    let updatings2: boolean[] =$state([]);
    let showContents = $state(Array(words.length).fill(false));
    let deleting:boolean =$state(false);
    let creating:boolean = $state(false);
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    let wordidstoadd: Array<number> = $state([0]);
    let index:number = $state(1);
    const handleSearchInput = () => {
        const options = {// 検索対象のキーを指定
                keys:[""],
                threshold: 1.0,           // 類似度の閾値を設定
                shouldSort: true,
                includeScore:true          // スコア順に結果を並べ替える
            };
            const fuse = new Fuse(terms, options);
            const result = fuse.search(searchinput);
            searchresults = result.slice(0,5).map(v=>v.item);
    }
    const resultToTop = (result:string) =>{
        const index = wordsc.map(v=>v.term).indexOf(result);

        if (index !== -1) {
            // 配列からその要素を削除
            const [element] = wordsc.splice(index, 1);
            // 削除した要素を先頭に追加
            wordsc.unshift(element);
        }
        searchinput="";
        searchresults=["","","","","",""];
    }
    </script>


    
<div class="bg-slate-100/80 px-4 flex justify-end items-center fixed absolute top-15 py-2  lg:h-15 w-full flex flex-row flex-wrap gap-10 mb-10 z-11">
{#if user_or_library == "user"}
<a href="../../../dashboard/user" class="active:scale-80 btn btn-sm bg-indigo-200 rounded-3xl w-1/3 w-min basis-0 text-black">
   <p class="whitespace-nowrap text-indigo-700 font-bold">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      
   </p>
</a>
{:else}
<a href="../../../dashboard/library" class="active:scale-80 btn btn-sm bg-indigo-200 btn-success rounded-3xl w-1/3 w-min basis-0 text-black">
    <p class="whitespace-nowrap text-indigo-700 font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>          
    </p>
</a>
{/if}
</div>
    <div class="w-full pt-16 pb-15 md:pb-20 flex flex-col min-h-screen gap-2 items-center">
        <div class="flex flex-col mt-23 mb-10 lg:mt-20 gap-5 w-9/10 lg:w-1/3 p-5">
            <div class="flex gap-5 justify-center items-center realtive h-20">
                <h1 class=" shadow-lg p-6 text-indigo-700 text-xl max-w-3/5 rounded-3xl bg-linear-to-br from-indigo-100 to-gray-100">{wb_name}</h1>    
            </div>
            <div class="w-full text-center relative w-9/10">
            <label class="input w-full">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input onblur={()=>{setTimeout(()=>{searchinput="";searchresults=["","","","","",""]},300)}} oninput={handleSearchInput} bind:value={searchinput} type="search" placeholder="Search" />
              </label>
              
              {#if searchinput}
              <div transition:slide class="absolute top-[100%] w-full rounded-xl z-10">
              {#each searchresults as r}
              <div onclick={()=>resultToTop(r)} class="min-h-7 border-1 border-gray-200 text-gray-500 text-sm text-center p-2 bg-white hover:bg-slate-200 cursor-pointer">
                {r}
              </div>
              {/each}
              </div>
              {/if}
              </div>
            </div>
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <div class="w-full px-4 w-4/5 lg:w-1/2 flex gap-4 justify-end items-center absolute fixed bottom-17 md:bottom-22 md:right-20 z-20">
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
                <svg onclick={()=> dialog?.showModal()} xmlns="http://www.w3.org/2000/svg" class="active:scale-80" viewBox="0 0 64 64" width="56" height="56">
                    <!-- 楕円形の背景（空色） -->
                    <ellipse cx="32" cy="32" rx="30" ry="28" class="fill-indigo-500" />
                    <!-- 中心の白い横線 -->
                    <rect x="22" y="30" width="20" height="4" rx="2" fill="#FFFFFF" />
                    <!-- 中心の白い縦線 -->
                    <rect x="30" y="22" width="4" height="20" ry="2" fill="#FFFFFF" />
                </svg>  
            </div>

            {#each wordsc as word, id (word.id)}
            <dialog bind:this={dialogs[id]} class="modal w-full">
                <div class="modal-box bg-slate-100 flex flex-col gap-4 items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
                    <p>削除しますか？</p>
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
            <IntersectionObserver element={cards[id]} on:intersect={(e) => {showContents[id]=true}}>
            <div bind:this={cards[id]} class="w-9/10 sm:grow flex flex-col justify-center items-start relative">
                <div class="flex justify-center w-full shadow-lg bg-white shadow-sm rounded-xl relative">
                    {#if showContents[id]}
                    <div class="grow flex flex-col max-w-7/8 relative">
                        {#if updatings[id]}
                        <form method="POST" action="?/updateWord" use:enhance={() => {
                            updatings[id]=false;
                            updatings2[id]=true;
                            return async ({update}) => {
                                update();
                                updatings2[id]=false;
                        }
                        }} class={{"absolute inset-0 w-full bg-white rounded-xl flex flex-col items-center gap-1 justify-center p-1  z-2":true}}>
                        
                            <div  class="w-full flex">
                                <label class="input input-ghost input-sm rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                      </svg>                                      
                                <input type="text" placeholder="変更" id="term" name="term" value={word.term} class="pb-1 font-semibold font-sans text-xl">
                                </label>
                            </div>
                            <div class="px-2 flex w-full relative bg-white">
                                <label class="input input-ghost input-sm rounded-xl max-w-9/10 font-sans text-sm  mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                                      </svg>                                      
                                <input type="text" id="meaning" name="meaning" value={word.meaning}>
                                </label>
                                <button type="submit" class="btn btn-base rounded-full my-auto btn-sm text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                      </svg>                                      
                                </button>
                                <input type="hidden" id="id" name="id" value={word.id}>
                        </div>
                        </form>
                        {/if}

                        {#if updatings2[id]}
                        <div out:fade={{delay:1000}} class={{"absolute inset-0 skeleton z-5":true}}>
                        </div>
                        {/if}
                        <!--実際のコンテンツ-->
                        <div style={parent_style} class="w-full">
                            <p use:fit={{min_size:10, max_size:22}} class="font-sans font-semibold pl-5 pt-4 pb-1 text-2xl">{word.term}</p>
                        </div>
                        <p class="text-gray-500 text-right text-sm font-sans p-1 pr-2">{word.meaning}</p>
                    </div>  
                    <div class="flex flex-col {id%2==0? "bg-indigo-100":"bg-teal-100"}  rounded-r-xl border-indigo-300 justify-center items-center w-1/8 z-2">
                        <button  class="h-full aspect-ration-1/1" onclick={() => dialogs[id]?.showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>                                               
                        </button>
                        <button class="h-full aspect-ratio-1/1" onclick={() => {updatings[id]=!updatings[id]}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
                              </svg>
                                                          
                        </button>
                    </div>
                {/if}     
                </div>
            </div>
            </IntersectionObserver>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
    
    <dialog bind:this={dialog} id="my_modal2" class="modal modal-bottom md:modal-middle">
        <div class="modal-box flex flex-col items-center bg-slate-100 w-full md:w-1/2  max-w-none max-h-4/5 overflow-auto relative">
            <form method="post" use:enhance={()=>{
                dialog?.close();
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
