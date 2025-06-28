<script lang="ts">

    import UserWordBooks from "./UserWordBooks.svelte";
    import Add from "./Add.svelte";
    import Home from "./Home.svelte"
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
    let quests = $state(data.loaddata.quests.data)
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
{:else if currentView=="home"}
<Home wordbooks={data.loaddata.user_wordbooks.data ?? []} />
{/if}

<div class="dock z-5">
  <button onclick={() => currentView = "home"} class={{"dock-active text-indigo-900":currentView=="home","text-gray-500":currentView!="home"}} >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>      
  </button>
    <button onclick={() => currentView = "user"} class={{"dock-active text-indigo-900":currentView=="user","text-gray-500":currentView!="user"}} >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
      
        
    </button>
    
</div>