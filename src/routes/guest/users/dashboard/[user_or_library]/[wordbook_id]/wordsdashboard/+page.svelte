<script lang="ts">
    import Memo from "./Memo.svelte";
    import type { PageProps } from "./$types";
    import {enhance} from "$app/forms";
    import {fly} from "svelte/transition";
    import Edit from "./Edit.svelte";
    import TestSelect from "./TestSelect.svelte";
     
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
<TestSelect/>
{/if}

<div class="dock dock-lg lg:dock-md z-20">
    {#if user_or_library == "user"}
    <button onclick={()=> currentView = "edit"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-gray-900":currentView =="edit",
        "text-gray-500":currentView=="memo" || currentView=="test" || currentView == "test2"
        }}>
        <span class="dock-label">ホーム</span>
    </button>
    {/if}
    <button onclick={()=> currentView = "memo"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-gray-900":currentView=="memo",
        "text-gray-500": currentView=="test" || currentView == "edit" || currentView == "test2"
        }}>
        <span class="dock-label">覚える</span>
    </button>
    
    <button onclick={() => currentView = "test"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-gray-900":currentView=="test",
        "text-gray-500": currentView=="memo" || currentView == "edit" || currentView == "test2"
        }}>
        <span class="dock-label">テスト</span>
    </button>
</div>

