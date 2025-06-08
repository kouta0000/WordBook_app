<script lang="ts">

    import UserWordBooks from "./UserWordBooks.svelte";
    import type { PageProps } from "./$types";
    import {fly} from "svelte/transition";
    import LibraryWordBooks from "./LibraryWordBooks.svelte";
    interface Wordbook {
    wb_name: any;
    id: any;
}
    let { data }: PageProps = $props();
    let user_or_library = data.user_or_library;
    let currentView: string = $state(user_or_library);
</script>

<LibraryWordBooks wordbooks={data.loaddata.library_wordbooks.data?? []}/>


<div class="dock">
    <button onclick={() => currentView = "library"} class={{"dock-active text-gray-900":currentView=="library","text-gray-500":currentView=="user"}}>
        <span class="dock-label">ライブラリー</span>
    </button>
</div>