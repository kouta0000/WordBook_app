<script lang="ts">
    import Memo from "./Memo.svelte";
    import Test from "./Test.svelte";
    import Test2 from "./Test2.svelte";
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
{:else if currentView=="test2"}
<Test2 wordslist={words} user_or_library={user_or_library} />
{/if}

<div class="w-full h-12 md:h-15 bg-white fixed absolute bottom-0 flex flex-row justify-center gap-2 z-20">
    {#if user_or_library == "user"}
    <button onclick={()=> currentView = "edit"} class={{
        "btn btn-ghost font-bold h-full grow-1 basis-0":true,
        "text-sky-500":currentView =="edit",
        "text-gray-500":currentView=="memo" || currentView=="test" || currentView == "test2"
        }}>ホーム</button>
    {/if}
    <button onclick={()=> currentView = "memo"} class={{
        "btn btn-ghost font-bold h-full grow-1 basis-0":true,
        "text-sky-500":currentView=="memo",
        "text-gray-500": currentView=="test" || currentView == "edit" || currentView == "test2"
        }}>覚える</button>
    
    <button onclick={() => currentView = "test"}　class={{
        "btn btn-ghost font-bold h-full 0 grow-1 basis-0":true,
        "text-sky-500":currentView=="test",
        "text-gray-500": currentView=="memo" || currentView == "edit" || currentView == "test2"
        }}>4択問題</button>

    <button onclick={() => currentView = "test2"} class={{
        "btn btn-ghost font-bold h-full grow-1 basis-0":true,
        "text-sky-500":currentView=="test2",
        "text-gray-500": currentView=="test" || currentView == "edit" || currentView == "memo"
        }}>つづり問題</button>
</div>

