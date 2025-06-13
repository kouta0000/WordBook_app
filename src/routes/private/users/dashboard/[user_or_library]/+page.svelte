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
    <button onclick={() => currentView = "user"} class={{"dock-active text-gray-900":currentView=="user","text-gray-500":currentView=="library"}} >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="size-6 text-gray-700 fill-none"
      >
        <polygon points="4 11 12 3 20 11" stroke="currentColor" stroke-width="2" />
        <rect x="5" y="10" width="14" height="11" rx="1" ry="1" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>
    <button onclick={() => currentView = "library"} class={{"dock-active text-gray-900":currentView=="library","text-gray-500":currentView=="user"}}>
        <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="size-6 text-green-800"
  >
    <rect x="4" y="15" width="16" height="4" fill="currentColor" rx="1" ry="1" />
    <rect x="6" y="9.5" width="16" height="4" fill="currentColor" rx="1" ry="1" />
    <rect x="8" y="4" width="16" height="4" fill="currentColor" rx="1" ry="1" />
  </svg>
    </button>
</div>