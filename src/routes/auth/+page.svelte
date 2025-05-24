
<form method="POST" action="?/login" class="h-screen flex flex-col justify-center items-center">
    <fieldset class="shadow-xl fieldset bg-white border-base-300 rounded-box w-4/5 md:w-1/2 lg:w-3/10  border mt-5">
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