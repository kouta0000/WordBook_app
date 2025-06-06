
<script lang="ts">
import "/src/styles/style.css";
import { invalidate } from '$app/navigation';
import { onMount } from 'svelte';

let { data, children } = $props();
let { session, supabase } = $derived(data);

onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
        if (newSession?.expires_at !== session?.expires_at) {
            invalidate('supabase:auth')
        };
    });
    return () => data.subscription.unsubscribe()
    });
</script>

    <div class="h-15 w-full fixed absolute top-0 flex flex-row items-center bg-white border-b border-base-300 z-10">
        <object data="/images/mv.svg" type="image/svg+xml" class="h-9 w-9 m-3">ロゴ</object>
        <span class="mx-auto"><h1 class="text-xl md:text-2xl font-serif font-bold">MonVocab</h1></span>
        <div class="h-15 w-15"></div>
    </div>


{@render children()}
