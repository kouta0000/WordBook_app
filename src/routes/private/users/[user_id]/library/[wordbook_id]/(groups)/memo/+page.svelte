
<script lang="ts">
import type { PageProps } from "./$types";
let { data }: PageProps = $props();
let isChecked: boolean = $state(false);
let isFlipped: boolean = $state(false);
interface Word {
        term: string;
        meaning: string;
        id: string;
}
let words: Array<Word> = $state(data.data); 
const length: number = words.length;
const shuffleWords = (words: Array<Word>) => {
    for (let i = length-1; i > 0; i--) {
        const random: number = Math.floor(Math.random()*(i+1));
        [words[i], words[random]] = [words[random], words[i]];
    }
}

let isClickeds: Array<boolean> = $state(new Array(length).fill(true));

</script>

<div class="flex justify-center items-center fixed absolute top-20 lg:top-25 w-full flex flex-row flex-wrap gap-4 mb-15  z-11 opacity-90">
    <button class="btn btn-soft btn-success grow basis-0" onclick={() => isClickeds.fill(true)}>
        全て見せる
    </button>
    <button class="btn btn-soft btn-success grow basis-0" onclick={()=> isClickeds.fill(false)}>
        全てかくす
    </button>
    <button class="btn btn-soft btn-success grow basis-0" onclick={() => shuffleWords(words)}>
        シャッフル
    </button>
    <button class="btn btn-soft btn-success grow basis-0" onclick={() => isFlipped = !isFlipped}>
        フリップ
    </button>
    
</div>

<div class="w-full pt-18 pb-15 md:pb-20 flex flex-col min-h-screen gap-5 items-center">
    <h1 class="text mt-40 lg:mt-30 mb-7"></h1> 
    <form class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
        {#each words as word, i}
        <div class="w-4/5 sm:grow flex flex-col justify-center items-start">
            <span class="flex bg-white border-1 border-emerald-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{isFlipped ? word.meaning: word.term}</p>
            </span>
            <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-emerald-300 relative">
                <div id="curtain"class={
                    {
                        "flex w-full h-full absolute left-0 top-0 rounded-3xl transition duration-250":true,
                        "opacity-0":isClickeds[i],
                        "bg-emerald-300": (i % 6 == 0),
                        "bg-emerald-200 md:bg-emerald-300": (i % 6 == 1),
                        "bg-emerald-300 md:bg-emerald-200 lg:bg-emerald-300": (i % 6 == 2),
                        "bg-emerald-200  ": (i % 6 == 3),
                        "bg-emerald-300 lg:bg-emerald-200": (i % 6 == 4),
                        "bg-emerald-200 md:bg-emerald-300 lg:bg-emerald-200": (i % 6 == 5)
                    }
                }
                onclick={()=> {
                    if (!isClickeds[i]) {
                        isClickeds[i] = !isClickeds[i];
                        setTimeout(() => isClickeds[i] = !isClickeds[i], 2000);
                    }
                }}>
                    <p class="m-auto text-white">show</p>
                </div>
                <p class="mx-auto my-4 max-w-9/10 font-sans teext-lg">{isFlipped? word.term: word.meaning}</p>
            </div>
        </div>
        {/each}
    </form>
    <div class="w-full h-50"></div>
</div>
