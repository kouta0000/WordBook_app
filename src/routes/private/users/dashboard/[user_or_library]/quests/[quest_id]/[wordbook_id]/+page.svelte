<script lang="ts">
    import type {PageProps} from "./$types";
    import RandomTest from "./RandomTest.svelte";
    let {data}:PageProps = $props();
    const words = data.loaddata.words.data;
    const language = data.loaddata.language;
    const quest_id = data.loaddata.quest_id;
</script>
<RandomTest wordslist={words} language={language} quest_id={quest_id}/>