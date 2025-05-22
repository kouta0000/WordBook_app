
<script lang="ts">
import "/src/styles/style.css";
let { data, children } = $props()
let { supabase } = $derived(data)
const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
        };
    };
</script>

<div class="h-18 w-full fixed absolute top-0 flex flex-row items-center bg-white border-b border-base-300 z-10">
    <object data="/images/mv.svg" type="image/svg+xml" class="h-12 w-12 m-3">ロゴ</object>
    <span class="mx-auto"><h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1></span>
    <a onclick={logout}><object data="/images/logout_icon.svg" style="pointer-events: none;" type="image/svg+xml" class="h-8 w-8 m-6 z-11">ログアウト</object></a>
</div>
<dialog id="my_modal" class="modal">
    <div class="modal-box flex flex-col items-center w-4/5 sm:w-1/2 md:w-3/10 max-w-none">
        <form method="post" class="w-full flex flex-col items-center gap-10">
            <label for="wb_name" class="label-base">単語帳の名前を決めよう!</label>
            <input type="text" id="wb_name" name="wb_name" placeholder="wordbook_name" class="input w-9/10" required>
            <button class="btn w-9/10" type="submit">作成</button>
        </form>
        <div class="flex-grow"></div>
        <div class="modal-action">
        <form method="dialog" class="mb-3">
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
</dialog>
{@render children()}