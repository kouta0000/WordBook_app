
<form method="POST" action="?/login" class="h-screen flex flex-col justify-center items-center">
    <fieldset class="shadow-xl fieldset bg-white border-base-300 rounded-box w-4/5 sm:w-1/2 md:w-3/10  border mt-5">
      <legend class="fieldset-legend">Login</legend>
    
      <label class="label pl-6 mt-5" for="email" >email</label>
      <input type="email" name="email" class="input w-9/10 mx-auto" placeholder="email" required>
    
      <label class="label pl-6" for="password">password</label>
      <input type="password" name="password" class="input w-9/10 mx-auto" placeholder="password" required>
    
      <button class="btn btn-neutral w-9/10 mx-auto mt-10">Login</button>
      <button formaction="?/register" class="mt-5 mb-5 flex justify-center gap-4"><p>Register</p></button>
    </fieldset>
  </form>