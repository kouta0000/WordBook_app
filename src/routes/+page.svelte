
<script>
    import { scale, fade } from "svelte/transition";
</script>
<div class="h-20 w-full backdrop-blur-sm fixed absolute top-0 flex flex-row items-center bg-white/30 border-b border-base-300 z-12">
  <div class="h-full aspect-square p-3">
      <object data="/images/mv.svg" type="image/svg+xml" class="h-full">ロゴ</object>
  </div>
  <div class="mx-auto text-center grow">
      <h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1>
  </div>
  <div class="h-full aspect-square"></div>
</div>
<div out:fade={{duration:800}} class="hero w-full bg-slate-100 min-h-screen">
  <div class="hero-content w-full flex flex-col items-center text-center">
    <div class="max-w-md">
      <h1 class="text-7xl font-bold text-shadow-lg text-shadow-indigo-300">MonVocab</h1>
      <h2 class="text-2xl font-bold py-5">次世代単語帳アプリ</h2>
      <p class="py-6">
        赤シートで隠して覚えるプロセスを再現。豊富なゲーム風のテスト機能。AIによる自然な発音機能。
      </p>
    </div>
    <div class="flex flex-col items-center w-3/5 md:w-2/5 lg:w-1/5 gap-7 mt-5">
      <a out:fade={{duration:800}} href="/auth" class="bg-linear-to-r text-white from-indigo-500 to-sky-300 w-full p-5 rounded-3xl font-bold text-center">ログインして始める</a>
      <a out:fade={{duration:800}} href="/guest/users/dashboard/library" class="bg-linear-to-r text-white from-indigo-500 to-sky-300 w-full p-5 rounded-3xl font-bold text-center">ゲストとして使う</a>
    </div>
  </div>
</div>
<div out:fade={{duration:800}} class="floating-words">
  <div class="floating-word" style="top: 23%; left: 8%; animation-delay: 0s;">Hello</div>
  <div class="floating-word large" style="top: 25%; right: 12%; animation-delay: 2s;">Bonjour</div>
  <div class="floating-word small" style="top: 35%; left: 20%; animation-delay: 1s;">こんにちは</div>
  <div class="floating-word" style="top: 45%; right: 25%; animation-delay: 3s;">Hola</div>
  <div class="floating-word large" style="top: 55%; left: 15%; animation-delay: 4s;">Guten Tag</div>
  <div class="floating-word small" style="bottom: 35%; right: 15%; animation-delay: 5s;">안녕하세요</div>
  <div class="floating-word" style="bottom: 25%; left: 25%; animation-delay: 1.5s;">Ciao</div>
  <div class="floating-word large" style="bottom: 15%; right: 20%; animation-delay: 2.5s;">Olá</div>
  <div class="floating-word small" style="top: 65%; left: 40%; animation-delay: 6s;">Привет</div>
  <div class="floating-word" style="top: 75%; right: 35%; animation-delay: 0.5s;">Namaste</div>
  <div class="floating-word large" style="bottom: 45%; left: 20%; animation-delay: 3.5s;">مرحبا</div>
  <div class="floating-word small" style="top: 20%; left: 60%; animation-delay: 4.5s;">Jambo</div>
</div>
<style>
   .floating-word {
            position: absolute;
            color: rgba(52, 152, 219, 0.6);
            font-size: 1.2rem;
            font-weight: 500;
            animation: wordFloat 5s ease-in-out infinite;
            pointer-events: none;
        }

        .floating-word.large {
            font-size: 2rem;
            color: rgba(52, 152, 219, 0.5);
        }

        .floating-word.small {
            font-size: 0.9rem;
            color: rgba(52, 152, 219, 0.4);
        }
        @keyframes wordFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg);
                opacity: 0.4;
            }
            33% { 
                transform: translateY(-40px)  scale(1.1);
                opacity: 0.7;
            }
            66% { 
                transform: translateY(-20px);
                opacity: 0.5;
            }
        }
</style>