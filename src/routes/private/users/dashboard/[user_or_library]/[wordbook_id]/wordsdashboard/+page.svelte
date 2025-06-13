<script lang="ts">
    import Memo from "./Memo.svelte";
    import type { PageProps } from "./$types";
    import {enhance} from "$app/forms";
    import {fly} from "svelte/transition";
    import Edit from "./Edit.svelte";
    import TestSelect from "./TestSelect.svelte";
    import {navigating} from "$app/state";
     
     let { data, form }: PageProps = $props();
     let words = $state(data.loaddata.words.data);
     let user_or_library = $state(data.loaddata.user_or_library);
     
     const wb_name = data.loaddata.wb.data?.[0].wb_name;
     const language = data.loaddata.wb.data?.[0].language;
     let currentView: string = $state(user_or_library=="user"? "edit": "memo");
     const wordbook_id = data.loaddata.wordbook_id; 
     
</script>
{#if navigating.to}
<div class="w-full h-screen bg-slate-100 flex justify-center items-center">
  <span class="loading loading-xl loading-bars text-indigo-500">
  </span>
</div>
{/if}
{#if currentView == "memo"}
<Memo words={data.loaddata.words.data} user_or_library={user_or_library} wb_name={wb_name} language={language}/> 
{:else if currentView == "edit"}
<Edit words={data.loaddata.words.data} wb_name={wb_name} wordbook_id={wordbook_id} user_or_library={user_or_library}/>
{:else if currentView == "test"}
<TestSelect/>
{/if}

<div class="dock z-20">
    {#if user_or_library == "user"}
    <button onclick={()=> currentView = "edit"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-gray-900":currentView =="edit",
        "text-gray-500":currentView=="memo" || currentView=="test" || currentView == "test2"
        }}>
        <svg
        class="size-6 text-gray-700"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="2" />
        <circle cx="12" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="12" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    </button>
    {/if}
    <button onclick={()=> currentView = "memo"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-gray-900":currentView=="memo",
        "text-gray-500": currentView=="test" || currentView == "edit" || currentView == "test2"
        }}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="size-6 text-gray-700"
      >
        <line x1="3" y1="20" x2="21" y2="20" stroke="currentColor" stroke-width="1.5" />
        
        <rect x="5" y="14" width="4" height="6" fill="currentColor" rx="0.5" ry="0.5" />
        
        <rect x="10" y="10" width="4" height="10" fill="currentColor" rx="0.5" ry="0.5" />
        <rect x="15" y="6" width="4" height="14" fill="currentColor" rx="0.5" ry="0.5" />
      </svg>
    </button>
    
    <button onclick={() => currentView = "test"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-gray-900":currentView=="test",
        "text-gray-500": currentView=="memo" || currentView == "edit" || currentView == "test2"
        }}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="size-6 text-gray-700"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none" />
        <polyline
          points="7,12 10,15 17,8"
          stroke="currentColor"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
</div>

