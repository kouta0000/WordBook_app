<script lang="ts">
    import LibraryWordBooks from "./LibraryWordBooks.svelte";
    import UserWordBooks from "./UserWordBooks.svelte";
    import type { PageProps } from "./$types";
    interface Wordbook {
    wb_name: any;
    id: any;
}
    let { data }: PageProps = $props();
    let library_wordbooks: Array<Wordbook> | null = $state(data.loaddata.library_wordbooks.data);
    let user_wordbooks: Array<Wordbook> | null = $state(data.loaddata.user_wordbooks.data);
    let currentView: string = $state("user_wordbooks");
</script>
{#if currentView == "user_wordbooks"}
<UserWordBooks wordbooks={user_wordbooks ?? []} />
{:else if currentView == "library_wordbooks"}
<LibraryWordBooks wordbooks={library_wordbooks ?? []} />
{/if}
<div id="wb_foot_buttons" class="w-full h-15 md:h-20 fixed absolute bottom-0 flex flex-row gap-3 justify-center bg-white">

<button onclick={() => currentView = "user_wordbooks"} class="btn btn-ghost md:hover:bg-base-400 active:bg-base-400 h-15 md:h-20 flex-grow basis-0 md:scale-105" >
    {#if currentView == "user_wordbooks"}
    <svg class="h-full" viewBox="0 0 400 400">
        <path class="fill-sky-300" d="M 150 150 V 225 L 200 250 V 175 L 150 150" />
        <path class="fill-sky-300" d="M 200 175 V 250 L 250 225 V 150 L 200 175" />
        <path class="stroke-white" stroke-width="5" d="M 210 190 L 240 175"/>
        <path class="stroke-white" stroke-width="5" d="M 210 210 L 234 198" />
        <path class="stroke-white" stroke-width="5" d="M 210 230 L 230 220" />
        <path class="stroke-white" stroke-width="5" d="M 190 190 L 160 175"/>
        <path class="stroke-white" stroke-width="5" d="M 184 207 L 160 195" />
        <path class="stroke-white" stroke-width="5" d="M 190 230 L 160 215" />
        <text x="108" y="350" class="fill-sky-300 font-bold" font-size="60">単語帳</text>
    </svg>
    {:else if currentView == "library_wordbooks"}
    <svg class="h-full" viewBox="0 0 400 400">
        <path class="fill-gray-500" d="M 150 150 V 225 L 200 250 V 175 L 150 150" />
        <path class="fill-gray-500" d="M 200 175 V 250 L 250 225 V 150 L 200 175" />
        <path class="stroke-white" stroke-width="5" d="M 210 190 L 240 175"/>
        <path class="stroke-white" stroke-width="5" d="M 210 210 L 234 198" />
        <path class="stroke-white" stroke-width="5" d="M 210 230 L 230 220" />
        <path class="stroke-white" stroke-width="5" d="M 190 190 L 160 175"/>
        <path class="stroke-white" stroke-width="5" d="M 184 207 L 160 195" />
        <path class="stroke-white" stroke-width="5" d="M 190 230 L 160 215" />
        <text x="108" y="350" class="fill-gray-500" font-size="60">単語帳</text>
    </svg>
    {/if}
</button>
{#if currentView == "user_wordbooks"}
<div class="h-15 md:h-20 flex-grow basis-0">
    <svg class="h-full scale-150 active:scale-125 mx-auto" viewBox="0 0 40 40" onclick={()=>document.getElementById('my_modal').showModal()} >
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
{:else if currentView == "library_wordbooks"}
<div class="h-15 md:h-20 flex-grow basis-0">
    <svg class="h-full scale-150 mx-auto" viewBox="0 0 40 40">
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
<button onclick={() => currentView = "library_wordbooks"} class="btn btn-ghost md:hover:bg-base-400 active:bg-base-400 h-15 md:h-20 flex-grow basis-0 md:scale-105">
    {#if currentView == "user_wordbooks"}
    <svg class="h-full" viewBox="0 0 40 40" fill="none">
        <path d="M 15 15 H 24 A 1,1 0 0 1 24,18 H 15 A 3,3 0 0 0 15 15" stroke-linecap="round" class="stroke-gray-500" />
        <line x1="17" y1="16" x2="23" y2="16" class="stroke-gray-500" stroke-width="0.25" />
        <line x1="17" y1="17" x2="21" y2="17" class="stroke-gray-500" stroke-width="0.25" />
        <path d="M 15 18 H 24 A 1,1 0 0 1 24,21 H 15 A 3,3 0 0 0 15,18" stroke-linecap="round" class="stroke-gray-500" />
        <line x1="17" y1="19" x2="23" y2="19" class="stroke-gray-500" stroke-width="0.3" />
        <line x1="17" y1="20" x2="21" y2="20" class="stroke-gray-500" stroke-width="0.25" />
        <path d="M 15 21 H 24 A 1,1 0 0 1 24,24 H 15 A 3,3 0 0 0 15,21" stroke-linecap="round" class="stroke-gray-500" />
        <line x1="17" y1="22" x2="23" y2="22" class="stroke-gray-500" stroke-width="0.25" />
        <line x1="17" y1="23" x2="21" y2="23" class="stroke-gray-500" stroke-width="0.25" />
        <text x="6" y="35" class="fill-gray-500" font-size="6">ライブラリー</text>
    </svg>
    {:else if currentView == "library_wordbooks"}
    <svg class="h-full" viewBox="0 0 40 40" fill="none">
        <path d="M 15 15 H 24 A 1,1 0 0 1 24,18 H 15 A 3,3 0 0 0 15 15" stroke-linecap="round" class="stroke-emerald-500" />
        <line x1="17" y1="16" x2="23" y2="16" class="stroke-emerald-500" stroke-width="0.25" />
        <line x1="17" y1="17" x2="21" y2="17" class="stroke-emerald-500" stroke-width="0.25" />
        <path d="M 15 18 H 24 A 1,1 0 0 1 24,21 H 15 A 3,3 0 0 0 15,18" stroke-linecap="round" class="stroke-emerald-500" />
        <line x1="17" y1="19" x2="23" y2="19" class="stroke-emerald-500" stroke-width="0.3" />
        <line x1="17" y1="20" x2="21" y2="20" class="stroke-emerald-500" stroke-width="0.25" />
        <path d="M 15 21 H 24 A 1,1 0 0 1 24,24 H 15 A 3,3 0 0 0 15,21" stroke-linecap="round" class="stroke-emerald-500" />
        <line x1="17" y1="22" x2="23" y2="22" class="stroke-emerald-500" stroke-width="0.25" />
        <line x1="17" y1="23" x2="21" y2="23" class="stroke-emerald-500" stroke-width="0.25" />
        <text x="6" y="35" class="fill-emerald-500 font-bold" font-size="6">ライブラリー</text>
    </svg>
    {/if}
</button>
</div>