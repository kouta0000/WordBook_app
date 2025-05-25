<script lang="ts">
    import Memo from "./Memo.svelte";
    import Test from "./Test.svelte";
    import type { PageProps } from "./$types";
    import {enhance} from "$app/forms";
    import {fly} from "svelte/transition";
     
     let { data, form }: PageProps = $props();
     let words = $state(data.loaddata.words.data);
     let user_or_library = $state(data.loaddata.user_or_library);
     const wordbook_id: string = data.loaddata.wordbook_id;
     const wb_name = data.loaddata.wb_name.data?.[0].wb_name;
     let currentView: string = $state("memo");
     let index:number = $state(1);
     let wordidstoadd: Array<number> = $state([0]);
     let dialog: HTMLDialogElement | undefined = $state();
</script>

{#if currentView == "memo"}
<Memo words={data.loaddata.words.data} user_or_library={user_or_library} wb_name={wb_name}/>  
{:else if currentView == "test"}
<Test wordslist={words} user_or_library={user_or_library} />
{/if}

<div class="w-full h-15 md:h-20 bg-white fixed absolute bottom-0 flex flex-row justify-center gap-2 z-20">
    
    <button onclick={()=> currentView = "memo"} class={{
        "btn btn-ghost font-bold h-15 md:h-20 flex-grow basis-0":true,
        "text-sky-500":user_or_library=="user" && currentView=="memo",
        "text-emerald-500":user_or_library=="library" && currentView=="memo",
        "text-gray-500": currentView=="test"
        }}>覚える</button>

    
    {#if user_or_library == "user" && currentView == "memo"}
    <div class="h-15 md:h-20 flex-grow basis-0">
        <svg class="h-full scale-150 active:scale-125 mx-auto" viewBox="0 0 40 40" onclick={()=>document.getElementById('my_modal2').showModal()} >
            <defs>
            <filter id='f' color-interpolation-filters="sRGB">
            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-opacity="0.5"/>
            </filter>
            </defs>
            <circle class="fill-sky-400" cx="20" cy="20" r="10" filter="url(#f)" />
            <line x1="17" y1="20" x2="23" y2="20" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="20" y1="17" x2="20" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
        </svg>
    </div>
    {:else if user_or_library == "user" && currentView == "test"}
    <div class="h-15 md:h-20 flex-grow basis-0">
        <svg class="h-full scale-150  mx-auto" viewBox="0 0 40 40" >
            <defs>
            <filter id='f' color-interpolation-filters="sRGB">
            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-opacity="0.5"/>
            </filter>
            </defs>
            <circle class="fill-gray-400" cx="20" cy="20" r="10" filter="url(#f)" />
            <line x1="17" y1="20" x2="23" y2="20" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="20" y1="17" x2="20" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
        </svg>
    </div>
    {/if}

    <button onclick={() => currentView = "test"} class="btn btn-ghost h-15 md:h-20 flex-grow basis-0">
        <svg class="h-full" viewBox="0 0 40 40" fill="none">
            <rect x="15" y="15" width="10" height="10" class={{
                "fill-sky-500":user_or_library=="user" && currentView=="test",
                "fill-emerald-500":user_or_library=="library" && currentView=="test",
                "fill-gray-500": currentView=="memo"
                }} />
            <line x1="17" y1="20" x2="19" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="19" y1="23" x2="23" y2="17" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <text x="12" y="35" class="fill-gray-500" font-size="6">テスト</text>
        </svg>
    </button>
</div>


<dialog bind:this={dialog} id="my_modal2" class="modal modal-bottom md:modal-middle">
    <div class="modal-box flex flex-col items-center bg-stone-50 w-full md:w-1/2 lg:w-3/10 max-w-none max-h-4/5 overflow-auto">
        <form method="post" use:enhance action="?/createWord" class="w-full flex flex-col items-center gap-4">
            <h1>単語を追加しよう!</h1>
            <button type="button" class="w-9/10 btn btn-soft shadow-lg" onclick={() => wordidstoadd.push(index++)}>ふやす</button>
            <button type="button" class="w-9/10 btn btn-soft shadow-lg" onclick={() => wordidstoadd.pop()}>へらす</button>
            {#each wordidstoadd as wids,i (wids)}
            <div in:fly={{duration:200, y:20}} out:fly={{duration:200, y:-20}} class="bg-white w-full gap-2 p-2 border-1 border-stone-200 shadow-lg flex flex-col justify-center items-center">
            <input type="text" id="term" name="term" placeholder="単語" class="input input-neutral w-9/10" required>
            <input type="text" id="meaning" name="meaning" placeholder="意味" class="input input-neutral w-9/10" required>
            <input type="hidden" id="wordbook_id" name="wordbook_id" value={wordbook_id} class="invisible" required>
            </div>
            {/each}
            
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
