
<script lang="ts">
	let { children } = $props();
    import "/src/styles/style.css";
</script>

<div class="h-18 w-full fixed absolute top-0 flex flex-row items-center bg-white border-b border-base-300 z-100">
    <object data="/images/mv.svg" type="image/svg+xml" class="h-12 w-12 m-3">ロゴ</object>
    <span class="mx-auto"><h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1></span>
    <a href="../../wordbooks"><object data="/images/homeicon.svg" style="pointer-events: none;" type="image/svg+xml" class="h-8 w-8 m-6 z-11">ホーム</object></a>
</div>
<dialog id="my_modal" class="modal">
    <div class="modal-box flex flex-col items-center w-4/5 md:w-1/2 lg:w-3/10 max-w-none">
        <form method="post" action="?/createWord" class="w-full flex flex-col items-center gap-4">
            <h1>単語を追加しよう!</h1>
            <label for="term" class="label-base"></label>
            <input type="text" id="term" name="term" placeholder="単語" class="input w-9/10" required>
            <label for="meaning" class="label-base"></label>
            <input type="text" id="meaning" name="meaning" placeholder="意味" class="input w-9/10" required>
            <button class="btn w-9/10 mt-7" type="submit">追加</button>
        </form>
        <div class="flex-grow"></div>
        <div class="modal-action">
        <form method="dialog" class="mb-3">
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
</dialog>
<style>
    body {
        background-color:black;
    }
</style>
{@render children()}