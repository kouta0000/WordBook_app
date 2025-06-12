
<script lang="ts">
import "/src/styles/style.css";
import {goto} from "$app/navigation";

let { data, children } = $props();
let { session, supabase } = $derived(data);

    const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    } else {
        goto("/auth");
    }
  }
</script>

    <div class="h-15 w-full fixed absolute top-0 flex flex-row items-center bg-slate-50 border-b border-base-300 z-12">
        <div class="h-full aspect-square p-3">
            <object data="/images/mv.svg" type="image/svg+xml" class="h-full">ロゴ</object>
        </div>
        <div class="mx-auto text-center grow">
            <h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1>
        </div>
        <div class="dropdown dropdown-end p-3 h-full aspect-square relative">
            <div tabindex="0" role="button" class="size-full">
              <svg
              class="size-full text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-white rounded-box w-4/1 p-2 shadow-sm">
              <li class="hover:bg-slate-100 p-3 cursor-pointer " onclick={logout}>ログアウト</li><hr class="border-slate-100 w-4/5">
              <li class="hover:bg-slate-100 p-3 cursor-pointer">プロフィール
              </li><hr class="border-slate-100 w-4/5">
            </ul>
          </div>
    </div>


{@render children()}
