<script lang="ts">
import {scale, fade} from "svelte/transition";
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
{#if currentView=="file"}
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
{:else if currentView=="image"}
<div transition:scale class="flex flex-col items-center  absolute top-15 bottom-15 bg-slate-100 w-full p-10 z-2">
    <div class="w-full lg:w-2/5 h-full flex flex-col items-center gap-10">
    <div class="bg-indigo-200 rounded-xl overflow-y-auto h-9/10 w-full  p-2 pt-4">
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
    <button class="w-full btn btn-primary btn-active rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
          
    </button>
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



{:else if currentView=="generate"}

<div transition:scale class="flex flex-col items-center  absolute top-15 bottom-15 bg-slate-100 w-full p-7 z-2">
    <div class="w-full lg:w-2/5 h-full flex flex-col items-center gap-10">
    {#if generation_step == 1}
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
        
    {:else if generation_step==2}
    {:else if generation_step==3}
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
{/if}
    <div class="w-full h-screen mt-15 flex flex-col items-center relative">
        
        <h1 class="text-3xl mb-10 mt-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">追加</h1>
        
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            <div onclick={()=>currentView="file"} class="bg-indigo-200 w-9/10 rounded-xl p-5 cursor-pointer">
                <p class="text-center text-indigo-800 text-lg mb-3">CSV・エクセル追加</p>
                <div class="flex gap-2 items-start text-xs text-indigo-800/90">
                    <span class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                      </svg>
                      </span>
                    <span>ファイルから一気に追加できます。単語を1列に並べてください。意味は自動翻訳で生成されます。</span>
                    </div>
            </div>
            <div onclick={()=>currentView="image"} class="bg-indigo-200 w-9/10 rounded-xl p-5 cursoer-pointer">
                <p class="text-center text-indigo-900 text-lg mb-3 font-semibold">画像追加</p>
                <div class="flex gap-2 items-start text-xs text-indigo-800/90">
                <span class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                  </svg>
                  </span>
                <span>画像からテキストを抽出しランダムで数単語追加します。意味は自動翻訳で生成されます。</span>
                </div>
            </div>
            <div onclick={()=>currentView="generate"} class="bg-indigo-200 w-9/10 rounded-xl p-5 cursor-pointer">
                <p class="text-center text-indigo-800 text-lg mb-3">自動生成追加</p>
                <div class="flex gap-2 items-start text-xs text-indigo-800/90">
                    <span class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                      </svg>
                      </span>
                    <span>既存の追加単語から傾向を分析し自動で単語を生成します。意味は自動翻訳で生成されます。</span>
                    </div>
            </div>
        </div>
        <div class="w-full h-50"></div>
    </div>
    
