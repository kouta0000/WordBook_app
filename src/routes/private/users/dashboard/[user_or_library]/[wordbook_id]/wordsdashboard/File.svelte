<script lang="ts">
    import {scale, fade} from "svelte/transition";
    import EasyCamera from "@cloudparker/easy-camera-svelte";
    let currentView = $state("");
    let resIndex:number = $state(0);
    let scroll:HTMLDivElement | undefined = $state();
    let generation_step=$state(1);
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
    <div transition:scale class="flex flex-col items-center absolute top-15 bottom-15 bg-slate-100 w-full p-10 z-2">
        <div class="w-full lg:w-2/5 h-full flex flex-col items-center gap-10">
        <div class="bg-indigo-200 rounded-xl overflow-y-auto h-9/10 w-full p-2 pt-4">
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
        <input type="file" class="file-input file-input-primary rounded-xl" />
        <div class="flex justify-end w-full gap-2 items-center">
        <button class="btn btn-primary btn-active rounded-xl grow">
            送信
        </button>
        <button class="p-1 rounded-xl bg-indigo-200 self-end text-indigo-800" onclick={()=>currentView=""}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
        </button>
        </div>
        </div>
    </div>
    
    
    