<script lang="ts">
import {scale, fade} from "svelte/transition";
import EasyCamera from "@cloudparker/easy-camera-svelte";
import File from "./File.svelte";
import Generate from "./Generate.svelte";
import Image from "./Image.svelte";
let {language, wordbook_id}:{language:string, wordbook_id:string}=$props();
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
<!--ファイル追加-->
{#if currentView=="file"}
<File wordbook_id={wordbook_id} onend={()=>currentView=""}/>
<!--画像追加-->
{:else if currentView=="image"}
<Image wordbook_id={wordbook_id} onend={()=>currentView=""} language={language} />

<!--生成追加-->
{:else if currentView=="generate"}
<Generate/>

{/if}
    <div class="w-full h-screen mt-15 flex flex-col items-center relative">
        
        <h1 class="text-3xl mb-10 mt-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">追加</h1>
        
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            <div onclick={()=>currentView="file"} class="bg-indigo-200 w-9/10 rounded-xl p-5 cursor-pointer">
                <p class="text-center text-indigo-800 text-lg mb-3">ファイル・テキスト追加</p>
                <div class="flex gap-2 items-start text-xs text-indigo-800/90">
                    <span class="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                      </svg>
                      </span>
                    <span>ファイルとテキストペーストで追加できます。</span>
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
                <span>画像からテキストを抽出します。</span>
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
                    <span>既存の追加単語から傾向を分析し自動で単語を生成します。</span>
                    </div>
            </div>
        </div>
        <div class="w-full h-50"></div>
    </div>
    
