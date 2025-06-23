<script lang="ts">
    import 'animate.css';
    let stages= $state(Array(50).fill(""));
    let isactives = $state(Array(50).fill(false));
    isactives[0] = true;
    isactives[1]=true;
    isactives[2]=true;
    isactives[3]=true;
    isactives[4]=true;
    let isnows = $state(Array(50).fill(false));
    isnows[4]=true;
    function repeatAnimation(node:HTMLElement) {
    const interval1 = setInterval(() => {
      node.classList.add("animate__animated", "animate__headShake");
      node.addEventListener("animationend", () => {
        node.classList.remove("animate__animated", "animate__headShake");
      });
    }, 10000);
    const interval2 = setInterval(() => {
      node.classList.add("animate__animated", "animate__bounce");
      node.addEventListener("animationend", () => {
        node.classList.remove("animate__animated", "animate__bounce");
      });
    }, 15000);

    // 必ず破棄処理を返す
    return {
      destroy() {
        clearInterval(interval1);
        clearInterval(interval2); // インターバルをクリア
      }
    };
  }
</script>
<div class="w-full min-h-screen pt-20 flex flex-col items-center">
<h1 class="text-xl font-sans my-3 text-center">フランス語頻度準　1500</h1>
<a href="../../library" class="btn btn-base">戻る</a>
<div class="bg-gray-200 rounded-xl w-9/10 h-30 text-center my-3">UI</div>
<div class="w-full min-h-[50vh] p-5 grid grid-cols-5 lg:grid-cols-10 gap-2">
    {#each stages as s,i}
    {#if isnows[i]}
    <div use:repeatAnimation class={{"w-full rounded-3xl shadow-lg aspect-square relative overflow-hidden":true, "bg-linear-to-br from-teal-400 to-indigo-400":isactives[i], "translate-z-1":isnows[i]}} >
        <div style={`animation-delay:${i*50}ms;`} class={{"absolute rounded-3xl bg-white inset-0 z-1":true, "opacity-0":isnows[i], "element":isactives[i] && !isnows[i]}}></div>
        <div class={{"absolute z-2 inset-[2px] bg-white rounded-3xl text-gray-500 text-xl flex justify-center items-center":true}}>
        <span class={{
            "font-bold bg-gradient-to-r from-teal-500 to-indigo-500 inline-block text-transparent bg-clip-text":isactives[i]}}>Lv.{i+1}</span>
    </div>
    </div>
    {:else}
    <div class={{"w-full rounded-3xl shadow-lg aspect-square relative overflow-hidden":true, "bg-linear-to-br from-teal-400 to-indigo-400":isactives[i], "scale-110 translate-z-1":isnows[i]}} >
        <div style={`animation-delay:${i*50}ms;`} class={{"absolute rounded-3xl bg-white inset-0 z-1":true, "opacity-0":isnows[i], "element":isactives[i] && !isnows[i]}}></div>
        <div class={{"absolute z-2 inset-[2px] bg-white rounded-3xl text-gray-500 text-xl flex justify-center items-center":true}}>
        <span class={{
            "font-bold bg-gradient-to-r from-teal-500 to-indigo-500 inline-block text-transparent bg-clip-text":isactives[i]}}>Lv.{i+1}</span>
    </div>
    </div>
    {/if}
    {/each}
</div>
</div>
<style>
    @keyframes scaleEffect {
  0% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }
  5% {
    transform: scaleX(0);
    transform-origin: 100% 50%;
  }
  6% {
    transform:scaleX(0);
    transform-origin: 0% 50% ;
  }
  10% {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
  100% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }
}

.element { /* 左上を基準に */
  animation: scaleEffect 8s  infinite ease-out;
/* 2秒ごとに無限ループ */
}
.animate__animated.animate__headShake {
  --animate-duration: 500ms;
}
.animate__animated.animate__bounce {
  --animate-duration: 500ms;
}

</style>