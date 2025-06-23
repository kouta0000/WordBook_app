
<script lang="ts">
  import {onMount} from "svelte";
  import {supabase} from "$lib/config/supabaseClient";
  import {goto} from "$app/navigation";
</script>

<div class="h-screen w-full  flex flex-col justify-center items-center">
<form method="POST" action="?/login" class="w-4/5 md:w-1/2 lg:w-3/10 p-5">
    <fieldset class=" shadow-xl fieldset bg-white border-base-300 rounded-box w-full border mt-5">
      <legend class="fieldset-legend">ログイン</legend>
    
      <label class="label pl-6 mt-5" for="email" >メールアドレス</label>
      <input type="email" name="email" class="input w-9/10 mx-auto" placeholder="メールアドレス" required>
    
      <label class="label pl-6" for="password">パスワード</label>
      <input type="password" name="password" class="input w-9/10 mx-auto" placeholder="パスワード" required>
    
      <button class="btn btn-base w-9/10 mx-auto mt-10">ログイン</button>
      <p class="label mx-auto mt-4 text-md">初回ログインは登録を押してください</p>
      <button formaction="?/register" class="btn btn-neutral w-9/10 mx-auto mb-3">登録</button>
    </fieldset>
  </form>
  <form method="POST" action="?/loginWithX" class="w-4/5 md:w-1/2 lg:w-3/10 p-5 flex flex-col gap-4">
  <button  class="btn bg-black text-white border-black w-4/5 mx-auto">
    <svg aria-label="X logo" width="16" height="12" viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/></svg>
    Login with X
  </button>
  </form>

</div>
