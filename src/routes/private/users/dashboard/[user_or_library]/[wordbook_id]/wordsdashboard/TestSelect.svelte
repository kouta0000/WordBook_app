
<div class="min-h-screen w-full pt-20 pb-15 flex flex-col items-center justify-start bg-slate-100">
    <div class="full p-5">
        <h1 style="animation: rainbow 1s ease-in-out;" class=" text-center font-bold text-3xl">テスト</h1>
    </div>
                <div class="bg-white rounded-3xl grid grid-cols-2  gap-4 w-9/10 lg:w-1/3 px-15 py-5">
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full aspect-square p-7 relative">
                        <img class="size-full" src="/images/4taku.png">
                        </div>
                        <a href="./4taku" class="absolute bg-gray-200/30 hover:bg-indigo-200/40 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1 font-black text-gray-600">4択問題</div>
                    </div>
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full p-6 aspect-square flex flex-col justify-start items-center">
                        <img class="size-9/10" src="/images/input.png">
                        </div>
                        
                        <a href="./input" class="absolute bg-gray-200/30 hover:bg-indigo-200/40 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1  text-gray-600 font-black">入力問題</div>
                    </div>
                    <div class="w-full">
                    <div class="w-full aspect-square  mask mask-squircle bg-white flex flex-col items-center  relative">
                        <div class="w-full p-8 aspect-square relative">
                        <img class="size-full" src="/images/order.png">
                        </div>
                        
                        <a href="./" class="absolute bg-gray-200/80 inset-0 flex justify-center items-center">
                        </a>
                    </div>
                    <div class="w-full text-center p-1  text-gray-500 font-black">並び替え問題</div>
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