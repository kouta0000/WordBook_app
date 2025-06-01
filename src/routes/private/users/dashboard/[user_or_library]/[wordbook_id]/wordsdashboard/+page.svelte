<script lang="ts">
    import Memo from "./Memo.svelte";
    import Test from "./Test.svelte";
    import type { PageProps } from "./$types";
    import {enhance} from "$app/forms";
    import {fly} from "svelte/transition";
    import Edit from "./Edit.svelte";
     
     let { data, form }: PageProps = $props();
     let words = $state(data.loaddata.words.data);
     let user_or_library = $state(data.loaddata.user_or_library);
     
     const wb_name = data.loaddata.wb_name.data?.[0].wb_name;
     let currentView: string = $state(user_or_library=="user"? "edit": "memo");
     const wordbook_id = data.loaddata.wordbook_id; 
     
</script>

{#if currentView == "memo"}
<Memo words={data.loaddata.words.data} user_or_library={user_or_library} wb_name={wb_name}/> 
{:else if currentView == "edit"}
<Edit words={data.loaddata.words.data} wb_name={wb_name} wordbook_id={wordbook_id} user_or_library={user_or_library}/>
{:else if currentView == "test"}
<Test wordslist={words} user_or_library={user_or_library} />
{/if}

<div class="w-full h-15 md:h-20 bg-white fixed absolute bottom-0 flex flex-row justify-center gap-2 z-20">
    {#if user_or_library == "user"}
    <button onclick={()=> currentView = "edit"} class={{
        "btn btn-ghost font-bold h-15 md:h-20 grow-1 basis-0":true,
        "text-sky-500":currentView =="edit",
        "text-gray-500":currentView=="memo" || currentView=="test"
        }}>ホーム</button>
    {/if}
    <button onclick={()=> currentView = "memo"} class={{
        "btn btn-ghost font-bold h-15 md:h-20 grow-1 basis-0":true,
        "text-sky-500":currentView=="memo",
        "text-gray-500": currentView=="test" || currentView == "edit"
        }}>覚える</button>
    
    <button onclick={() => currentView = "test"} class="btn btn-ghost h-15 md:h-20 grow-1 basis-0">
        <svg class="h-full" viewBox="0 0 40 40" fill="none">
            <rect x="15" y="15" width="10" height="10" class={{
                "fill-sky-500":currentView=="test",
                "fill-gray-500": currentView=="memo" || currentView == "edit"
                }} />
            <line x1="17" y1="20" x2="19" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="19" y1="23" x2="23" y2="17" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <text x="12" y="35" class="fill-gray-500" font-size="6">テスト</text>
        </svg>
    </button>
</div>

