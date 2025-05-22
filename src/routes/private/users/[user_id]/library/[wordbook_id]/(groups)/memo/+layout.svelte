
<script lang="ts">
	let { children } = $props();
    import "/src/styles/style.css";
</script>


<div class="w-full h-15 md:h-20 bg-white fixed absolute bottom-0 flex flex-row justify-center gap-2 z-100">
    <a href="./memo" class="btn btn-ghost text-sky-500 font-bold h-15 md:h-20 flex-grow basis-0">覚える</a>
    <a href="./test" class="btn btn-ghost h-15 md:h-20 flex-grow basis-0">
        <svg class="h-full" viewBox="0 0 40 40" fill="none">
            <rect x="15" y="15" width="10" height="10" class="fill-gray-500" />
            <line x1="17" y1="20" x2="19" y2="23" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <line x1="19" y1="23" x2="23" y2="17" class="stroke-1 rounded-2xl stroke-white" stroke-linecap="round"/>
            <text x="12" y="35" class="fill-gray-500" font-size="6">テスト</text>
        </svg>
    </a>
</div>

{@render children()}