<script lang="ts">
    import Memo from "./Memo.svelte";
    import Add from "./Add.svelte"
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
     let currentView: string = $state("memo");
     const wordbook_id = data.loaddata.wordbook_id; 
     
</script>
{#if navigating.to}
<div class="w-full h-screen bg-slate-100 flex justify-center items-center">
  <span class="loading loading-xl loading-bars text-indigo-500">
  </span>
</div>
{/if}
{#if currentView == "memo"}
<Memo wordbook_id={wordbook_id} words={data.loaddata.words.data} wb_name={wb_name} language={language}/> 
{:else if currentView == "test"}
<TestSelect/>
{:else if currentView == "add"}
<Add wordbook_id={wordbook_id} language={language}/>
{/if}

<div class="dock z-20">
    <button onclick={()=> currentView = "memo"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-indigo-900":currentView=="memo",
        "text-gray-500": currentView=="test" || currentView == "edit" 
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>        
    </button>
    
    <button onclick={() => currentView = "test"} class={{
        "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
        "dock-active text-indigo-900":currentView=="test",
        "text-gray-500": currentView=="memo" || currentView == "edit" 
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="1.5" fill="none" />
        <polyline
          points="7,12 10,15 17,8"
          stroke="currentColor"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button onclick={() => currentView = "add"} class={{
      "btn btn-ghost font-bold h-full w-1/3 grow-1 basis-0":true,
      "dock-active text-indigo-900":currentView=="add",
      "text-gray-500":currentView!="add"}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
      </svg>
    </button>
</div>

