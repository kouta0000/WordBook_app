
<script lang="ts">
import { goto } from "$app/navigation";
import "/src/styles/style.css";
import {enhance} from "$app/forms";
let { data, children } = $props()
let { supabase } = $derived(data)
const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
        };
    goto("/auth");
    };
</script>

<div class="h-18 w-full fixed absolute top-0 flex flex-row items-center bg-white border-b border-base-300 z-10">
    <object data="/images/mv.svg" type="image/svg+xml" class="h-12 w-12 m-3">ロゴ</object>
    <span class="mx-auto"><h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1></span>
    <a onclick={logout} class="action:bg-gray-100/50 flex-col"><object data="/images/logout_icon.svg" style="pointer-events: none;" type="image/svg+xml" class="h-6 w-6 mx-auto z-11">ログアウト</object><p class="mx-auto text-xs">ログアウト</p></a>
</div>

{@render children()}
