<script lang="ts">
    let { words, wb_name, user_or_library } = $props();

    let isChecked: boolean = $state(false);
    let isFlipped: boolean = $state(false);
    let isMasked: boolean = $state(false);
    interface Word {
            term: string;
            meaning: string;
            id: string;
    }
    const length: number = words.length;
    const shuffleWords = (words: Array<Word>) => {
        for (let i = length-1; i > 0; i--) {
            const random: number = Math.floor(Math.random()*(i+1));
            [words[i], words[random]] = [words[random], words[i]];
        }
    }
    
    let isClickeds: Array<boolean> = $state(new Array(length).fill(true));
    
    </script>
    
    <div style="background-color: rgba(250, 250, 249, 0.75);" class="flex justify-center items-center fixed absolute top-18 pt-2 lg:h-15 w-full flex flex-row flex-wrap gap-3 mb-10 z-11">
        {#if user_or_library == "user"}
        <button class={{
        "btn rounded-2xl grow w-min basis-0":true, 
        "btn-outline btn-info":!(isMasked && isClickeds.some(value => value)), 
        "btn-disabled": (isMasked && isClickeds.some(value => value))
        }} 
        onclick={() => isMasked && isClickeds.some(value => value) || isClickeds.fill(true) && (isMasked = false)}>
            <p class="whitespace-nowrap">全て見せる</p>
        </button>
        <button class="btn btn-outline btn-info rounded-2xl grow w-min basis-0" onclick={()=> {isMasked = true; isClickeds.fill(false)}}>
            <p class="whitespace-nowrap">全てかくす</p>
        </button>
        <button class="btn btn-outline btn-info rounded-2xl grow w-min basis-0" onclick={() => isChecked = !isChecked}>
            <p class="whitespace-nowrap">選択</p>
        </button>
        <button class="btn btn-outline btn-info rounded-2xl grow w-min basis-0" onclick={() => shuffleWords(words)}>
            <p class="whitespace-nowrap">シャッフル</p>
        </button>
        <button class="btn btn-outline btn-info rounded-2xl grow w-min basis-0" onclick={() => isFlipped = !isFlipped}>
            <p class="whitespace-nowrap">フリップ</p>
        </button>
        {:else if user_or_library == "library"}
        <button class={{
            "btn rounded-2xl grow w-min basis-0":true, 
            "btn-outline btn-success":!(isMasked && isClickeds.some(value => value)), 
            "btn-disabled": (isMasked && isClickeds.some(value => value))
            }} 
            onclick={() => isMasked && isClickeds.some(value => value) || isClickeds.fill(true) && (isMasked = false)}>
                <p class="whitespace-nowrap">全て見せる</p>
            </button>
            <button class="btn btn-outline btn-success rounded-2xl grow w-min basis-0" onclick={()=> {isMasked = true; isClickeds.fill(false)}}>
                <p class="whitespace-nowrap">全てかくす</p>
            </button>
        <button class="btn btn-outline btn-success rounded-2xl grow w-min basis-0" onclick={() => shuffleWords(words)}>
            <p class="whitespace-nowrap ">シャッフル</p>
        </button>
        <button class="btn btn-outline btn-success rounded-2xl grow w-min basis-0" onclick={() => isFlipped = !isFlipped}>
            <p class="whitespace-nowrap ">フリップ</p>
        </button>
        {/if}
        
    </div>
    
    <div class="w-full pt-18 pb-15 md:pb-20 flex flex-col min-h-screen gap-5 items-center">
        <h1 class="text mt-34 lg:mt-25 mb-2">{wb_name}</h1> 
        <form class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-x-0 items-center place-items-center relative">
            <button  type="submit" onclick={() => isChecked = false} class={{"w-4/5 md:w-2/5 lg:w-1/5 lg:h-20 absolute fixed opacity-95 z-11 bottom-24 lg:bottom-25 lg:right-5 btn btn-info rounded-2xl grow opacity-80":true, "hidden":!isChecked, "block":isChecked}}>
                <p class="text-white">削除</p>
            </button>
            {#each words as word, i}
            {#if user_or_library == "user"}
            <div class="w-4/5 sm:grow flex flex-col justify-center items-start">
                <span class="flex bg-white border-1 border-sky-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{isFlipped ? word.meaning: word.term}</p>
                </span>
                <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-sky-300 relative">
                    <input type="checkbox" name="deletecheck" value={word.id} class={{"mx-1 my-auto checkbox checkbox-xl checkbox-primary z-10":true, "hidden":!isChecked, "block":isChecked}}>
                    <div id="curtain"class={
                        {
                            "flex w-full h-full absolute left-0 top-0 rounded-3xl transition duration-250":true,
                            "opacity-0":isClickeds[i],
                            "bg-sky-400": (i % 6 == 0),
                            "bg-sky-200 md:bg-sky-400": (i % 6 == 1),
                            "bg-sky-400 md:bg-sky-200 lg:bg-sky-400": (i % 6 == 2),
                            "bg-sky-200  ": (i % 6 == 3),
                            "bg-sky-400 lg:bg-sky-200": (i % 6 == 4),
                            "bg-sky-200 md:bg-sky-400 lg:bg-sky-200": (i % 6 == 5)
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
            {:else if user_or_library == "library"}
            <div class="w-4/5 sm:grow flex flex-col justify-center items-start">
                <span class="flex bg-white border-1 border-emerald-300 rounded-xl max-w-9/10 -translate-x-3 translate-y-1 z-1">
                    <p class="m-auto px-10 py-2 font-semibold font-sans text-xl">{isFlipped ? word.meaning: word.term}</p>
                </span>
                <div class="flex w-full shadow-lg rounded-3xl bg-white border-1 border-emerald-300 relative">
                    <div id="curtain"class={
                        {
                            "flex w-full h-full absolute left-0 top-0 rounded-3xl transition duration-250":true,
                            "opacity-0":isClickeds[i],
                            "bg-emerald-500": (i % 6 == 0),
                            "bg-emerald-300 md:bg-emerald-500": (i % 6 == 1),
                            "bg-emerald-500 md:bg-emerald-300 lg:bg-emerald-500": (i % 6 == 2),
                            "bg-emerald-300  ": (i % 6 == 3),
                            "bg-emerald-500 lg:bg-emerald-300": (i % 6 == 4),
                            "bg-emerald-300 md:bg-emerald-500 lg:bg-emerald-300": (i % 6 == 5)
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
            {/if}
            {/each}
        </form>
        <div class="w-full h-50"></div>
    </div>
    