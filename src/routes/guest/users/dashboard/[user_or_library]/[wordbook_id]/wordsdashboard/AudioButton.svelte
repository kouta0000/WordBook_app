
<script lang="ts">
    let {word, language} = $props();
    let isChecked:boolean = $state(false);
    let audio:HTMLAudioElement | undefined = $state();
    import { onDestroy } from "svelte";
    const fetchAudio = async () => {
        if (!audio) {
        const res = await fetch(`/api/speak?language=${language}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({text: word})
        });
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audio = new Audio(audioUrl);
    }
        await audio.play();
        await new Promise<void>((resolve) => {
            if(audio) audio.onended = () => resolve();
        });
        isChecked = false;
    }
    onDestroy(() => {
        if (audio) {
            audio.pause();
            if (audio.src.startsWith('blob:')) {
                URL.revokeObjectURL(audio.src);
            }
            audio = undefined;
        }
    });
</script>
<div class="w-full aspect-square my-auto p-2">
    <label class="swap">
        <!-- this hidden checkbox controls the state -->
        <input bind:checked={isChecked} disabled={isChecked} onchange={fetchAudio} type="checkbox" />
      
        <!-- volume on icon -->
        <svg
          class="swap-off fill-current size-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
        </svg>
      
        <!-- volume off icon -->
        <svg
          class="swap-on fill-current size-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
        </svg>
      </label>
</div>