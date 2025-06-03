

<div class="size-full hexagon-layout absolute top-0 left-0 z-17"></div>

<style>
.hexagon-layout {
    background: radial-gradient(circle at 25% 25%, #666fee 0%, #cccbf1 30%, #e1f0f3 100%);
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hexPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><polygon points="10,1 19,6 19,14 10,19 1,14 1,6" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23hexPattern)"/></svg>');
    animation: float 30s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}
</style>