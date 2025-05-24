<script lang="ts">
	let { children } = $props();
    import "/src/styles/style.css";
</script>


<div class="h-18 w-full fixed absolute top-0 flex flex-row items-center bg-white border-b border-base-300 z-10">
    <object data="/images/mv.svg" type="image/svg+xml" class="h-12 w-12 m-3">ロゴ</object>
    <span class="mx-auto"><h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1></span>
    <a href="../../../dashboard"><object data="/images/logout_icon.svg" style="pointer-events: none;" type="image/svg+xml" class="h-8 w-8 m-6 z-11">ログアウト</object></a>
</div>


{@render children()}