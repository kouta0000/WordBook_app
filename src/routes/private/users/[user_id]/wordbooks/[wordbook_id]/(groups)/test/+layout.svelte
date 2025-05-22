
<script lang="ts">
	let { children } = $props();
    import "/src/styles/style.css";
</script>


<div class="w-full h-15 md:h-20 bg-white fixed absolute bottom-0 flex flex-row justify-center gap-2 z-100">

    <a href="./memo" class="btn btn-ghost h-15 md:h-20 flex-grow basis-0" >覚える</a>
    <div class="h-15 md:h-20 flex-grow basis-0">
        <svg class="h-full scale-150 mx-auto" viewBox="0 0 40 40">
            <defs>
            <filter id='shadow' color-interpolation-filters="sRGB">
            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-opacity="0.5"/>
            </filter>
            </defs>
            <circle class="fill-stone-300" cx="20" cy="20" r="10" filter="url(#shadow)" />
            <line x1="17" y1="20" x2="23" y2="20" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="20" y1="17" x2="20" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
        </svg>
    </div>   
    <a href="./test" class="btn btn-ghost h-15 md:h-20 flex-grow basis-0">
        <svg class="h-full" viewBox="0 0 40 40" fill="none">
            <rect x="15" y="15" width="10" height="10" class="fill-emerald-500" />
            <line x1="17" y1="20" x2="19" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="19" y1="23" x2="23" y2="17" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <text x="12" y="35" class="fill-emerald-500 font-bold" font-size="6">テスト</text>
        </svg>
    </a>
   

</div>

{@render children()}