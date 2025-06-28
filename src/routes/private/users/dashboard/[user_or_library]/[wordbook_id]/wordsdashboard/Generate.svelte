<script lang="ts">
    import {scale, fade} from "svelte/transition";
    import EasyCamera from "@cloudparker/easy-camera-svelte";
    let currentView = $state("");
    let resIndex:number = $state(0);
    let scroll:HTMLDivElement | undefined = $state();
    let step=$state(1);
    let messages:{q:string, r:string}[] =$state([
        {q:"どんなテーマが好き？",r:""},
        {q:"単語のレベルはどのくらいが良い？",r:""},
        {q:"どんな目的で勉強してる？",r:""},
        {q:"単語は何個作って欲しい？",r:""},
        {q:"答えてくれありがとう！",r:""}
    ]);
    let message_display:{q:string, r:string}[] = $state([messages[0]]);
    const res_choices:string[][] = [
        ["科学","美術","文学","時事","日常"],
        ["入門","初級","中級","上級","無制限"],
        ["試験","趣味","大学","学術"],
        ["10","20","30","40","50"],
        [],
    ]
        
    </script>
<div transition:scale class="flex flex-col items-center  absolute top-15 bottom-15 bg-slate-100 w-full p-7 z-2">
    <div class="w-full lg:w-2/5 h-full flex flex-col items-center gap-10">
    {#if step == 1}
    <div bind:this={scroll} class="w-full flex flex-col gap-6 bg-teal-50 rounded-xl p-5 py-8 h-2/3 overflow-y-auto">
        {#each message_display as m}
        <div transition:fade={{delay:1000}} class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  src="/images/kurage.jpg"
                />
              </div>
            </div>
            <div class="chat-bubble">{m?.q}</div>
        </div>
        {#if m?.r}
        <div transition:fade class="chat chat-end">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  src="/images/umiushi.jpg"
                />
              </div>
            </div>
            <div class="chat-bubble">{m.r}</div>
        </div>
        {/if}
        {/each}
        </div>
        <div class="w-full rounded-xl flex justify-center gap-2 items-center font-bold bg-white p-4">
            {#each res_choices[resIndex] as r, i (i)}
            <button onclick={()=>{resIndex++;messages[resIndex-1].r=r; setTimeout(()=> {if(scroll) scroll.scrollTop = scroll.scrollHeight},100);if(resIndex<res_choices.length){message_display.push(messages[resIndex]);setTimeout(()=> {if(scroll) scroll.scrollTop = scroll.scrollHeight},100);}}} class="btn btn-primary btn-outline rounded-xl">
                {r}
            </button>
            {/each}
        </div>
        <div class="flex justify-end w-full gap-2 items-center">
        <button class="btn btn-primary btn-active rounded-xl grow">
            生成
        </button>
        <button class="p-1 rounded-xl bg-indigo-200 self-end text-indigo-800" onclick={()=>{currentView="";message_display=[messages[0]];resIndex=0;messages=[
            {q:"どんなテーマが好き？",r:""},
            {q:"単語のレベルはどのくらいが良い？",r:""},
            {q:"どんな目的で勉強してる？",r:""},
            {q:"単語は何個作って欲しい？",r:""},
            {q:"答えてくれありがとう！",r:""}
        ]}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
        </button>
        </div>
        
    {:else if step==2}
    <div class="loading loading-spinner"></div>
    {:else if step==3}
    <div class="bg-indigo-200 rounded-xl overflow-y-auto h-1/2 w-full lg:w-2/5 p-2 pt-4">
        <div class="flex flex-col gap-2">
            {#each Array(30).fill({term:"aaaaa", meaning:"nnnnn"}) as t}
            <div class="w-full rounded-xl flex gap-1 items-center">
            <div class="text-center w-1/2 bg-white rounded-xl p-2">
                {t.term}
            </div>
            <div class="text-center w-1/2 bg-white rounded-xl p-2">
                {t.meaning}
            </div>
            </div>
            {/each}
        </div>
    </div>
    {/if}
    </div>
</div>