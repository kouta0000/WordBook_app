
<script>
    import { scale, fade } from "svelte/transition";
</script>
<div class="flex flex-col gap-15 justify-center items-center w-full h-screen pt-18">
    <h2 class="flex justify-center w-full text-4xl font-serif mt-15" out:fade={{duration:500}}>
        <svg  class="w-9/10 md:w-1/2 lg:w-3/10" viewBox="0 0 500 100">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="6" dy="6" stdDeviation="3" flood-color="gray" />
              </filter>
            </defs>
            <text x="35" y="80" font-size="100" fill="black" filter="url(#shadow)">MonVocab</text>
          </svg>          
    </h2>

    <a href="/auth/" out:scale={{duration:500, opacity:0, start:2}} class="mt-12 lg:mt-5 btn  bg-white shadow-xl w-4/5 md:w-2/5 lg:w-1/5 h-40 rounded-2xl">
        <p class="text-2xl font-serif text-sky-600">Getting Started</p>
    </a>
</div>