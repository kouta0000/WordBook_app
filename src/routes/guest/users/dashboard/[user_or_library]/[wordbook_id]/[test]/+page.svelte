<script lang="ts">
    import Test from "./Test.svelte";
    import Test2 from "./Test2.svelte";
    import type { PageProps } from "./$types";
   
     
     let { data, form }: PageProps = $props();
     let words = $state(data.loaddata.words.data);
     let user_or_library = $state(data.loaddata.user_or_library);
     const test = data.loaddata.test;
</script>
{#if test == "4taku"}
<Test wordslist={words} user_or_library={user_or_library} />
{:else if test =="tsuzuri"}
<Test2 wordslist={words} user_or_library={user_or_library} />
{/if}