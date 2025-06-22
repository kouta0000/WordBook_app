
<script lang="ts">
  import {onMount} from "svelte";
  import {supabase} from "$lib/config/supabaseClient";
  import {goto} from "$app/navigation";
  import { browser } from '$app/environment'; // browser 環境変数をインポート

// コールバック関数を定義（これはクライアントサイドでのみ使用される）
async function handleSignInWithGoogle(response: {credential?:string}) {
  if(response.credential) {
    const {data, error} = await supabase.auth.signInWithIdToken({
      provider:"google",
      token:response.credential,
    });
    if(error) {
      console.error("グーグル認証エラー", error.message);
    } else {
      console.log("ログイン完了", data.user);
      goto("/private/users/dashboard/user");
    } 
  } else {
      console.error("トークンエラー");
  }
}

// Google GSIライブラリのロードが完了し、
// グローバルな `google.accounts.id` が利用可能になった後に実行される関数
// この関数は、`onMount` の中で `window` オブジェクトに割り当てられます。
function initializeGoogleSignIn() {
  if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
    // グローバルコールバックをセットアップ
    // handleSignInWithGoogle は既に上記で定義されているので、それを参照
    (window as any).handleSignInWithGoogle = handleSignInWithGoogle;

    // GSI初期化
    (window as any).google.accounts.id.initialize({
      client_id: "1096950464221-hi47u5r38tejjgclo91i84o9sbaa6u6m.apps.googleusercontent.com",
      callback: (window as any).handleSignInWithGoogle, // グローバルな関数を参照
      context: "signin",
      ux_mode: "popup",
      // data-nonceはHTML側に記載があるので削除（またはサーバーサイドで動的に埋め込む）
      auto_select: true,
      itp_support: true,
      use_fedcm_for_prompt: true,
    });

    // ボタンのレンダリング（HTMLにdivがあるため自動で処理されることも多いが、念のため）
    const signInButton = document.getElementById("g_id_onload");
    if (signInButton) {
      (window as any).google.accounts.id.renderButton(
        signInButton,
        { theme: "outline", size: "large", text: "signin_with", shape: "rectangular", locale: "en-US", logo_alignment: "left" }
      );
    }
  } else {
      console.warn("Google GSI client library not loaded or initialized correctly.");
  }
}


// コンポーネントがマウントされた時（クライアントサイドでのみ）実行
onMount(() => {
  if (browser) { // クライアントサイドでのみ実行されることを保証
    // GSIスクリプトがまだ読み込まれていないかを確認し、動的に読み込む
    // src/app.html に <script src="https://accounts.google.com/gsi/client" async defer></script>
    // がある場合でも、念のためこのチェックと処理は残しておくのが安全です。
    if (!(window as any).google || !(window as any).google.accounts || !(window as any).google.accounts.id) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      // スクリプトのロード完了を待ってから初期化処理を実行
      script.onload = () => {
        initializeGoogleSignIn();
      };
      script.onerror = (e) => {
        console.error("Failed to load GSI client script", e);
      };
      document.head.appendChild(script);
    } else {
      // スクリプトが既にロードされている場合（例：SSR後のハイドレーション時）
      initializeGoogleSignIn();
    }
  }
});
</script>
<svelte:head>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>
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
     data-callback="handleSignInWithGoogle"
     data-auto_select="true" 
     data-itp_support="true">
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
