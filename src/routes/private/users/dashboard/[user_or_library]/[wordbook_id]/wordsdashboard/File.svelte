<script lang="ts">
    import {scale, fade} from "svelte/transition";
    import EasyCamera from "@cloudparker/easy-camera-svelte";
    import XLSX from 'xlsx';
    import type { ChangeEventHandler } from "svelte/elements";
    import Papa from 'papaparse';
    import {enhance} from "$app/forms";
    let {wordbook_id, onend}:{wordbook_id:string, onend:()=>void} = $props();
    let currentView = $state("");
    let resIndex:number = $state(0);
    let scroll:HTMLDivElement | undefined = $state();
    let step = $state(1);
    let generation_step=$state(1);
    let inputedWords:any[] = $state([]);
    const parseFile =  async (file:File | undefined) => {
        if (file) {
            if(file.name.endsWith('.csv')) {
                const buffer = await file.text();
                const config = {
                    header: false, // ヘッダーを無視
                    skipEmptyLines: true, // 空行をスキップ
                }
                const data = Papa.parse(buffer, config).data;
                inputedWords=data;
            } else {
                const buffer = await file.arrayBuffer();
                const workbook = XLSX.read(buffer);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(worksheet,{header:1});
                inputedWords = data;
            }
    };
} 
    const handleSheet = async (e:Event) => {
        const target = e?.target as HTMLInputElement;
        const file = target?.files?.[0];
         await parseFile(file);
    }
    const handlePaste = async (e:Event) => {
        const target = e?.target as HTMLTextAreaElement;
        const text = target.value;
        const config = {
                    header: false, // ヘッダーを無視
                    skipEmptyLines: true, // 空行をスキップ
                }
                const data = Papa.parse(text, config).data;
                inputedWords=data;
    }
    </script>
    <div transition:scale class="flex flex-col items-center absolute top-15 bottom-15 bg-slate-100 w-full p-10 z-2">
        {#if step==1}
        <div class="w-full lg:w-4/5 h-full flex flex-col lg:flex-row items-center gap-10">
        <div class="bg-indigo-200 rounded-xl overflow-y-auto h-9/10 w-full p-2 pt-4">
            <div class="flex flex-col gap-2">
                {#each inputedWords as w}
                <div class="w-full rounded-xl flex gap-1 items-center">
                <div class="text-center w-1/2 bg-white rounded-xl p-2">
                    {w[0]}
                </div>
                <div class="text-center w-1/2 bg-white rounded-xl p-2">
                    {w[1]}
                </div>
                </div>
                {/each}
            </div>
        </div>
        <div class="flex flex-col gap-1">
        <input accept=".xlsx, .xls, .csv" onchange={handleSheet} type="file" class="file-input file-input-primary rounded-xl" />
        <p class="text-center">or</p>
        <textarea oninput={handlePaste} class="textarea max-h-15" placeholder="paste csv"></textarea>
        <form action="?/createWord" method="post" use:enhance={() => {
            step = 2;
            return async({update}) => {
                update();
                step=3;
            }
        }} class="flex justify-end w-full gap-2 items-center">
        {#each inputedWords as w}
        
        <input type="hidden" name="term" value={w[0]} />
        <input type="hidden" name="meaning" value={w[1]} />
        
        {/each}
        <input type="hidden" name="wordbook_id" value={wordbook_id}/>
        <button class="btn btn-primary btn-active rounded-xl grow mt-1">
            追加
        </button>
        <button onclick={()=>onend()} type="button" class="p-1 rounded-xl bg-indigo-200 self-end text-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
        </button>
        </form>
        </div>
        </div>
        {:else if step==2}
        <div class="text-center self-center mt-50">
            追加中<span class="loading loading-spinner"></span>
        </div>
        {:else if step==3}
        <div class="text-center self-center mt-50">
            <span class="">追加完了！</span>
            <span onclick={()=>step=1} class="btn btn-base p-3">最初に戻る</span>
        </div>
        {/if}
    </div>
    
    
    