<script lang="ts">
    import {onMount} from "svelte";
    import Rocket from "./Rocket.svelte";
    interface Star {
        id:number;
        x:number;
        y:number;
        brightness:number;
        twinkleSpeed:number;
        twinkleTiming:number;
        size:number;
    }
    let stars:Array<Star> = $state([]);
    let numStars:number = $state(200);

    onMount(()=>{
        for (let i=0; i<numStars;i++) {
            stars.push({
                id:i,
                x:Math.floor(Math.random()*1000),
                y:Math.floor(Math.random()*1000),
                brightness:Math.random(),
                twinkleSpeed:Math.floor(Math.random()*10+1),
                twinkleTiming:Math.floor(Math.random()*1000+10),
                size:Math.floor(Math.random()*17)
            })
        }
    })

</script>
<div class="size-full bg-linear-to-br/shorter from-black to-indigo-950 absolute top-0 left-0 z-17">
    <Rocket />
    {#each stars as star (star.id)}
    <div class="absolute bg-white mask mask-star"
    style:top={star.x+"px"}
    style:left={star.y+"px"}
    style:width={star.size+"px"}
    style:height={star.size+"px"}
    style:animation={`twinklers ${star.twinkleSpeed}s ${star.twinkleTiming}ms infinite`}
    ></div>
    {/each}
</div>
    

<style>
   
    @keyframes -global-twinklers {
        85%, 100% {
            transform: scale(2);
            opacity:0;
        }
    }
</style>