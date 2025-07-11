<script lang="ts">
    import {fly, fade} from "svelte/transition";
    import {enhance} from "$app/forms";
    import LanguageRadioGroup from "./LanguageRadioGroup.svelte";
    import {onMount} from "svelte";
    
    interface Props {
        wordbooks: Wordbook[];
        level:any,
        xp:any,
        last_xp:any
    }
    interface Wordbook {
        wb_name: any;
        id: any;
        language: any;
        word_number:any;
    }
    
        let { wordbooks, level, xp, last_xp }: Props = $props();
        let isChecked: boolean = $state(false);
        let dialogs: Array<HTMLDialogElement> = $state([]);
        let dialogs2:Array<HTMLDialogElement> = $state([]);
        let forms:Array<HTMLFormElement> = $state([]);
        let sum =$state(0);
        for (const w of wordbooks) {
            sum+=w.word_number;
        }
        let deleting: boolean = $state(false);
        let updating: boolean = $state(false);
        let dialog: HTMLDialogElement | undefined = $state();
        let animaux = $state(["/images/tlex.png", "/images/ptella.png", "/images/raptor.png", "/images/tri.png","/images/presio.png", "/images/black.png"])
        
        const shuffleImages = (images:string[]) => {
            const length: number = images.length-1;
            for (let i = length; i > 0; i--) {
                const random: number = Math.floor(Math.random()*(i+1));
                [images[i], images[random]] = [images[random], images[i]];
            }
        }
    onMount(()=>{
        shuffleImages(animaux);
        })
    </script>
    <div class="w-full h-1/2 mt-15 inset-0 absolute fixed bg-red z-1">
        <img src="/images/sea.jpg" class="w-full">
    </div>    
    <div class="w-full min-h-screen pt-30 bg-white/80 flex flex-col gap-10 absolute z-3 top-0">
            
            <div class="p-10">
                <div class="size-full relative">
                    <h1 class="text-left text-3xl mb-10 font-bold bg-gradient-to-r from-sky-500 to-indigo-500 inline-block text-transparent bg-clip-text">
                        User1
                    </h1>
                    <p>Level.{level??0} </p>
                    <img src="/images/kurage.jpg" class="size-20 absolute top-2 right-2">
                    </div>
                <div class="w-full md:w-1/4 flex flex-col gap-2">
                    <span class="ml-2 text-xs text-gray-700 self-end">{xp}/{Math.floor(xp/1000)+1}000</span>
                    <progress class="progress progress-secondary h-2 w-full" value={(xp ?? 0) % 1000} max="1000"></progress>
                </div>
            </div>
            <div class="bg-slate-100 w-full min-h-screen rounded-t-3xl flex flex-col gap-10 p-5">

            <div class="flex justify-center w-full lg:w-1/5 p-5 rounded-xl bg-white gap-4">
                <div class="grow aspect-square gap-2 text-sm text-indigo-900 rounded-xl bg-amber-100 flex flex-col justify-center items-center">
                    <p>単語帳数</p>
                    <p class="text-3xl">{wordbooks.length}</p>
                </div>
                <div class="grow aspect-square gap-2 text-sm text-indigo-900 rounded-xl bg-teal-100 flex flex-col justify-center items-center">
                    <p>総単語数</p>
                    <p class="text-3xl">{sum}</p>
                </div>
            </div>
            <div class="flex justify-center w-full lg:w-1/5 p-5 rounded-xl bg-white gap-4 cursor-pointer">
                <h1 class="text-2xl text-indigo-800">チェックテスト</h1>
                <p class="text-xl text-indigo-800/90"></p>
                </div>
               <div class="flex flex-col  w-full lg:w-1/5 p-5 rounded-xl bg-white gap-4 cursor-pointer">
                <h1 class="text-2xl text-indigo-800">間違えた単語</h1>
                <p class="text-xl text-indigo-800/90">5</p>
            </div>
           
        </div>
           
    </div>
    