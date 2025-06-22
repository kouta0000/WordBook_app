
<script lang="ts">
  import {onMount} from "svelte";
  import {supabase} from "$lib/config/supabaseClient";
  import {goto} from "$app/navigation";
  import { browser } from '$app/environment'; // browser 環境変数をインポート

 // Google認証後のコールバック関数
 async function handleSignInWithGoogle(response: {credential?:string}) {
    if(response.credential) {
      try {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider:"google",
          token:response.credential,
        });
        if(error) {
          console.error("グーグル認証エラー:", error.message);
        } else {
          console.log("ログイン完了:", data.user);
          goto("/private/users/dashboard/user");
        } 
      } catch (e) {
        console.error("認証処理中に予期せぬエラー:", e);
      }
    } else {
        console.error("トークンエラー: response.credential がありません。");
    }
  }

  onMount(() => {
    // ブラウザ環境でのみ実行
    if (browser) {
      
      if (!(window as any).google || !(window as any).google.accounts || !(window as any).google.accounts.id) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          // スクリプトがロードされた後にGSIを初期化
          initializeGSI();
        };
        script.onerror = (e) => {
          console.error("Failed to load GSI client script:", e);
        };
        document.head.appendChild(script);
      } else {
        // スクリプトが既に存在する場合、すぐにGSIを初期化
        initializeGSI();
      }
    }
  });

  // GSIを初期化し、ボタンをレンダリングする関数
  function initializeGSI() {
    if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
      console.log("GSI client library is loaded. Initializing...");

      // GSIライブラリがロードされたら、ここでコールバック関数を直接指定して初期化
      (window as any).google.accounts.id.initialize({
        client_id: "1096950464221-hi47u5r38tejjgclo91i84o9sbaa6u6m.apps.googleusercontent.com",
        callback: handleSignInWithGoogle, // グローバルではなく、このモジュールスコープの関数を直接渡す
        context: "signin",
        ux_mode: "popup",
        // data-nonce="" はHTMLから削除し、必要であればサーバーで生成してここで渡す
        auto_select: true,
        itp_support: true,
        use_fedcm_for_prompt: true,
      });

      
      const signInDiv = document.querySelector('.g_id_signin'); // class名で取得
      if (signInDiv) {
        console.log("Rendering Google Sign-In button...");
        (window as any).google.accounts.id.renderButton(
          signInDiv, // ボタンをレンダリングするDOM要素を渡す
          { theme: "outline", size: "large", text: "signin_with", shape: "rectangular", locale: "en-US", logo_alignment: "left" }
        );
      } else {
        console.warn("Google Sign-In button container (.g_id_signin) not found in DOM.");
      }
    } else {
      console.error("Google GSI client library not fully available after load event.");
    }
  }

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
  <div id="g_id_onload"
  data-client_id="1096950464221-hi47u5r38tejjgclo91i84o9sbaa6u6m.apps.googleusercontent.com"
  data-context="signin"
  data-ux_mode="popup"
  data-nonce="" 
  data-auto_select="true" 
  data-itp_support="true"
  data-use_fedcm_for_prompt="true">
</div>
<div class="g_id_signin"
  data-type="standard"
  data-shape="rectangular"
  data-theme="outline"
  data-text="signin_with"
  data-size="large"
  data-locale="en-US"
  data-logo_alignment="left">
</div>
</div>
