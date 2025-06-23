<script lang="ts">

    import UserWordBooks from "./UserWordBooks.svelte";
    import type { PageProps } from "./$types";
    import {fly} from "svelte/transition";
    import LibraryWordBooks from "./LibraryWordBooks.svelte";
    import {navigating} from "$app/state";
    interface Wordbook {
    wb_name: any;
    id: any;
}
    let { data }: PageProps = $props();
    let user_or_library = data.user_or_library;
    let currentView: string = $state(user_or_library);
</script>
{#if navigating.to || navigating.from}
<div class="w-full h-screen bg-slate-100 flex justify-center items-center">
  <span class="loading loading-xl loading-bars text-indigo-500">

  </span>
</div>
{/if}
{#if currentView == "user"}
<UserWordBooks wordbooks={data.loaddata.user_wordbooks.data ?? []}/>
{:else if currentView == "library"}
<LibraryWordBooks wordbooks={data.loaddata.library_wordbooks.data?? []}/>
{/if}

<div class="dock">
    <button onclick={() => currentView = "user"} class={{"dock-active text-indigo-900":currentView=="user","text-gray-500":currentView=="library"}} >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>      
    </button>
    <button onclick={() => currentView = "library"} class={{"dock-active text-indigo-900":currentView=="library","text-gray-500":currentView=="user"}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>      
    </button>
    <a href="./library/quests/1" class={{"dock-active text-indigo-900":currentView=="library","text-gray-500":currentView=="user"}}>
      quest
    </a>
</div>