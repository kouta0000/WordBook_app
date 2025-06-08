
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
                <svg class="size-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- 中央の円盤 -->
                    <circle cx="50" cy="50" r="20" fill="#888888"/>
                    
                    <!-- 8つの四角い歯（円盤とくっつけて配置） -->
                    <rect x="47" y="10" width="8" height="20" fill="#888888"/>
                    <rect x="70" y="47" width="20" height="8" fill="#888888"/>
                    <rect x="47" y="70" width="8" height="20" fill="#888888"/>
                    <rect x="10" y="47" width="20" height="8" fill="#888888"/>
                    <rect x="60.61" y="25.25" width="14.14" height="12" fill="#888888" transform="rotate(45 67.68 28.25)"/>
                    <rect x="60.61" y="68.75" width="14.14" height="12" fill="#888888" transform="rotate(135 67.68 71.75)"/>
                    <rect x="25.25" y="68.75" width="14.14" height="12" fill="#888888" transform="rotate(-135 32.32 71.75)"/>
                    <rect x="25.25" y="25.25" width="14.14" height="12" fill="#888888" transform="rotate(-45 32.32 28.25)"/>
                    
                    <!-- 中央の穴 -->
                    <circle cx="50" cy="50" r="8" fill="white"/>
                  </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-white rounded-box w-4/1 p-2 shadow-sm">
              <li class="hover:bg-slate-100 p-3 cursor-pointer " onclick={logout}>ログアウト</li><hr class="border-slate-100 w-4/5">
              <li class="hover:bg-slate-100 p-3 cursor-pointer ">プロフィール</li><hr class="border-slate-100 w-4/5">
            </ul>
          </div>
    </div>


{@render children()}
