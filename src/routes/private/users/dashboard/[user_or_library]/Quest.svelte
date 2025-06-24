<script lang="ts">
let { quest } = $props();
let quests = $state(quest);  
let animaux = $state(["/images/comodo.png", "/images/monkey.png", "/images/turtle.png", "/images/penguin.png", "/images/camereon.png", "/images/tasma.png", "/images/frog.png", "/images/aligator.png", "/images/lezard.png"])
</script>
    
    <div class="w-full min-h-screen pt-30 flex flex-col items-center">
        <h1 class="text-3xl mb-10 mt-10 font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">クエスト</h1>
        
        <div class="w-full flex sm:grid flex-col grid-cols-2 lg:grid-cols-3 gap-13 sm:gap-x-0 items-center place-items-center">
            
            {#each quests as q, id}
            <div  class="shadow-sm active:bg-indigo-100 transition-all duration-200 flex flex-col gap-2 p-7 w-9/10 sm:grow rounded-xl bg-white relative">
                <a href="./quest/quests/{q.id}/" class="absolute inset-0 z-1"></a>
                <div class="flex flex-col w-full justify-start items-center">
                    <div class="flex w-full justify-start items-cente">
                    <div class="avatar w-1/5 aspect-square self-center">
                        <div class="mask mask-squircle size-full relative">
                            <div class="absolute inset-0 bg-radial from-indigo-400/20 to-indigo-100/20"></div>
                          <img class="" src={animaux[(id+1)]} />
                        </div>
                    </div>
                    <div class="w-3/5 flex flex-col justify-center p-3">
                    <h1 class="text-xl text-center">{q.title}</h1>
                    </div>
                    </div>
                    <div class="w-full text-center p-2">
                        <p class="text-indigo-300 text-sm">{q.description}</p> 
                    </div>
                </div>
                
            </div>
            {/each}
        </div>
        <div class="w-full h-50"></div>
    </div>
