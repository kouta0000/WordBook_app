<script lang="ts">
    import 'animate.css';
    import Phaser from 'phaser';
    import {onMount, onDestroy} from "svelte"
    import type {PageProps} from "./$types";
    import {spaces} from "$lib/utilities/spaces";
    import {player} from "$lib/utilities/player";
    let { data }: PageProps = $props();
    const ids = data.loaddata.wordbook_ids.data;
    const sugorokuTiles = [
    "🏁 Start", // 最初の要素は「Start」
    "➡️",
    "👍",
    "🌟",
    "🍄",
    "💎",
    "⬆️",
    "🌈",
    "🍀",
    "🚀",
    "💡",
    "🌀",
    "⏳",
    "🎁",
    "⚡",
    "✨",
    "💖",
    "✅",
    "✅", // 終盤に向けてはシンプルなチェックマークなどを複数配置
    "✅",
    "🎯 Goal"  // 最後の要素は「Goal」
];
    let position:number = $state(0);
    let level:number = $state(21);
    let current_id:number =$state(level);
    let stages= $state(Array(50).fill(""));
    let isactives = $state(Array(50).fill(false));
    isactives = isactives.map((v,i) => {if (i<level) {return true} else {return false}})
    let isnows = $state(Array(50).fill(false));
    isnows[level-1]=true;
    let dice = $state(0);
    let gameContainer: HTMLElement | undefined= $state();; // PhaserがレンダリングされるDOM要素
    let game: Phaser.Game | undefined = $state();
    const throwDice = () => {
      const result = Math.floor(Math.random()*6+1);
      return result
    }

// PhaserのSceneクラスを定義
class UIScene extends Phaser.Scene {
  player!: Phaser.GameObjects.Sprite;
  constructor() {
    super('UIScene');
  }

 
  preload() {
    this.load.image('level1_background', '/quest_assets/background.png');
    this.load.image('player','/quest_assets/player.png');
    this.load.image('ice', '/quest_assets/ice.png');
    
  }
  create() {
    const centerX:number = this.game.config.width as number / 2;
    const centerY:number = this.game.config.height as number / 2;
    this.add.image(centerX, centerY, 'level1_background');
    spaces.forEach(space => {
    this.add.image(space.x+space.width/2,space.y-space.height/2, 'ice');
    });
    sugorokuTiles.forEach((tile,i)=>{
      this.add.text(spaces[i].x+spaces[i].width/4, spaces[i].y-spaces[i].height/1.5, tile, {
                    fontFamily: 'Arial',    // フォントファミリー（絵文字表示に影響する可能性あり）
                    fontSize: '32px',       // フォントサイズ
                    color: '#ffffff',       // 文字色（白）
                    align: 'center'         // 中央揃え
                });
    })
    this.player = this.add.sprite(player.x+player.width/2, player.y-player.height/2, 'player');
    }
          
    update() {
      if (dice) {
        
        if (position == spaces.length-1) {
          position=0;
          const x = spaces[0].x+spaces[0].width/2;
          const y = spaces[0].y+spaces[0].height/2;
          this.tweens.add({
            targets:this.player,
            x:x,
            y:y,
            duration:1000,
            ease:'Power1'
          })
          dice = 0;
        } else {
        let parts;
        if (position+dice<spaces.length-1) {
          const baf = position+dice;
          parts = spaces.slice(position+1, baf+1);
          position = baf;
        } else {
          const baf = spaces.length-1;
          parts = spaces.slice(position+1, baf+1);
          position = baf;
        };
        const tweenchain = parts.map(v=>{return {x:v.x+v.width/2, y:v.y-v.height/2,duration:500, ease:"Power2"}})
        const tweenChain = this.tweens.chain({
          targets:this.player,
          tweens: tweenchain,
          onComplete: () => {
            if (position == spaces.length-1){
               level++;
               isactives[level-1] = true;
               isnows[level-2] = false;
               isnows[level-1] = true;
               current_id = level;
            }
          }
        });
        tweenChain.play();
        dice = 0;
      }
    }
  }
}

  onMount(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 960,
      parent: gameContainer,
      backgroundColor: '#333333',
      scene: [UIScene],
      scale: {
            mode: Phaser.Scale.FIT, // ここが重要！
            autoCenter: Phaser.Scale.CENTER_BOTH,
        }
    };
    game = new Phaser.Game(config);
  });

  onDestroy(() => {
    if (game) {
      game.destroy(true);
    }
  });
  
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
<button class="rounded-full absolute fixed bottom-1 right-1 btn btn-primary btn-active btn-lg z-10" onclick={() => dice = throwDice()}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
</button>
<div class="w-full min-h-screen pt-20 flex flex-col items-center relative">

<h1 class="text-xl font-sans my-3 text-center">フランス語頻度準　1500</h1>
<a href="../../quest" class="btn btn-base">戻る{dice}</a>
<div class="p-5 w-full lg:w-1/2">
<div bind:this={gameContainer}></div>
</div>
<div class="w-9/10 md:w-3/5 lg:w-1/5 flex justify-center items-center mt-5">
<div class="flex justify-center items-center rounded-3xl h-10 grow bg-linear-to-br from-teal-200 to-sky-600 self-end text-white font-bold p-2">
  <p>Lv. {current_id}</p>
</div>

<div class="flex justify-center items-center gap-1 rounded-3xl h-10 grow bg-linear-to-br from-teal-200 to-sky-600 self-end relative text-white font-bold p-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>  
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-full">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
  <a class="absolute inset-0 z-5" href={`../../../dashboard/quest/${ids?.[current_id].wb_id}/wordsdashboard`}>
  </a>  
</div>
</div>
<div class="w-full min-h-[50vh] px-10 py-5  mb-10 grid grid-cols-5 lg:grid-cols-10 gap-2">
    {#each stages as s,i}
    {#if isnows[i]}
    <div use:repeatAnimation class={{"w-full rounded-3xl shadow-lg aspect-square relative overflow-hidden":true, "bg-linear-to-br from-yellow-300 to-red-500":isactives[i], "translate-z-10":isnows[i]}} >
        <button onclick={()=>{current_id=i+1}} class="absolute inset-0 z-5"></button>
        <div style="animation-delay:${(i%5)*50}ms;" class={{"absolute rounded-3xl bg-white inset-0 z-1 transition-all duration-200":true, "opacity-0":current_id==i+1, "element":isactives[i] && !isnows[i]}}></div>
        <div class={{"absolute z-2 inset-[2px] bg-white rounded-3xl text-gray-500 text-xl flex justify-center items-center":true}}>
        <span class={{
            "font-bold bg-gradient-to-r from-yellow-300 to-red-500 inline-block text-transparent bg-clip-text":true}}>Lv.{i+1}</span>
    </div>
    </div>
    {:else}
    <div class={{"w-full rounded-3xl shadow-lg aspect-square relative overflow-hidden":true, "bg-linear-to-br from-teal-400 to-indigo-400":isactives[i], "scale-110 translate-z-1":isnows[i]}} >
        {#if isactives[i]}
        <button onclick={()=>{current_id=i+1}} class="absolute inset-0 z-5"></button>
        {/if}
        <div style={`animation-delay:${i*50}ms;`} class={{"absolute rounded-3xl bg-white inset-0 z-1 transition-all duration-200":true, "opacity-0":current_id==i+1, "element":isactives[i] && !isnows[i]}}></div>
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