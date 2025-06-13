<script lang="ts">
    import Test from "./Test.svelte";
    import Test2 from "./Test2.svelte";
    import type { PageProps } from "./$types";
    import {navigating} from "$app/state";
     
     let { data, form }: PageProps = $props();
     let words = $state(data.loaddata.words.data);
     const wb_name = data.loaddata.wb_name.data?.[0].wb_name;
     let user_or_library = $state(data.loaddata.user_or_library);
     const test = data.loaddata.test;
</script>
{#if navigating.to}
<div class="w-full h-screen bg-slate-100 flex justify-center items-center">
  <span class="loading loading-xl loading-bars text-indigo-500">
  </span>
</div>
{/if}
{#if test == "4taku"}
<Test wordslist={words} wb_name={wb_name} user_or_library={user_or_library} />
{:else if test =="input"}
<Test2 wordslist={words} wb_name={wb_name} user_or_library={user_or_library} />
{/if}