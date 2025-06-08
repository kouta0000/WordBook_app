

<div class="size-full hexagon-layout absolute top-0 left-0 z-17"></div>
<div out:fade={{duration:800}} class="floating-words z-18 bg-none opacity-90">
    <div class="floating-word" style="top: 23%; left: 8%; animation-delay: 0s;">Hello</div>
    <div class="floating-word large" style="top: 25%; right: 12%; animation-delay: 2s;">Bonjour</div>
    <div class="floating-word small" style="top: 13%; left: 20%; animation-delay: 1s;">こんにちは</div>
    <div class="floating-word" style="top: 21%; right: 25%; animation-delay: 3s;">Hola</div>
    <div class="floating-word" style="top: 16%; left: 15%; animation-delay: 4s;">Guten Tag</div>
    <div class="floating-word small" style="bottom: 10%; right: 15%; animation-delay: 5s;">안녕하세요</div>
    <div class="floating-word" style="bottom: 25%; left: 25%; animation-delay: 1.5s;">Ciao</div>
    <div class="floating-word large" style="bottom: 15%; right: 20%; animation-delay: 2.5s;">Olá</div>
    <div class="floating-word small" style="top: 14%; right: 10%; animation-delay: 6s;">Привет</div>
    <div class="floating-word" style="top: 11%; right: 35%; animation-delay: 0.5s;">Namaste</div>
    <div class="floating-word" style="bottom: 5%; right: 20%; animation-delay: 3.5s;">مرحبا</div>
    <div class="floating-word small" style="top: 4%; left: 60%; animation-delay: 4.5s;">Jambo</div>
  
</div>
<style>
.hexagon-layout {
    background: radial-gradient(circle at 25% 25%, #220c57 0%, #562870 30%, #575399 100%);
    border-radius: 30px;
    padding: 60px 40px;
    overflow: hidden;
}

.hexagon-layout::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="hexPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,1 19,6 19,14 10,19 1,14 1,6" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/></pattern></defs><rect width="400" height="400" fill="url(%23hexPattern)"/></svg>');
    animation: float 60s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}
.floating-word {
            position: absolute;
            color: rgba(52, 152, 219, 0.9);
            font-size: 1.2rem;
            font-weight: 500;
            pointer-events: none;
        }

        .floating-word.large {
            font-size: 2rem;
            color: rgba(52, 152, 219, 0.8);
        }

        .floating-word.small {
            font-size: 0.9rem;
            color: rgba(52, 152, 219, 0.7);
            animation: wordFloat 5s ease-in-out infinite;
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