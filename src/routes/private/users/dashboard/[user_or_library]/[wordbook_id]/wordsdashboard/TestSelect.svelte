
<div class="min-h-screen w-full pt-20 pb-15 flex flex-col gap-5  items-center justify-center bg-slate-100">
                <div class="bg-white text-indigo-500 rounded-3xl flex justify-center items-center p-10 relative mb-3">
                    <a href="./random" class="absolute rounded-3xl hover:bg-indigo-200/40 inset-0 flex justify-center items-center">
                    </a>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-10">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="1.5" fill="none" />
                        <polyline
                          points="7,12 10,15 17,8"
                          stroke="currentColor"
                          stroke-width="1.5"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p class="w-full text-center p-1   text-gray-700 font-black">チェックテスト</p>
                </div>
                <div class="bg-white rounded-3xl grid grid-cols-2 lg:grid-cols-2 gap-8 w-9/10 lg:w-1/4 px-15 py-5">
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full aspect-square p-7 relative">
                        <img class="size-full" src="/images/4taku.webp">
                        </div>
                        <a href="./4taku" class="absolute bg-gray-200/30 hover:bg-indigo-200/40 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1 font-black text-gray-600">4択</div>
                    </div>
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full p-6 aspect-square flex flex-col justify-start items-center">
                        <img class="size-9/10" src="/images/input.webp">
                        </div>
                        
                        <a href="./input" class="absolute bg-gray-200/30 hover:bg-indigo-200/40 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1  text-gray-700 font-black">入力</div>
                    </div>
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full p-6 aspect-square relative">
                        <img class="size-full" src="/images/order.webp">
                        </div>
                        
                        <a href="./order" class="absolute bg-gray-200/30 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1  text-gray-700 font-black">並び替え</div>
                    </div>
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full p-8 aspect-square relative text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-full">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                              </svg>
                        </div>
                        
                        <a href="./sound" class="absolute bg-gray-200/30 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1  text-gray-600 font-black">音声</div>
                    </div>
                </div>
</div>
<style>
 .system-2 .display {
            background: linear-gradient(145deg, #cecedf, #a9a9e4);
            border: 15px solid #444;
            border-radius: 25px;
            position: relative;
            box-shadow: 0 0 50px rgba(255, 0, 255, 0.4);
        }

        .system-2 .screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #cecee9 0%, #c4c4f5 100%);
            border-radius: 10px;
            padding: 25px;
            position: relative;
        }

        .system-2 .title {
            color: #ff00ff;
            font-size: 28px;
            text-align: center;
            margin-bottom: 25px;
            text-shadow: 0 0 15px #ff00ff;
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rainbow 3s infinite;
        }


        .system-2 .menu-item {
            background: linear-gradient(145deg, #8b8beb, #424294);
            border: 2px solid #5555aa;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #f7f8fa;
            font-weight: 900;
        }

        .system-2 .menu-item:hover {
            border-color: #ff00ff;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
            transform: translateY(-2px);
        }

        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        </style>
